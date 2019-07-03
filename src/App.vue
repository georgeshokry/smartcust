<template>

  <div id="app" style="min-height: 100vh"  >
      <router-view/>

  </div>
</template>
<script>



    export default {
      components: {},
      name: "app",
      data() {
        return {

        }
      },
    }
</script>
<style>

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
    .loaderView{

    width: 300px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
    }
</style>
