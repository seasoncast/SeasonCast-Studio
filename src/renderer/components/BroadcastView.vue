
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
    
</div>   
</template>

<script>
export default {

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