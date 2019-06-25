<template>
    <v-footer
            class="pa-3 footer-center"
            dark
    >

        <div>  Photographer | Smart Customer v1.0-beta - {{ new Date().getFullYear() }} &copy;</div>
    </v-footer>
</template>
<script>

    export default {
        name: 'appfooter',
        components: {},
        data: () => {
            return{

            }
        },

        methods:{

        }
    }
</script>

<style>

.footer-center{
    justify-content: center;
}

</style>