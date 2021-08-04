
<template>
<div class="BroadcastPage">
      <!-- This is a broadcaster view for the broadcasting tool  -->
   <canvas ref="canvasOutput" width="600" height="400" style="border: 1px solid #ccc;"></canvas>
                                    
</div>
</template>

<script>
import OSEG from 'oseg'
export default {
  name: 'BroadcastView',
  data () {
    return {
      scenes: [],
      oseg: new OSEG(1920, 1080, this.$refs.canvasOutput)
    }
  },
  created () {
    console.log('BroadcastView created')
     const  exampleScene =  {
        id: "scene1",
        name: "Scene 1",
        components: [
          {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            type: componentType.text,
            text: "Hello World {gamebee.oreos}",
            options: {
            fontFamily: 'Arial',
            fontSize: 80,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
       
            }
          }
        ]
      }

    this.oseg.addSceneToCurrent(exampleScene, 5)
  }
}
</script>

<style>
.BroadcastPage {
    background-color: black;
    color: white;
    width: 100%;
    height: 100%;
}

</style>