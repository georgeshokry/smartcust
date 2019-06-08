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
            <v-toolbar-title>Smart Customer</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="logout">Logout<v-icon right>exit_to_app</v-icon></v-btn>
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
                        @click=""
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
            <v-spacer></v-spacer>
            <div>  Photographer | Smart Customer v1.0 - {{ new Date().getFullYear() }} &copy;</div>
        </v-footer>
    </v-layout>

</template>
<script>

    import SimpleCrypto from "simple-crypto-js";
    export default {
        name: 'navbar',
        data () {
            return {
                drawer: false,
                items: [
                    { title: 'Home', icon: 'dashboard', link: '/dashboard',  },
                    { title: 'Customers', icon: 'people', link: '/customers' },
                    { title: 'Offers', icon: 'star', link: '/offers' },
                    { title: 'Orders', icon: 'forum', link: '/orders' },
                    { title: 'Points Level', icon: 'import_export', link: '/pointslevel' }
                ],
                mini: false,
                right: null
            }
        },
        computed:{
            user(){
                return this.$store.getters.userStatus;
            },
        },
        watch:{
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
        }
    }
</script>
<style>
    .highlighted{
        background-color: #ffffff78;
    }

</style>