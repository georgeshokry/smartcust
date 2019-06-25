<template>
    <v-container
            fluid
            grid-list-md
            style="
 

                text-align: -webkit-center;
                background-color: black;
                height: 100vh;
            "
    >
        <v-flex d-flex xs10 sm6  style="justify-content: center; margin-top: 5%; margin-left: 0">
    <v-card

            height="auto"
            elevation="10"
            style="border-radius: 20px;     filter: drop-shadow(0px -2px 3px white);"
    >


<!--            <v-layout row wrap style="margin: 10%; justify-content: center;">-->
        <v-card-title style="justify-content: center;">
            <div>
                <v-img width="250" :src="logoPicPath"></v-img>

            </div>


        </v-card-title>
<!--                <v-card-text style="    width: 300px;">-->
<!--                <v-layout row  wrap style="margin: 10%; ">-->

                      <div style="  font-size: xx-large;   min-height: 100px;    margin-top: 20px;">
                          <v-btn outline flat large style="font-weight: bold; text-transform: capitalize;font-size: large;"  to="/home">Profile  </v-btn>

                          <v-btn outline flat large style="font-weight: bold; text-transform: capitalize;font-size: large;"   to="/dashboard">Dashboard</v-btn>
                      </div>





<!--            </v-layout>-->
<!--                </v-card-text>-->
<!--            </v-layout>-->

    </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "landing",
        data:()=>{
            return{
                logoPicPath: '',
            }
        },
        created() {
            let readCodeUrl = this.$route.query.smartCode;
            if(readCodeUrl !== undefined){
                let newLink = "/home" + "?smartCode=" + readCodeUrl;
                this.$router.replace(newLink);
                // this.startRedeemCode();
            }
            this.logoPicPath = require("@/assets/logo.png");
        },
        beforeMount() {

        }
    }
</script>

<style>

</style>