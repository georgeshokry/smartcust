<template>
    <v-dialog
            lazy
            persistent
            v-model="noInternetIcon"
            max-width="700px"
            style="border-radius: 10px 10px 10px 10px;"
    >
        <v-card style="border-radius: 10px">
            <v-card-text  class="headline font-weight-bold" style="background-color: #f0f4f7;">
                <div style="color: red">You are Offline! :(</div>
                <v-responsive>
                    <img width="300px" src="../assets/caveman.gif">
                </v-responsive>

                <div>Please check your device connection to continue</div>
            </v-card-text>
            <v-card-text class="bottom-text"><h3>You don't need to refresh the page</h3></v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import checkConnectionMixin from "../components/mixins/checkConnectionMixin";
    export default {
        name: "annoyingNoInternet",
        mixins: [ checkConnectionMixin],
        data:()=>{
            return{

            }
        }
    }
</script>

<style>
    .bottom-text{
        filter: drop-shadow(0px 3px 4px black);
        background-color: #dfe5eb;
    }

</style>