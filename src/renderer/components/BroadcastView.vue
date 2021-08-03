
<template>
<div class="BroadcastPage">
      <!-- This is a broadcaster view for the broadcasting tool  -->
    <!-- Nav bar with SeasonCast Studio logo svg and the project name in the left and on the right side have icons that are to: User icon, Settingsicon, Help icon, and Logout icon. -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <a class="navbar-brand" href="#">SeasonCast Studio</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- The main content of the page is the broadcasting software, it will contain a sidebar with a list of Scenes (each scene has a image, title, and icons toadd, edit, and remove the scene). and the bottom half of the side bar will list the propeties of the selected scene. The second section will have a preview window the bottom half having a Storeline (a storeline has a timeline track that can have Scenes placed on to be added to the preview video. The third section will have Output window that shows a modifed version of preview. Below the output window will be the audio mixing section )  -->
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="sidebar">
              <h4>Available Scenes</h4>
              <div>
                <ul class="list-group">
                  <li class="list-group-item" v-for="scene in scenes" v-bind:key="scene.id">
                    <image class="img-responsive" :src="scene.image" width="100%"></image>
                    <h4 class="list-group-item-heading">{{scene.title}}</h4>
                    <!-- Icons to push to preview, edit, and remove the scene -->
                    <a class="btn btn-default" href="#" role="button" @click="pushScene(scene)">
                      <i class="fa fa-plus"></i>
                    </a>
                    <a class="btn btn-default" href="#" role="button" @click="editScene(scene)">
                      <i class="fa fa-pencil"></i>
                    </a>
                    <a class="btn btn-default" href="#" role="button" @click="removeScene(scene)">
                      <i class="fa fa-trash"></i>
                    </a>
                  </li>
                </ul>
              </div>

          </div>
        </div>

                        
                    
                                            
            
</div>   
</div>

</template>

<script>
export default {
  name: 'BroadcastView',
  data () {
    return {
      scenes: [],
      oseg: undefined
    }
  },
  methods: {
    pushScene (scene) {

    },
    setupOSEG () {
      //this.oseg = new OSEG();

  }

},
  created () {
    this.setupOSEG();
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