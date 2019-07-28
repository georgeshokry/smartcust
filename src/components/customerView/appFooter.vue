<template>
    <v-footer
            v-if="dataLoaded"
            class="pa-3 footer-center"
            dark
            height="fit-content"
    >
        <v-layout wrap style="justify-content: space-between">
        <v-card-text style="width: auto; text-align: start">
            <strong>Contact Us</strong>
            <br>
            <br>
            <v-icon color="white" small>phone</v-icon>
            (+02)-{{adminData.phone_1}} <span v-if="adminData.phone_2">- (+02)-</span>{{ adminData.phone_2}}<br>
            <v-icon color="white" small>alternate_email</v-icon> {{adminData.email}}<br>
            <v-icon color="white" small>place</v-icon> {{adminData.address}}<br>



        </v-card-text>

            <v-card-text style="width: auto; text-align: start">
                <strong>Follow Us On</strong>
                <br>
                <br>
                <v-layout>
                    <v-btn icon  size="5px" color="white" style="margin: 5px" :href="adminData.facebook" target="_blank">
                        <img width="30px" src="../../assets/facebook.svg">
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon  size="5px" color="white" style="margin: 5px"  :href="adminData.twitter" target="_blank">
                        <img width="30px" src="../../assets/twitter.svg">
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon  size="5px" color="white" style="margin: 5px"  :href="adminData.instagram" target="_blank">
                        <img width="30px" src="../../assets/instagram.svg">
                    </v-btn>
                </v-layout>
            </v-card-text>
<!--            <v-divider vertical></v-divider>-->
        <v-card-text style="width: 360px; text-align: left; justify-content: space-between">
            <strong>{{adminData.companyName}}</strong>
            <br>

            <br>
            <v-responsive>
                <v-layout wrap style="">
                    <img style=" max-width: 150px;max-height: 100px;"
                         src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Flogowhite.png?alt=media&token=b14daf87-4227-4a7c-a36c-3505a6dbb371"
                    >

                    <v-spacer></v-spacer>
                    <img style=" max-width: 150px;max-height: 100px;"
                         src="../../assets/photographer-logo.png"
                    >
                    v1.0-beta - {{ new Date().getFullYear() }} &copy;
                </v-layout>
            </v-responsive>


        </v-card-text>
            <!--            <strong>v1.0-beta - {{ new Date().getFullYear() }} &copy;</strong>-->
        </v-layout>
    </v-footer>
</template>
<script>
    import adminInfoMixin from '../mixins/adminInfoMixin';
    export default {
        name: 'appfooter',
        components: {},
        mixins: [adminInfoMixin],
        data: () => {
            return{
                adminData: '',
                dataLoaded: false
            }
        },
        computed:{

        },
        watch: {

        },

        methods:{

        },
        created() {
            this.$store.dispatch('readAdminProfile');
        }
    }
</script>

<style>

.footer-center{
    justify-content: center;
}

</style>