
<template>
<div class="BroadcastPage">
      <!-- This is a broadcaster view. there is three columns. the first one is the sidebar -->
    <div  class="pageTop row">
                    <div class="col-md-6">
          <div class="panel panel-default">
            <h3 class="header-text">Input Feeds</h3>
            <div class="panel-body">
            </div>
            <div class="feedContainer">
            <div class="feedDisplay" v-for="feed in cameras" v-bind:class="{'selected': feed.selected}" v-bind:key="feed.id">
              <div class="feedDisplay-inner">
               <video style="width:100%" v-bind:ref="feed.id" autoplay controls :src="feed.url" muted ></video>
               <div class="camera_header"><span class="camera_name" >{{feed.name}} <button class="pushFeed" @click="pushFeed(feed)">+</button></span>
               </div>
              </div>
            </div>
             <div class="addCameraOrVideo feedDisplay" @click="selectCamera">
              <span>+ Add Video/Camera</span>
             </div>
          </div>

          </div>
        </div>
        <!-- <div class="col-3">
        <div class="sidebar-nav panel">
          <h3 class="header-text">Scenes</h3>
          <ul class="nav nav-sidebar">
            <li v-for="scene in oseg.scenes" v-bind:class="{'active': scene.id == false}" v-bind:key="scene.id">
              {{scene.name}}
              components: {{scene.components.length}}
              <a v-on:click="selectScene(scene.id)">Activate</a>
              </li>
           
                    
          </ul>
        </div>
        </div> -->
        <div class="col-6">
          <div class="panel panel-default">
            <h3 class="header-text">Feed Output</h3>
   <canvas ref="canvasOutput" class="canvasOutput"></canvas>
          </div>
                      <button class="btn btn-primary" v-on:click="startBroadcast">Start Broadcast</button>

        </div>

    </div>
    <div v-if="oseg" class="pageBottom row">
         <div class="col-3">
          <div class="panel panel-default">
            <h3 class="header-text">Data Source / Scoreboard</h3>

          </div>
        </div>
        <div class="col-6">
          <div class="panel panel-default">
            <h3 class="header-text">Storyline</h3>
            <div class="timeline">
              <div class="timeline-row">

              </div>
            </div>
          </div>
         </div>
        <div class="col-md-3">
          <div class="panel panel-default">
            <h3 class="header-text">Audio Mixing</h3>
          </div>
        </div>
    </div>

</div>
</template>

<script lang="ts">
import { Vue} from 'vue-class-component'

import OSEG from 'oseg'
import Swal from 'sweetalert2'
import { Scene } from 'oseg/build/types/structs/storyline'
import { io } from 'socket.io-client'
var Peer = require('simple-peer')
import axios from 'axios'


export default class BroadcastView extends Vue {
    scenes = [] as any[]
    cameraScene = null as any
    cameras = [{id:'example', name: "Example", url: require("../assets/example_video_test.mp4"), type:"video" }] as {id: string, name: string, feed?: MediaStream, url?: string, type: string}[]
    graphics = [] as any[]
    oseg = new OSEG(1920, 1080, "dev-studio")
    peer1: any
    socket:any
    store = new Map() // use a map to store the data; need to find a better persistant storage solution later

 updated() {
  console.log("re-render")
  this.cameras.forEach(cam => {
      if (this.$refs[cam.id] && cam.feed) {
           const video = this.$refs[cam.id] as HTMLVideoElement
           if (cam.type == "camera-local") {
          video.srcObject = cam.feed
          video.play()
           } 
      }
  })
 }

 async login() {
    if ( this.store.get('broadcaster_token')) {
    const response = await axios.post('https://app.seasoncast.com/v2/broadcaster/login', {
      token: this.store.get('broadcaster_token')
    })

    if (!response.data.success) {
      this.store.set('broadcaster_token', null)
    }
    }

    while (!this.store.get('broadcaster_token')) {
    const result = await Swal.fire({
      title: 'Broadcaster Login',
      html: '<input type="text" id="broadcaster_email" placeholder="Email"> <input type="password" id="broadcaster_password" placeholder="Password">',
      showCancelButton: true,
      confirmButtonText: 'Login',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return async () => {

        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

      if (result.value) {
        const email =  (document.getElementById('broadcaster_email') as any).value
        const password =  (document.getElementById('broadcaster_password') as any).value
         const response = await axios.post('https://app.seasoncast.com/v2/broadcaster/login', {
      email: email,
      password: password
    })

    if (!response.data.success) {
      this.store.set('broadcaster_token', null)
    }else{
      this.store.set('broadcaster_token', response.data.token)
      this.store.set('broadcaster_key', response.data.key)

    }
      }
    

    }
 
 }



  async mounted () {

this.login()

      if (this.$refs.canvasOutput) {
    console.log('BroadcastView created')
    this.oseg.setupCanvas(this.$refs.canvasOutput as HTMLCanvasElement)
    const exampleScene = {
      id: 'scene1',
      name: 'Scene 1',
      components: [
        // {
        //   x: 0,
        //   y: 0,
        //   width: 100,
        //   height: 100,
        //   type: 3,
        //   typeName: 'feed',
        //   video: this.$refs.exampleVideo

        // },
        {
          x: 0,
          y: 0,
          width: 90,
          height: 20,
          type: 1,
          text: 'Welcome to SeasonCast Studio',
          options: {
            fontFamily: 'Arial',
            fontSize: 80,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#4287f5', '#b042f5'], // gradient
            stroke: '#4a1850'

          }
        },
        // waiting for camera feed text
        {
          x: 10,
          y:40,
          width: 80,
          height: 20,
          type: 1,
          text: 'Waiting for a camera feed',
          options: {
              fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#edaf05',

          }
        },

        {
          x: 5,
          y: 90,
          width: 50,
          height: 10,
          type: 1,
          text: 'Current Time: {gamebee.oreos}',
          options: {
            fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            stroke: '#4a1850'

          }
        }
      ]
    } as Scene
    this.oseg.importScene(exampleScene)
    this.oseg.addSceneToCurrent(exampleScene)
    this.oseg.broadcastTimerStart()
    const that = this
    setInterval(() => {
      const now = new Date()
      const pretty = [
        now.getFullYear(),
        '-',
        now.getMonth() + 1,
        '-',
        now.getDate(),
        ' ',
        now.getHours(),
        ':',
        now.getMinutes(),
        ':',
        now.getSeconds()
      ].join('')
      that.oseg.dataMap['gamebee.oreos'] = pretty
      that.oseg.updateDynamicTextInScenes()
    }, 1000)
      }
      this.peer1 = new Peer({
                initiator: true,
                trickle: false
            });
var peer = this.peer1
 this.socket = io('ws://localhost:3000', {
   transports: ['websocket', 'polling', 'flashsocket']
 });
            this.socket.on('connect', function() {
                
                console.log('Connected to signaling server');
       
            })
                 this.socket.on('status', function(data: any) {
                console.log(data);
            });

                this.socket.on('signal', function(data: any) {
                    console.log('Received message:', data);
                    peer.signal(data);
                });

                peer.on('signal', (data: any) => {
                    console.log('Sending message:', data);
                    this.socket.emit('signal', data);
                });
          
  
this.peer1.on('connect', () => {
})
  }

async pushFeed(feed:{id: string, name: string, feed?: MediaStream, url?: string, type: string}){

if (this.cameraScene) {
  this.oseg.removeScene(this.cameraScene)
}

this.cameraScene = {
  id: feed.id,
  name: feed.name,
  components: [
    {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      type: 3,
      typeName: 'feed',
      video: this.$refs[feed.id] as HTMLVideoElement
    }
  ]
}
this.oseg.importScene(this.cameraScene)
this.oseg.addSceneToCurrent(this.cameraScene)


}
async startBroadcast(stream: MediaStream) {

//alert user
try {

 await Swal.fire({
  title: 'Are you re?',
  text: "",  
})

this.peer1.addStream(stream)
}catch (error){
  await Swal.fire({
  title: 'Are you sure?',
  text: error+"",  
})
}

}
  

    // in a Swal, we list the the cameras from getuserMediaDevices() and let them select a device
    async selectCamera () {
      const cameras = navigator.mediaDevices.enumerateDevices()
      const cameraMap = (await cameras).filter(cam => cam.kind === 'videoinput').reduce((acc, cam) => {
        acc[cam.deviceId] = cam.label
        return acc
      }, {} as {[id: string]: string})

      const userChoice = await Swal.fire({
        title: 'Select a camera',
        input: 'select',
        inputOptions: cameraMap
      })
      if (userChoice.value) {
        var feed = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            deviceId: userChoice.value,
            width: 1920,
            height: 1080
          }
        })
        this.cameras.push({
          type: "camera-local",
          id: userChoice.value,
          name: cameraMap[userChoice.value],
          feed: feed
        })

      }
    }

  

}
</script>

<style>
.BroadcastPage {
    background-color: rgb(12, 12, 12);
    color: white;
    width: 100%;
    height: 100%;
}

.canvasOutput {
    width: 100%;
    height: auto;
    border: 1px solid #ccc;
}
.panel {
  padding: 10px;
}

.header-text{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgb(230, 230, 230);
  width:100%;
}

/* feedContainer is a flexbox that stacks twocolumns of feedDisplays */
.feedContainer {
  display: grid;
grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
    column-gap: 10px;
  row-gap: 1em;
 grid-auto-rows: 1fr
}

.feedDisplay {
  
  width: 100%;
  background-color: rgb(39, 39, 39);
}

/* addCameraOrVideo displays a grey background with rounded corners, and centered text vertical and horizontal */
.addCameraOrVideo {
  background-color: rgb(39, 39, 39);
  border-radius: 5px;
     display: flex;
    align-items: center; /* Vertical center alignment */
    justify-content: center; /* Horizontal center alignment */
  width: 100%;
  height: 100%;
  cursor: pointer;
}
 
/* pageTop is the top 80% of the screen and pageBottom isthe bottom 20% */
.pageTop {
  width: 100%;
  height: 75%;
  overflow-y: scroll;
}
.pageBottom {
  width: 100%;
  height: 25%;
  overflow-y: scroll;
}

</style>
