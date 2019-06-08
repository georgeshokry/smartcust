<template>
    <v-app>
        <v-container d-flex justify-center align-center align-content-center>

            <v-layout column wrap align-content-center>
                <v-card dark elevation="15">

                    <v-card-title  >

                    <v-flex d-flex xs6 >

                    <v-responsive style="    min-width: 350px;">
                        <img style="max-width: 270px; margin: 20px;" src="../assets/undraw_empty_xct9.svg">
                    </v-responsive>
                    </v-flex>

                        <v-flex d-flex xs6 >

                        <div>
                            <div style="font-size: -webkit-xxx-large;font-family: monospace;">404</div>
                            <v-icon color="white" size="xx-large">highlight_off</v-icon>
                            <div style="    font-size: large;"> Sorry Nothing Here! </div>
                        </div>

                        </v-flex>
                    </v-card-title>
                    <v-card-actions style="justify-content: center; padding: 30px;">
                        <v-btn outline  color="white" to="/home">Back To Profile</v-btn>

                    </v-card-actions>

                </v-card>
            </v-layout>

        </v-container>
    </v-app>
</template>
<script>



    export default {
        components: { },
        name: 'http404',
        data () {
            return {

            }
        },

    }
</script>
<style>
    
</style>