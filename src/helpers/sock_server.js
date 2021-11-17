var wrtc = require('@koush/wrtc')
var {RTCVideoSink, RTCAudioSink} = require('@koush/wrtc').nonstandard
var simplePeer = require('simple-peer')
var express = require('express')
var app = express()
var server = require('http').Server(app)
const { Server } = require("socket.io");
const io = new Server(server);
const streams = [];
var pathToFfmpeg = require('ffmpeg-static');
const { parentPort } = require('worker_threads');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath( pathToFfmpeg);
const { StreamInput } = require('fluent-ffmpeg-multistream')

const VIDEO_OUTPUT_SIZE = '1080x720'
const VIDEO_OUTPUT_FILE = './recording.mp4'
const { PassThrough } = require('stream')
const fs = require('fs')
let UID = 0;

var port = process.env.PORT || 3000
var status = {
    socket: false,
    peer: false,
    ffmpeg: false,
}
var peer
var videoSink
var audioSink
io.on('connection', function (socket) {
    status.socket = true
    peer = new simplePeer({
        wrtc: wrtc,
        initiator: false,
        trickle: false
    })
    console.log('connection')
    socket.on('signal', function (data) {
        console.log('signal', data)
        peer.signal(data)
    })
    peer.on('signal', function (data) {
        console.log('signal', data)
        socket.emit('signal', data)
    })
    peer.on('connect', function () {
        console.log('connect')
        status.peer = true
    })
    peer.on('stream', function (stream) {
        parentPort.postMessage('[NODE_SOCK_SERVER] peer.on stream')
        videoSink = new RTCVideoSink(stream.getVideoTracks()[0])
        audioSink = new RTCAudioSink(stream.getAudioTracks()[0])
        console.log('stream added')
        videoSink.addEventListener('frame', ({ frame: { width, height, data }}) => {
           console.log('frame', data)

           const size = width + 'x' + height;
    if (!streams[0] || (streams[0] && streams[0].size !== size)) {
      UID++;

      const stream = {
        recordPath: './recording-' + size + '-' + UID + '.mp4',
        size,
        video: new PassThrough(),
        audio: new PassThrough()
      };

      const onAudioData = ({ samples: { buffer } }) => {
        if (!stream.end) {
          stream.audio.push(Buffer.from(buffer));
        }
      };

      audioSink.addEventListener('data', onAudioData);

      stream.audio.on('end', () => {
        audioSink.removeEventListener('data', onAudioData);
      });

      streams.unshift(stream);

      streams.forEach(item=>{
        if (item !== stream && !item.end) {
          item.end = true;
          if (item.audio) {
            item.audio.end();
          }
          item.video.end();
        }
      })
  
      stream.proc = ffmpeg()
        .addInput((new StreamInput(stream.video)).url)
        .addInputOptions([
          '-f', 'rawvideo',
          '-pix_fmt', 'yuv420p',
          '-s', stream.size,
          '-r', '30',
        ])
        .addInput((new StreamInput(stream.audio)).url)
        .addInputOptions([
          '-f s16le',
          '-ar 48k',
          '-ac 1',
        ])
        .on('start', ()=>{
            parentPort.postMessage('[NODE_SOCK_SERVER] ffmpeg start')

          console.log('Start recording >> ', stream.recordPath)
          socket.emit('status', {
            status: 'recording',
            isBroadcasting: true,
          })

        })
        .on('end', ()=>{
          stream.recordEnd = true;
          parentPort.postMessage('[NODE_SOCK_SERVER] ffmpeg end')

          console.log('Stop recording >> ', stream.recordPath)
          socket.emit('status', {
            status: 'end',
            isBroadcasting: false,
          })
        })
        .size(VIDEO_OUTPUT_SIZE)
        .output(stream.recordPath);

        stream.proc.run();
    }

    streams[0].video.push(Buffer.from(data));
  });
        }
        )
  

    peer.on('close', function () {
        console.log('close')
        status.peer = false
    })

    socket.on('disconnect', function () {
        console.log('disconnect')
        status.socket = false
    }
    )
})




app.use(express.static('browser'))

server.listen(port, function () {
    console.log('listening on port ' + port)
    parentPort.postMessage('[NODE_SOCK_SERVER] Listening on port ' + port)
}
)

    