<template>
    <v-app>
        <v-card flat >
            <v-toolbar

                    color="black"
                    dark
                    extended
                    extension-height="120px"
                    flat
                    style=" background-image: url(https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Ffooter.png?alt=media&token=8a65796d-0407-4ed3-ab25-ce90f5471c49); background-size: 100%; z-index: 0"
                    scroll-off-screen


            >

                <v-badge left color="white" style="margin-top: 70px;">

                    <template  v-slot:badge >
                        <span style="color: black">α</span>
                    </template>
                    <v-toolbar-title ><div></div><img style=" max-width: 180px;max-height: 100px;" src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Flogowhite.png?alt=media&token=b14daf87-4227-4a7c-a36c-3505a6dbb371"></v-toolbar-title>
                </v-badge>

            </v-toolbar>

            <v-layout row pb-2 style="height: 100vh; z-index: 1">
                <v-flex xs10 offset-xs1>
                    <v-card class="card--flex-toolbar" elevation="0">

                        <v-toolbar   prominent  absolute fixed style="position: sticky;">
                            <span class="breaking-news">Breaking News</span>
                            <v-toolbar-title class="body-2 grey--text">


                                <div >
                                            <transition name="slide-fade" tag="div" mode="out-in">
                                                <a class="news" href="#" v-if="news[0]" key="0">SOON</a>
                                                <a class="news" href="#" v-if="news[1]" key="1">Will see photographer News Here</a>
                                            </transition>
                                </div>
                            </v-toolbar-title>

                            <v-spacer></v-spacer>

                            <div style="z-index: 999; cursor: default;">
                            <v-tooltip lazy left color="red" >
                                <template v-slot:activator="{ on }">
                                    <v-expand-x-transition>
                                    <v-icon v-show="noInternetIcon" v-on="on">cloud_off</v-icon>
                                    </v-expand-x-transition>
                                </template>
                                <span >You're offline!</span>
                            </v-tooltip>
                            </div>

                            <v-menu bottom left>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            icon
                                            v-on="on"
                                    >
                                        <v-icon dark>more_vert</v-icon>
                                    </v-btn>
                                </template>

                                <v-list dark>
                                    <v-list-tile
                                            @click="logoutCust"
                                    >
                                        <v-list-tile-title>Logout </v-list-tile-title>
                                        <v-icon right> keyboard_tab</v-icon>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>

                        </v-toolbar>

                        <v-divider></v-divider>

                        <v-card-text style="height: 100%; padding: 0px">
                            <v-parallax  src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fback4.png?alt=media&token=0cce690b-982c-4b48-85dd-1b529ba2656e" height="1000" jumbotron  style="height: 100%;  background-color: black;">

                            <v-layout row wrap style="justify-content: center;     margin-top: 65px;">

                                <div style=" height: 100%; margin: 5px">
                                    <div transition="fade-transition">
                                    <profilecard  style="margin: 10px"></profilecard>
                                    </div>
                                    <pointsplancard style="margin: 10px"></pointsplancard>
                                </div>


                                <div style=" height: 100%; width: 50%; margin: 5px;text-align: -webkit-center; ">
                                    <v-flex d-flex xs12>
                                        <v-layout row wrap style="    justify-content: center;">
                                        <pointscard style="margin: 10px"></pointscard>
                                        <ordersprofile style="margin: 10px"></ordersprofile>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex d-flex xs12>
                                    <newofferscard style="margin: 10px; "></newofferscard>
                                    </v-flex>
                                </div>

                            </v-layout>

                            </v-parallax>

                        </v-card-text>

<!--                        footer goes here-->
                        <appfooter></appfooter>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>

        <v-snackbar
                v-model="connection"
                :color="alertColor"
                :timeout="timeoutInterval"
                right
        >
            {{ connectionError }}
            <v-btn

                    icon
                    @click="connection = false"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
<!--        the snackbar of whole customer app for firebase msg ana alerts-->
        <v-snackbar
                v-model="firebaseAlerts"
                :color="msgColor"
                :timeout="msgTimeoutInterval"
                right
                top
        >
            <v-icon color="white">check_circle_outline </v-icon> {{ firebaseMsg }}
            <v-btn

                    icon
                    @click="firebaseAlerts = false"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>

    </v-app>
</template>
<script>

    import Profilecard from "./profileCard";
    import Ordersprofile from "./oredersProfile";
    import Pointscard from "./pointsCard";
    import Newofferscard from "./newOffersCard";
    import Appfooter from "../appFooter";
    import Pointsplancard from "./pointsPlanCard";
    import SimpleCrypto from "simple-crypto-js";

    export default {
        name: 'customerprofile',
        components: {Pointsplancard, Appfooter, Newofferscard, Pointscard, Ordersprofile, Profilecard},
        data: () => {

            return{
                // the snackbar of whole customer app for firebase msg and alerts
                firebaseAlerts:false,
                firebaseMsg: "",
                msgColor: "",
                msgTimeoutInterval: 4000,
                snackbarIcon: "",

                noInternetIcon: false,
                connection: false,
                connectionError: "",
                alertColor: "",
                tickerLocation: 0,
                timeoutInterval: 3000,
                news: [
                    true,
                    false,
                ]
            }
        },
        computed:{
            watchUserLogger(){
              return this.$store.getters.userStatus;
            },
            connectionChecker(){

                return this.$store.getters.getConnectionFlag;
            },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            }
        },
        watch:{

            watchUserLogger(state){
                console.log("LOGGER NOW", state);
                if(state === null){
                    this.$router.replace('/customerlogin');
                }
            },
            connectionChecker(con){
                if(con === true){
                    this.timeoutInterval = 3000;
                    this.connectionError = "You're back Online!";
                    this.alertColor = "success";
                    this.noInternetIcon = false;
                    this.connection =  true;

                }else if (con === false){
                    this.timeoutInterval = 6000;
                    this.connectionError = "You're Offline, Check your device connection!";
                    this.alertColor = "error";
                    this.noInternetIcon = true;
                    this.connection =  true;
                }
            },
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.firebaseMsg=  alert;
                    this.msgColor = "success";
                    this.snackbarIcon = "check_circle_outline";
                    this.msgTimeoutInterval= 4000;
                    this.firebaseAlerts= true;

                }
            },
            getFirebaseErrors(error){
                if(alert !== null){
                    this.firebaseMsg=  error;
                    this.msgColor = "error";
                    this.snackbarIcon = "highlight_off";
                    this.msgTimeoutInterval= 4000;
                    this.firebaseAlerts= true;
                }
            }
        },
        created: function() {
            let localSession = localStorage.getItem('appData');
            let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
            let simpleCrypto = new SimpleCrypto(_secretKey);
            let decipherUser = simpleCrypto.decrypt(localSession);
            if(decipherUser === "No-Didit"){
                this.$router.replace('/customerlogin');
            }
            this.$store.dispatch('checkConnetion');
            setInterval(this.updateTicker, 3000);

            this.$store.dispatch('getCustProfileInfo');

            this.watchScrolling();

        },
        methods: {
            updateTicker: function() {
                let removed = this.news.pop();
                this.news.unshift(removed);
            },
            logoutCust(){
                this.$store.dispatch('logoutUser');
            },

        },
        mounted () {

        }
    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }

    .card--flex-toolbar {
        margin-top: -64px;
    }



    .breaking-news {
        background-color: #000000;
        color: #ffffff;
        border-radius: 50px 50px 50px 50px;
        padding: 5px;
        font-style: italic;
    }



    .news {
        color: #000000;
    }

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

    /* recall toolbar class to center the title */
    .v-toolbar__content, .v-toolbar__extension {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 0 24px;
        justify-content: center;
    }

    .blink {
        padding-right: 1px;
        animation: blink 1s linear infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
