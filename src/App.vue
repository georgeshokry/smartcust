<template>

  <div id="app" style="min-height: 100vh"  >
      <v-alert
              :value="warning"
              color="black"
              style="margin: 0; height: 10px"
              outline
      >
          <h3>
              <v-icon small color="white">info</v-icon>
              for better experince use
              <a href="https://www.google.com/intl/en/chrome/" style="text-decoration: none;" target="_blank">Google Chrome </a>
<!--              <v-icon small color="white" @click="warning = false"> clear</v-icon>-->
          </h3>

      </v-alert>
      <router-view/>

  </div>
</template>
<script>



    export default {
      components: {},
      name: "app",
      data() {
          return{
              warning: true
          }
      },
        created() {
           let detect =  window.navigator.userAgent.search("Chrome");
            if(detect > -1){
                this.warning = false
            }else if(detect <= -1){
                this.warning = true
            }
        }
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
