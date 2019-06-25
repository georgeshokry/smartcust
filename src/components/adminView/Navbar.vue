<template>

    <v-layout
            wrap
            style="height: 100%;"
    >

        <!--header toolbar-->
        <v-toolbar
                dark
                :fixed="true"
                :clipped="true"
        >


            <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>



            <v-toolbar-title style="margin-left: 0!important; "><div class="responsive-title">Smart Customer</div></v-toolbar-title>
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
                v-model="drawer"
                :mini-variant="mini"
                :fixed="true"
                :clipped="true"
                dark
                temporary
                style="width: 210px;"

        >
            <v-list class="pa-1" >
                <v-list-tile v-if="mini" @click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content style="overflow: visible">
                        <v-list-tile-title style="font-weight: 600;">Wellcome, Mena!</v-list-tile-title>
                    </v-list-tile-content>


                </v-list-tile>


            </v-list>

            <v-list class="pt-0" dense>
                <v-divider light></v-divider>

                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        :to="item.link"
                        :value="item.active"
                        active-class="default-class highlighted"
                >

                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content >
                        <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>

                <v-divider light></v-divider>

                <v-list-tile-action style="justify-content: center; margin: 15px; ">
                    <v-btn icon @click.stop="drawer = !drawer" style="background-color: #888888">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-tile-action>

                <v-divider light></v-divider>
            </v-list>




        </v-navigation-drawer>

        <v-footer
                class="pa-3"
                dark
                :fixed="true"
                :clipped="true"
        >

            <create-speed-dial></create-speed-dial>
            <v-spacer></v-spacer>
            <div class="footer">  Photographer | Smart Customer v1.0 - {{ new Date().getFullYear() }} &copy;</div>
        </v-footer>

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
            {{ firebaseMutationsMsg }}
            <v-btn

                    icon
                    @click="firebaseMutationsAlert = false"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>

        <annoying-no-internet></annoying-no-internet>
    </v-layout>




</template>
<script>

    import createSpeedDial from "./CreateSpeedDial"
    import SimpleCrypto from "simple-crypto-js";
    import checkConnectionMixin from "../mixins/checkConnectionMixin";
    import annoyingNoInternet from "../../views/annoyingNoInternet"
    export default {
        name: 'navbar',
        components: {createSpeedDial, annoyingNoInternet},
        mixins: [checkConnectionMixin],
        data () {
            return {
                firebaseMutationsAlert: false,
                firebaseMutationsMsg: '',
                firebaseMutationsColor: '',

                drawer: false,
                items: [
                    { title: 'Home', icon: 'dashboard', link: '/dashboard',  },
                    { title: 'Customers', icon: 'people', link: '/customers' },
                    { title: 'Offers', icon: 'star', link: '/offers' },
                    { title: 'Reservations', icon: 'forum', link: '/reservations' },
                    { title: 'Points Plan', icon: 'import_export', link: '/pointsplan' }
                ],
                mini: false,
                right: null
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
                this.firebaseMutationsMsg = success;
                this.firebaseMutationsAlert=true;
                this.firebaseMutationsColor = "success";

            },
            firebaseErrorShow(error){
                this.firebaseMutationsMsg = error;
                this.firebaseMutationsAlert=true;
                this.firebaseMutationsColor = "error";



            },
            user(checkStat){
            if(checkStat !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                let localSession = localStorage.getItem('appData');
                let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
                let simpleCrypto = new SimpleCrypto(_secretKey);
                let decipherUser = simpleCrypto.decrypt(localSession);

                if (decipherUser !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                    this.$router.replace('/adminlogin');
                }
            }
    }
        },
        methods: {
           logout(){
               // this.$router.replace('/adminlogin');
               this.$store.dispatch('logoutUser');
           }
        },
        created() {
            this.$store.dispatch('checkConnetion');
        }
    }
</script>
<style>
    .highlighted{
        background-color: #ffffff78;
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
        font-weight: 600;
        font-size: smaller;
    }
</style>