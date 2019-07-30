<template>

  <div id="app" style=""  >
      <v-alert
              :value="warning"
              color="black"
              style="margin: 0; height: 10px"
              outline
      >
          <h3>
              <v-icon small color="white">info</v-icon>
              for better experience use
              <a href="https://www.google.com/intl/en/chrome/" style="text-decoration: none;" target="_blank">Google Chrome </a>
<!--              <v-icon small color="white" @click="warning = false"> clear</v-icon>-->
          </h3>

      </v-alert>
      <div class="blink-image" v-if="loading" style="height:initial; margin: 15%">
          <img  style="width: 180px;" src="./assets/logo.png">
      </div>
      <router-view />

  </div>
</template>
<script>

    import loadingDataProgress from './components/customerView/loadingDataProgress'
    export default {
      components: {loadingDataProgress},
      name: "app",
      data() {
          return{
              loading: true,
              warning: true
          }
      },
        computed:{
          getLoadingState(){
              return this.$store.getters.getLoadingState;
          }
        },
        watch:{
            getLoadingState(state){
                this.loading = state
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
.blink-image {
    -moz-animation: blink normal 2s infinite ease-in-out; /* Firefox */
    -webkit-animation: blink normal 2s infinite ease-in-out; /* Webkit */
    -ms-animation: blink normal 2s infinite ease-in-out; /* IE */
    animation: blink normal 2s infinite ease-in-out; /* Opera and prob css3 final iteration */
}
</style>
