<template>
    <v-app>
        <v-container
                fluid
                grid-list-md
                style="
            padding-top: 0px;
            padding-bottom: 75px;
                text-align: -webkit-center;

                height: 100vh;
            "
        >
            <v-flex d-flex xs12 sm6 offset-sm3 style="justify-content: center; margin-left: 0%;">
                <v-layout row wrap style="margin: 10%; justify-content: center;">

                    <v-card
                            width="100%"
                            elevation="5"
                            style="border-radius: 20px"
                    >


                        <v-card-title style="justify-content: center;">
                            <v-tooltip bottom color="black">
                                <template v-slot:activator="{ on }">
                                    <v-btn icon style="left: 0px;position: absolute;top: 0; margin: 15px;" to="/customer-login" v-on="on">
                                        <v-icon>arrow_back</v-icon>
                                    </v-btn>
                                </template>
                                <span>Back To Sign-in</span>
                            </v-tooltip>

                            <div>
                                <h3 class="headline mb-0">Password Reset</h3>

                            </div>
                        </v-card-title>
                            <v-card-text style="max-width: 350px">
                                <v-text-field
                                        v-model="resetEmail"
                                        v-validate="'required|email'"
                                        :error-messages="errors.collect('email')"
                                        data-vv-name="email"
                                        label="Write your e-mail"
                                        color="black"
                                        required
                                        box
                                        clearable
                                        prepend-inner-icon="account_box"
                                        autofocus
                                ></v-text-field>

                            </v-card-text>
                        <v-alert
                                :value="resetAlertFlag"
                                :type="alertType"
                                :color="alertColor"
                                transition="scale-transition"
                                class="custom-alert"
                        >
                            {{ resetFirebaseMsg }}
                        </v-alert>
                        <v-card-actions style="justify-content: center">

                            <v-btn
                                    :loading="resertBtnLoading"
                                    :disabled="resertBtnLoading"
                                    color="black"
                                    class="white--text"
                                    @click="sendPasswordReset"

                            >Reset</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "resetPassword",
        data:()=>{
            return{
                resetEmail: '',
                resertBtnLoading: false,
                resetFirebaseMsg:'',
                resetAlertFlag: false,
                alertType: 'success',
                alertColor: 'success',


            }
        },
        computed:{
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
        },
        watch: {
            getFirebaseSuccess(success){
                if(success !== null) {
                    this.resertBtnLoading = false;
                    this.resetFirebaseMsg = success;
                    this.resetAlertFlag = true;
                    this.alertType = 'success';
                    this.alertColor = 'success';
                }
            },
            getFirebaseErrors(error) {
                if(error !== null){
                    this.resertBtnLoading = false;
                    this.resetFirebaseMsg = error;
                    this.resetAlertFlag = true;
                    this.alertType = 'error';
                    this.alertColor = 'error';
                }
            }
        },
        methods:{
            sendPasswordReset() {
                const results = Promise.all([
                    this.$validator.validate('email'),

                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.resertBtnLoading = true;
                        this.resetAlertFlag = false;
                        this.$store.dispatch('resetCustomerPassword', this.resetEmail);
                    }
                });
            }
        }
    }
</script>

<style>
    .custom-alert i{
        margin-right: 0;
    }
</style>