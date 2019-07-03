<template>
    <v-app id="home">
<!--    <div  style="min-height: 100vh">-->

        <navbar></navbar>
<!--    </div>-->
    </v-app>
</template>
<script>



    export default {
        components: {
            Navbar: () => import("../components/adminView/Navbar"),
        },
        name: 'home',
        data () {
            return {
            }
        },
    }
</script>
<style>

    .page {
        position: fixed;
        width: inherit;
    }
</style>