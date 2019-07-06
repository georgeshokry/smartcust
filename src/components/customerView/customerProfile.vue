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
                    <v-toolbar-title ><div></div>

                        <img style=" max-width: 180px;max-height: 100px;"
                             src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Flogowhite.png?alt=media&token=b14daf87-4227-4a7c-a36c-3505a6dbb371"
                    >

                    </v-toolbar-title>

                </v-badge>
            </v-toolbar>

            <v-layout row pb-2 style="height: 100vh; z-index: 1" >
                <v-flex xs10 offset-xs1 >
                    <v-card class="card--flex-toolbar" elevation="0" style="background-color: black;" >

                        <v-toolbar   prominent  absolute fixed style="position: sticky; border-radius: 0px 0px 20px 20px;">

                            <v-layout row justify-center align-center  v-if="dataLoading" style="max-height: 263px;max-width: 100px;" transition="scale-transition">
                                <v-progress-circular
                                        indeterminate
                                        color="black"
                                ></v-progress-circular>
                            </v-layout>

                            <div  style="z-index: 2" v-if="dataLoaded">
                                <v-layout row wrap style="align-items: center; justify-content: center">
                                <v-avatar
                                        :tile="false"
                                        size="40px"
                                        color="grey lighten-4"

                                >
                                    <img :src="iconType" alt="avatar">
                                </v-avatar>
                                    <v-divider vertical inset class=" ma-2"></v-divider>
                                    <div style="font-size: 1em;">
                                    <v-scroll-x-transition name="slide-fade" tag="div" mode="out-in">
                                        <div style="font-weight: 700;text-transform: capitalize;" class="news header-text"  v-if="news[0]" key="0"></div>
                                        <div style="font-weight: 700;text-transform: capitalize;" class="news header-text"  v-if="news[1]" key="1">Hi, {{dataGetted.userFirstName}}!</div>
                                        <div style="font-weight: 700;text-transform: capitalize;" class="news header-text"  v-if="news[2]" key="2">{{randomHints}}</div>
                                        <div style="font-weight: 700;text-transform: capitalize;" class="news header-text"  v-if="news[3]" key="3" @click="">{{dataGetted.userFirstName}}</div>

                                    </v-scroll-x-transition>
                                    </div>

                                </v-layout>
                            </div>

                            <v-spacer></v-spacer>


                            <v-layout row wrap justify-end>
<!--                            <v-icon >notifications_none</v-icon>-->


                            <v-divider vertical inset dark class="mx-2 ma-2" ></v-divider>
<!--                            the indicator for internet -->

                                <v-tooltip lazy bottom nudge-bottom="-15" color="red" >
                                    <template v-slot:activator="{ on }">
                                        <v-expand-x-transition>
                                            <v-icon v-show="noInternetIcon" v-on="on" color="red" style="cursor: default">cloud_off</v-icon>
                                        </v-expand-x-transition>
                                    </template>
                                    <span >You're offline!</span>
                                </v-tooltip>


                            <v-divider vertical inset class="mx-3 ma-2"></v-divider>

                            <v-menu bottom left fixed offset-y >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            icon
                                            v-on="on"
                                    >
                                        <v-icon dark>more_vert</v-icon>
                                    </v-btn>
                                </template>

                                <v-list style="    width: 168px; ">
                                    <v-list-tile

                                            @click="logoutCust"
                                    >
                                        <v-list-tile-content>
                                            Logout
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                        <v-icon right> keyboard_tab</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>


                            </v-layout>

                        </v-toolbar>

                        <v-divider></v-divider>
                        <v-card-text style="height: 100%; padding: 0px" >
                            <v-parallax  src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fback4.png?alt=media&token=0cce690b-982c-4b48-85dd-1b529ba2656e" height="1000" jumbotron  style="height: 100%;  background-color: black;">

                            <v-layout row wrap  justify-center style="" >

                                <v-layout column wrap style="align-content: center; max-height: fit-content; max-width: fit-content">
                                <profilecard  style="margin: 10px; min-width: 250px; "></profilecard>
                                <reservations-card style="margin: 10px"></reservations-card>
                                </v-layout>
                                <v-layout row wrap>
                                <div style=" margin: 5px; width: 100%">

                                    <v-flex d-flex xs12 justify-center style="margin-bottom: 10px; height: fit-content; min-width: fit-content">
                                        <newofferscard style="margin: 10px; "></newofferscard>
                                    </v-flex>

                                </div>
                                </v-layout>

                                <v-layout column wrap style="align-content: center; max-width: fit-content;">
                                    <pointscard style="margin: 10px;height: fit-content; max-width: fit-content"></pointscard>
                                    <pointsplancard style="margin: 10px"></pointsplancard>
                                </v-layout>
<!--                                <div style=" height: 100%; margin: 5px;text-align: -webkit-center; ">-->

<!--                                    <v-flex d-flex xs12>-->
<!--                                        <v-layout row wrap style="    justify-content: center;">-->
<!--                                        -->
<!--                                        <ordersprofile style="margin: 10px"></ordersprofile>-->
<!--                                        </v-layout>-->
<!--                                    </v-flex>-->

<!--                                </div>-->

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


<logout-progress v-model="showLogoutProgress"></logout-progress>

    </v-app>
</template>
<script>


    import SimpleCrypto from "simple-crypto-js";
    import userInfoMixin from "../mixins/userInfoMixin";
    import checkConnectionMixin from "../mixins/checkConnectionMixin";

    const hints = [
        "Check Out the latest Offers!",
        "Don't forget to share your SmartCode!",
        "Have a nice day!",
    ];
    export default {
        name: 'customerprofile',
        components: {
            Pointsplancard:() => import("./pointsPlanCard"),
            Appfooter:() => import("./appFooter"),
            Newofferscard:() =>import("./newOffersCard"),
            Pointscard:() =>import("./pointsCard"),
            reservationsCard:() => import("./reservationsCard"),
            Profilecard:() => import("./profileCard"),
            logoutProgress:()=> import("../../views/logoutProgress")
        },
        mixins: [userInfoMixin, checkConnectionMixin],
        data: () => {

            return{
                dataLoading: true,
                dataLoaded: false,
                exitLoading: false,
                // the snackbar of whole customer app for firebase msg and alerts
                firebaseAlerts:false,
                firebaseMsg: "",
                msgColor: "",
                msgTimeoutInterval: 4000,
                snackbarIcon: "",
                counetr:0,

                showLogoutProgress: false,

                randomHints: hints[Math.floor(Math.random() * hints.length)],

                // noInternetIcon: false,
                // connection: false,
                // connectionError: "",
                // alertColor: "",
                // tickerLocation: 0,
                // timeoutInterval: 3000,
                news: [
                    true,
                    false,
                    false,
                    false
                ]
            }
        },
        computed:{
            watchUserLogger(){
              return this.$store.getters.userStatus;
            },
            // connectionChecker(){
            //
            //     return this.$store.getters.getConnectionFlag;
            // },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
            checkDatabaseLoaded(){
                return this.dataGetted;
            }
        },
        watch:{
            checkDatabaseLoaded(data){
                if(data) {
                    this.dataLoading = false;
                    this.dataLoaded = true;
                    setInterval(this.updateTicker, 3000);
                }
            },

            watchUserLogger(state){
                console.log("LOGGER NOW", state);
                if(state === null){
                    this.$router.replace('/customer-login');
                }

            },
            // connectionChecker(con) {
            //     if (con === true) {
            //         this.timeoutInterval = 3000;
            //         this.connectionError = "You're back Online!";
            //         this.alertColor = "success";
            //         this.noInternetIcon = false;
            //         this.connection = true;
            //
            //     } else if (con === false) {
            //         this.timeoutInterval = 6000;
            //         this.connectionError = "You're Offline, Check your device connection!";
            //         this.alertColor = "error";
            //         this.noInternetIcon = true;
            //         this.connection = true;
            //     }
            // },
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
                if(error !== null){
                    this.firebaseMsg=  error;
                    this.msgColor = "error";
                    this.snackbarIcon = "highlight_off";
                    this.msgTimeoutInterval= 4000;
                    this.firebaseAlerts= true;
                }
            }
        },
        beforeMount: function() {

            let localSession = localStorage.getItem('appData');
            let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
            let simpleCrypto = new SimpleCrypto(_secretKey);
            let decipherUser = simpleCrypto.decrypt(localSession);
            if(decipherUser === "No-Didit"){
                this.$router.replace('/customer-login');
            }else {
                this.$store.dispatch('checkConnetion');


                this.$store.dispatch('getCustProfileInfo');

                this.$store.dispatch("changeLastLoginState");
                this.$store.dispatch("changeUserToOffline");
                this.$store.dispatch('listenOnAllOccasions');
            }
        },
        methods: {
            updateTicker: function() {
                if(this.counetr < 3) {
                    let removed = this.news.pop();
                    this.news.unshift(removed);
                }
                this.counetr +=1;
            },
            logoutCust(){
                this.showLogoutProgress = true;
                this.$store.dispatch('logoutUser');
            },

        },

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

    @media screen and (max-width: 375px) {
        div.header-text {
            font-size: 10px;
            word-break: break-word;
            max-width: 80px;
            max-height: 71px;
        }
    }
    .custom-progress-dialog{
        border-radius: 35px;
    }
    .v-menu__content{
        border-radius: 0px 0px 20px 20px !important;
    }
</style>
