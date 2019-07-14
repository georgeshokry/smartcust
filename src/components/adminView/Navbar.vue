<template>

<v-app id="navbar">
    <!--header toolbar-->
    <v-toolbar
            dark
            app

            fixed

    >


        <v-toolbar-side-icon  @click.stop="drawer = !drawer">
            <v-icon v-if="drawer === true">keyboard_arrow_left</v-icon>
        </v-toolbar-side-icon>



        <v-toolbar-title @click="$router.replace('/admin/dashboard')" style="cursor: pointer">

            <div class="responsive-title">
                <v-layout row wrap justify-content>

           <img class="image-logo" src="../../assets/logowhite-nameONLY.png"

           >

                </v-layout>
            </div>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items >
            <v-tooltip lazy bottom nudge-bottom="-15" color="red" >
                <template v-slot:activator="{ on }">
                    <v-expand-x-transition>
                        <v-icon v-show="noInternetIcon" v-on="on" color="red" style="cursor: default">cloud_off</v-icon>
                    </v-expand-x-transition>
                </template>
                <span >You're offline!</span>
            </v-tooltip>
            <v-divider vertical inset  class="mx-2 ma-2"></v-divider>
            <v-btn flat  @click="logout" small>Logout<v-icon right small>exit_to_app</v-icon></v-btn>

        </v-toolbar-items>

    </v-toolbar>

    <!--the left drawer-->
    <v-navigation-drawer
            fixed

            app
            dark
            v-model="drawer"
            width="210"
    >



            <v-list class="pa-1" style="background-color: black">
                <v-list-tile v-if="mini" @click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-list-tile avatar tag="div" >
                    <v-list-tile-avatar>
                        <img src="../../../public/favicon-logo.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content style="overflow: visible">
                        <v-list-tile-title style="font-weight: 600;">Wellcome, Mena!</v-list-tile-title>
                    </v-list-tile-content>


                </v-list-tile>


            </v-list>

            <v-list class="pt-0" dense  >
                <v-divider light></v-divider>

                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        :to="item.link"
                        :value="item.active"
                        active-class="default-class highlighted"

                >

                    <v-list-tile-action style="padding-left: 15px">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content style="padding-left: 15px">
                        <v-list-tile-title >{{ item.title }}</v-list-tile-title>

                    </v-list-tile-content>
                    <div v-bind:id="item.id" style=" width: 10px; color: #df322e;     height: 90%;"></div>
                </v-list-tile>

                <v-divider light></v-divider>

                <v-list-tile-action style="justify-content: center; margin: 15px; ">
                    <v-btn icon @click.stop="drawer = !drawer" style="background-color: #888888">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-tile-action>

                <v-divider light></v-divider>
                <v-footer
                        style="background-color: black"
                        dark
                        :fixed="true"
                        height="auto"
                        class="justify-center"
                >


<!--                    <v-spacer></v-spacer>-->
                    <div class="footer">
                        Photographer | Smart Customer<br>v1.0-beta - {{ new Date().getFullYear() }} &copy;<br>
                        for technical support, <a href="https://www.facebook.com/george.shokry1" style="text-decoration: none" target="_blank">contact me!</a>
                    </div>

                </v-footer>
            </v-list>




        </v-navigation-drawer>

    <v-content >

        <v-container fluid>
            
                <router-view></router-view>

            <create-speed-dial></create-speed-dial>
        </v-container>
    </v-content>


        <v-snackbar
                v-model="connection"
                :color="alertColor"
                :timeout="timeoutInterval"
                bottom
                style="z-index: 999"
        >
            {{ connectionError }}
            <v-btn

                    icon
                    @click="connection = false"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>

    <v-snackbar
            v-model="firebaseMutationsAlert"
            :color="firebaseMutationsColor"
            right
            top
    >
        <v-icon color="white">{{iconAlert}}&nbsp</v-icon>&nbsp{{ firebaseMutationsMsg }}
        <v-btn

                icon
                @click="firebaseMutationsAlert = false"
        >
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>


        <annoying-no-internet v-if="$route.path !== '/admin/dashboard'"></annoying-no-internet>
        <logout-progress :exitLoading="showLogoutProgress"></logout-progress>

</v-app>


</template>
<script>

    import createSpeedDial from "./CreateSpeedDial"
    import SimpleCrypto from "simple-crypto-js";
    import checkConnectionMixin from "../mixins/checkConnectionMixin";
    import annoyingNoInternet from "../../views/annoyingNoInternet"
    export default {
        name: 'navbar',
        components: {
            createSpeedDial,
            annoyingNoInternet,
            logoutProgress:()=> import("../../views/logoutProgress")
        },
        mixins: [checkConnectionMixin],
        data () {
            return {
                firebaseMutationsAlert: false,
                firebaseMutationsMsg: '',
                firebaseMutationsColor: '',
                iconAlert: '',

                drawer: null,
                items: [
                    { title: 'Dashboard', icon: 'dashboard', link: '/admin/dashboard',id: "dashboard-tile"  },
                    { title: 'Customers', icon: 'people', link: '/admin/customers', id: "customer-tile"},
                    { title: 'Offers', icon: 'loyalty', link: '/admin/offers', id: "offer-tile" },
                    { title: 'Reservations', icon: 'forum', link: '/admin/reservations', id: "order-tile" },
                    { title: 'Points Plan', icon: 'import_export', link: '/admin/pointsplan', id: "point-tile" }
                ],
                mini: false,
                right: null,
                showLogoutProgress: false,
            }
        },
        computed:{
            user(){
                return this.$store.getters.userStatus;
            },
            firebaseSuccessShow(){
                return this.$store.getters.firebaseSuccesses;
            },
            firebaseErrorShow(){
                return this.$store.getters.firebaseError;
            },
        },
        watch:{
            firebaseSuccessShow(success) {
                if(success !==null) {
                    this.firebaseMutationsMsg = success;

                    this.iconAlert = "check_circle";
                    this.firebaseMutationsColor = "success";
                    this.firebaseMutationsAlert = true;
                }
            },
            firebaseErrorShow(error){
                if(error !== null) {
                    this.firebaseMutationsMsg = error;

                    this.iconAlert = "cancel";
                    this.firebaseMutationsColor = "error";
                    this.firebaseMutationsAlert = true;
                }

            },
            user(checkStat){
            if(checkStat !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                let localSession = localStorage.getItem('appData');
                let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
                let simpleCrypto = new SimpleCrypto(_secretKey);
                let decipherUser = simpleCrypto.decrypt(localSession);

                if (decipherUser !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                    this.$router.replace('/admin-login');
                }
            }
            }
        },
        methods: {
           logout(){
               // this.$router.replace('/admin-login');
               this.showLogoutProgress = true;
               this.$store.dispatch('logoutUser');
           }
        },
        created() {
            this.$store.dispatch('checkConnetion');


        },
        mounted() {

        }
    }
</script>
<style>
    .highlighted{
        background-color: rgba(255, 255, 255, 0.21);
    }

    @media screen and (max-width: 375px) {
        div.responsive-title {
            margin-left: 0;
            font-size: 13px;
            word-break: break-word;
            max-width: 100px;
            max-height: 30px;
        }
    }
    .footer{
        font-size: smaller;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .image-logo {
        width: 100px;
    }
    @media screen and (max-width: 375px) {
        .image-logo {
            width: 80px;
        }
    }
    .v-list__tile{
        padding-left: 16px;
        padding-right: 0;
    }

    #customer-tile{
        border-right: .25rem solid #00ff18 !important;
    }
    #offer-tile{
        border-right: .25rem solid #ff3935 !important;
    }
    #order-tile{
        border-right: .25rem solid #f874ff !important;
    }
    #point-tile{
        border-right: .25rem solid #5884ff !important;
    }
    #dashboard-tile{
        border-right: .25rem solid #000000 !important;
    }
</style>