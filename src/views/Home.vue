<template>
    <v-app>
    <div id="home" style="min-height: 100vh">



        <router-view></router-view>

<!--        <v-subheader-->

<!--        >-->
<!--            <v-breadcrumbs-->
<!--                    :v-for="{breadcrumbs, idx} in breadcrumbsList"-->
<!--                    :key="idx"-->
<!--                    @click="routeTo(idx)"-->
<!--            >-->
<!--                {{breadcrumbs.name}}-->
<!--            </v-breadcrumbs>-->

<!--        </v-subheader>-->





    </div>
    </v-app>
</template>
<script>



    export default {
        components: {},
        name: 'home',
        data () {
            return {
                showNavbar: false,
                // breadcrumbsList: []
            }
        },
        // mounted(){
        //     this.updateList();
        // },
        computed:{
            user(){
                return this.$store.getters.userStatus;
            }

        },

        watch: {
            // user(value) {
            //     console.log(value);
            //     if(value !== null) {
            //         this.showNavbar = true;
            //         console.log(this.showNavbar);
            //     } else {
            //         console.log(this.showNavbar);
            //         this.showNavbar = false;
            //     }
            },
            methods:{
                // routeTo(theRoute){
                //     if(this.breadcrumbsList[theRoute].link){
                //         this.$router.push(this.breadcrumbsList[theRoute].link);
                //     }
                // },
                // updateList(){
                //     this.breadcrumbsList = this.$route.meta.breadcrumb
                // }
            }
    }
</script>
<style>

    .page {
        position: fixed;
        width: inherit;
    }
</style>