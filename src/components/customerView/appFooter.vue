<template>
    <v-footer
            v-if="dataLoaded"
            class="pa-3 footer-center"
            dark
            height="fit-content"
    >
        <v-layout justify-space-between wrap row>
            <v-flex d-flex xs12 sm4 md3     justify-center>
        <v-card-text style="text-align: start">
            <strong>Contact Us</strong>
            <br>
            <br>
            <div >
            <v-icon color="white" small>phone</v-icon>
                <span> (+02)-{{adminData.phone_1}}</span><br>
                <span v-if="adminData.phone_2" style="    margin-left: 20px;">(+02)-{{ adminData.phone_2}}</span>
            </div>
            <v-icon color="white" small>alternate_email</v-icon> {{adminData.email}}<br>
            <v-icon color="white" small>place</v-icon> {{adminData.address}}<br>
            <br>
            <strong>Payment Method</strong>
            <br>
            <br>
            <div>
                <v-responsive avatar>
                    <v-avatar size="30">
                        <img width="20px" src="../../assets/orange-cash.png" alt="orange cash">
                    </v-avatar>
                    (+02)-{{adminData.phone_2}}
                </v-responsive>
            </div>

        </v-card-text>
            </v-flex>
            <v-flex d-flex xs12 sm4 md3     justify-center>
            <v-card-text style="text-align: start">
                <strong>Follow Us On</strong>
                <br>
                <br>
                <div>
                    <v-btn icon  size="5px" color="white" style="margin: 5px" :href="adminData.facebook" target="_blank">
                        <img width="30px" src="../../assets/facebook.svg">
                    </v-btn>

                    <v-btn icon  size="5px" color="white" style="margin: 5px"   :href="adminData.twitter" target="_blank">
                        <img width="30px" src="../../assets/twitter.svg">
                    </v-btn>

                    <v-btn icon  size="5px" color="white" style="margin: 5px"    :href="adminData.instagram" target="_blank">
                        <img width="30px" src="../../assets/instagram.svg">
                    </v-btn>
                </div>
                <br>

            </v-card-text>
            </v-flex>
            <v-flex d-flex xs12 sm4 md3     justify-center>
        <v-card-text style="text-align: left; justify-content: space-between">
            <strong>{{adminData.companyName}}</strong>
            <br>

            <br>
            <v-responsive>
                <v-layout column wrap style="">
                    <img style=" max-width: 150px;max-height: 100px;"
                         src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Flogowhite.png?alt=media&token=b14daf87-4227-4a7c-a36c-3505a6dbb371"
                    >
                    v1.0-beta - {{ new Date().getFullYear() }} &copy;
                </v-layout>
            </v-responsive>


        </v-card-text>
            </v-flex>
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