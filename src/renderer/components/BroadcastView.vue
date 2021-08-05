
<template>
<div class="BroadcastPage">
      <!-- This is a broadcaster view. there is three columns. the first one is the sidebar -->
    <div  class="row">
        <div class="col-md-3">
        <div class="sidebar-nav panel">
          <h3 class="header-text">Scenes</h3>
          <ul class="nav nav-sidebar">
            <li v-for="scene in scenes" v-bind:class="{'active': scene.id == false}">
              <a v-on:click="selectScene(scene.id)">{{scene.name}}</a>
            </li>
          </ul>
        </div>
        </div>
        <div class="col-md-9">
          <div class="panel panel-default">
            <h3 class="header-text">Feed Output</h3>
   <canvas ref="canvasOutput" class="canvasOutput"></canvas>
          </div>
        </div>
    </div>
    <div  class="row">
         <div class="col-md-3">
          <div class="panel panel-default">
            <h3 class="header-text">Scoreboard</h3>
          </div>
        </div>
        <div class="col-md-6">
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

<script>



import OSEG from 'oseg'
export default {
  name: 'BroadcastView',
  data () {
    return {
      scenes: [],
      oseg: undefined,
    }
  },
  destroyed () {
    this.oseg = undefined
  },
  mounted () {
    console.log('BroadcastView created')
   
    this.oseg = new OSEG(1920, 1080, this.$refs.canvasOutput) 
     const exampleScene = {
      id: 'scene1',
      name: 'Scene 1',
      components: [
        {
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          type: 1,
          text: 'Hello World {gamebee.oreos}',
          options: {
            fontFamily: 'Arial',
            fontSize: 80,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850'

          }
        }
      ]
    }
    
    this.oseg.addSceneToCurrent(exampleScene)
    this.oseg.broadcastTimerStart()
    
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


</style>