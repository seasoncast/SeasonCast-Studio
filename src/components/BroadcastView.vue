
<template>
<div class="BroadcastPage">
      <!-- This is a broadcaster view. there is three columns. the first one is the sidebar -->
    <div  class="pageTop row">
                    <div class="col-md-4">
          <div class="panel panel-default">
            <h3 class="header-text">Input Feeds</h3>
            <div class="panel-body">
            </div>
            <div class="feedContainer">
            <div class="feedDisplay" v-for="feed in cameras" v-bind:class="{'selected': feed.selected}" v-bind:key="feed.id">
              <div class="feedDisplay-inner">
               <video style="width:100%" v-bind:ref="feed.id" autoplay controls :src="feed.url"></video>
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
        <div class="col-3">
        <div class="sidebar-nav panel">
          <h3 class="header-text">Scenes</h3>
          <ul class="nav nav-sidebar">
            <li v-for="scene in oseg.scenes" v-bind:class="{'active': scene.id == false}" v-bind:key="scene.id">
              <a v-on:click="selectScene(scene.id)">{{scene.name}}</a>
              </li>
                   <!-- Dropdown to switch camera feed -->
            <br style="clear:both" />
              <span class="fa fa-camera"></span> Camera 1
            <li class="dropdown"> &nbsp;
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">

                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li v-for="cam in cameras" v-bind:key="cam.id">
                  <a v-on:click="selectCamera(cam.id)">{{cam.name}}</a>
                </li>
              </ul>
            </li>
            
            <!-- Dropdown to switch graphic -->
              <span class="fa fa-image"></span> Graphic

            <li class="dropdown"> &nbsp;
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li v-for="graphic in graphics" v-bind:key="graphic.id">
                  <a v-on:click="selectGraphic(graphic.id)">{{graphic.name}}</a>
                </li>
              </ul>
            </li>
          

            <!-- Temp to show rendering on screen : source: https://www.videvo.net/video/flying-through-palm-trees-along-beach/6471/ -->
            <video loop autoplay muted src="../assets/example_video_test.mp4" style="display:none;" ref="exampleVideo"></video>
          
          </ul>
        </div>
        </div>
        <div class="col-5">
          <div class="panel panel-default">
            <h3 class="header-text">Feed Output</h3>
   <canvas ref="canvasOutput" class="canvasOutput"></canvas>
          </div>
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


export default class BroadcastView extends Vue {
    scenes = [] as any[]
    cameras = [{id:'example', name: "Example", url: "https://www.w3schools.com/html/mov_bbb.mp4", type:"video" }] as {id: string, name: string, feed?: MediaStream, url?: string, type: string}[]
    graphics = [] as any[]
    oseg = new OSEG(1920, 1080, "dev-studio")

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
  mounted () {
      if (this.$refs.canvasOutput) {
    console.log('BroadcastView created')
    this.oseg.setupCanvas(this.$refs.canvasOutput as HTMLCanvasElement)
    const exampleScene = {
      id: 'scene1',
      name: 'Scene 1',
      components: [
        {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          type: 3,

          video: this.$refs.exampleVideo

        },
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
        this.cameras.push({
          type: "camera-local",
          id: userChoice.value,
          name: cameraMap[userChoice.value],
          feed: await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            deviceId: userChoice.value,
            width: 1920,
            height: 1080
          }
        })
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
