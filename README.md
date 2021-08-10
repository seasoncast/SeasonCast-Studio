# Seasoncast Studio
> A professional-grade broadcasting software

The goal of this project is to create a simple, easy to use, and highly customizable open-source broadcast software.

Some of the features that are planned to be implemented:
- [x] Basic broadcasting
- [x] Multiple Camera Switching
- [x] Multiple Audio Input Switching
- [x] Data Loading from multiple sources in real-time
- [x] Mutiple computers can be used to work on the same broadcast
- [x] Remote camera from mobile devices
- [x] Easy to create custom graphics
- [x] Easy to play commercials
- [x] Use SeasonCast specific resources (GameBee, Event Creation)
- [x] Easy to use
- [x] Easy to customize


## End-user Installation
Coming Soon...


## Development 

Contributing to this project is welcome and encouraged! 


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


