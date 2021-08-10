# Seasoncast Studio
> A professional-grade broadcasting software

The goal of this project is to create a simple, easy to use, and highly customizable open-source broadcast software. This is open-source software and is free for end-users.

Some of the features that are planned to be implemented:
- [ ] Basic broadcasting
- [ ] Multiple Camera Switching
- [ ] Multiple Audio Input Switching
- [ ] Data Loading from multiple sources in real-time
- [ ] Mutiple computers can be used to work on the same broadcast
- [ ] Remote camera from mobile devices
- [ ] Easy to create custom graphics
- [ ] Easy to play commercials
- [ ] Use SeasonCast specific resources (GameBee, Event Creation)
- [ ] Easy to use
- [ ] Easy to customize


## End-user Installation
Coming Soon...


## Development 

Contributing to this project is welcome and encouraged! Checkout 'Development Milestones' section for a list of current tasks.


[Maxwell Smith](https://github.com/themaxsmith) is the lead developer of this project. Contact him by opening an issue or PR.


The layout of this project is as follows:

- UI/Frontend: [Vue 3](https://vuejs.org/) - TypeScript
- Rendering Engine: [OSEG](https://www.npmjs.com/package/oseg) - In-House & located as oseg in NPM
- Desktop Framework: [Electron](https://www.electronjs.org/) - Using vue-cli-plugin-electron-builder
- Local Backend: [Node.js](https://nodejs.org/)] - Running locally in Electron

The flow of the project is as follows:

User Input -> UI -> Rendering Engine -> UI -> Backend -> SeasonCast Ingest Servers (Or 3rd party RTMP Servers)

WebRTC is to be used for sending video and audio data from remote cameras, and for sending data to the local backend.

SRT/RTMP is to be used for sending data to SeasonCast Ingest Servers or 3rd party ingest servers.


### Setup

```
yarn install
```

### Compiles and hot-reloads for development

You can develop SeasonCast Studio ether as a web app or as a desktop app:

As a Desktop App:
```
yarn electron:serve
```

In Your Browser:
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Development Milestones

### [&#10007;] Basic broadcasting
- [x] Add user webcam to the UI
- [ ] User webcam input to the oseg canvas
- [ ] oseg canvas output to local backend via WebRTC using this [example](https://github.com/node-webrtc/node-webrtc-examples)
- [ ] local backend output to RTMP output via FFMPEG using this [example](https://github.com/node-webrtc/node-webrtc-examples/tree/master/examples/record-audio-video-stream)

### [&#10007;] Basic graphic changing
- [ ] List scenes in the UI
- [ ] Select and de-select a scene

### [&#10007;] Basic broadcasting - Part 2
- [ ] User microphone input to a audio mixer
- [ ] Audio mixer output to local backend

### [&#10007;] Basic storyline
- [ ] Show a story in the UI
- [ ] a timline of the story and when it ends 
More goals to be added...

### [&#10007;] Basic SeasonCast Integration 
- [ ] User can optionally auth user with SeasonCast using API V2 : docs [here](https://documenter.getpostman.com/view/7815111/SztK35Gr)
- [ ] Pass user auth token to oseg rendering engine
