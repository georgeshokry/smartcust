<template>

  <div id="app" style="min-height: 100vh"  >

<!--      <div v-if="showAppLoader">-->
<!--      <v-progress-circular-->

<!--              :size="70"-->
<!--              :width="7"-->
<!--              indeterminate-->
<!--              color="black"-->
<!--      ></v-progress-circular>-->
<!--      </div>-->

      <home></home>

  </div>
</template>
<script>

import Home from '@/views/Home'
import Navbar from "@/components/adminView/Navbar";
    export default {
      components: {Navbar, Home},
      name: "app",
      data() {
        return {

        }
      },
        created() {

        }
        // computed: {
        //     user(){
        //         return this.$store.getters.userStatus;
        //     }
        // },
        // watch:{
        //     user(value){
        //         if(value !== null && value !== undefined){
        //             this.showAppLoader = true;
        //         }else {
        //             this.showAppLoader = false;
        //
        //         }
        //     },
        // }
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
