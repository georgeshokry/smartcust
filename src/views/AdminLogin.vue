<template>
   <v-app>
   <v-content>
<!--      <v-progress-linear color="black" :indeterminate="true" v-if="true"></v-progress-linear>-->
      <transition name="fade" mode="out-in">
   <v-container fluid  grid-list-sm0   style="position: relative; top: 10%;">

      <v-layout row wrap justify-center >

         <v-flex d-flex xs12 sm5 >

            <v-img

                    style="border-bottom-left-radius: 20px; border-top-left-radius: 20px"
                    src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser3.png?alt=media&token=a8a597d2-05d1-4da7-a4c1-6a0103d76a8b"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser3.png?alt=media&token=a8a597d2-05d1-4da7-a4c1-6a0103d76a8b"
                    aspect-ratio="2.75"
            ></v-img>
         </v-flex>


         <v-flex d-flex  xs12 sm4 child-flex>
            <v-card
                    elevation="20"
                    style="border-bottom-right-radius: 20px; border-top-right-radius: 20px"
            >


               <v-layout row wrap style="justify-content: center;">
                  <v-card-title primary-title>
                     <div>
                        <h3 class="headline mb-0">Admin Login For Dashboard</h3>
                     </div>
                  </v-card-title>
               <v-card-text style="max-width: 360px">
               <v-text-field
                       v-model="email"
                       v-validate="'required|email'"
                       :error-messages="errors.collect('email')"
                       :disabled="disabling"
                       label="E-mail"
                       data-vv-name="email"
                       required
                       box
                       clearable
                       prepend-inner-icon="account_box"
                       color="black"
               ></v-text-field>
               <v-text-field
                       v-model="password"
                       v-validate="'required'"
                       :error-messages="errors.collect('password')"
                       :disabled="disabling"
                       label="Password"
                       data-vv-name="password"
                       :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                       :type="showPassword ? 'text' : 'password'"
                       box
                       clearable
                       prepend-inner-icon="lock"
                       @click:append="[showPassword = !showPassword]"
                       v-on:keyup.enter="startLogin"
                       color="black"
               ></v-text-field>


               </v-card-text>
               </v-layout>
               <v-alert
                       :value="alert"
                       type="error"
                       color="red"
                       transition="scale-transition"
               >
                  {{ firebaseErrorShow }}
               </v-alert>
            <v-card-actions style="min-height: 90px;padding-left: 16px;align-items: flex-end;">

               <v-btn

                       :class="[disabling? 'disabled-Login': 'enabled-Login']"
                       :loading="loading"
                      :disabled="disabling"
                      color="black"
                       class="white--text"
                      @click="startLogin"

               >login</v-btn>



            </v-card-actions>
         </v-card>
      </v-flex>

      </v-layout>



   </v-container>
      </transition>
   </v-content>

   </v-app>
</template>
<script>
   import SimpleCrypto from "simple-crypto-js";

    export default {
        name: 'AdminLogin',
       $_veeValidate: {
          validator: 'new'
       },
        data () {
            return {
               btnShow: true,
               showProg: false,
               password: '',
               email: '',
               errMsg: '',
               alert: false,
               loading: false,
               disabling: false,
               loader: null,
               showPassword: false,
            }
        },
       created(){

          let userStatNow = this.$store.getters.userStatus;
             if(userStatNow === "X0P3ELO7GISMdClcAXAj9jaPE4u1"){
                let localSession = localStorage.getItem('appData');
                let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
                let simpleCrypto = new SimpleCrypto(_secretKey);
                let decipherUser = simpleCrypto.decrypt(localSession);

                if(decipherUser === "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                   this.$router.replace('/dashboard');
                }
             }
       },
       computed:{
         user(){
            return this.$store.getters.userStatus;
         },
          firebaseErrorShow(){
           return this.$store.getters.firebaseError;

          }

       },
       watch:{
         user(value){

            if(value === "X0P3ELO7GISMdClcAXAj9jaPE4u1"){
               let localSession = localStorage.getItem('appData');
               let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
               let simpleCrypto = new SimpleCrypto(_secretKey);
               let decipherUser = simpleCrypto.decrypt(localSession);

                if(decipherUser === "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                    this.$router.replace('/dashboard');
                }
            }
         },
          firebaseErrorShow(error){
            if(error !== null && error !== undefined) {

               this.errMsg = error;
               this.alert = true;

               this.loader = "";
               this.loading = false;
               this.disabling = false;

            }
            if(error === "You have Attempted to login many times, Try again later!"){
               this.btnShow = false;
               this.loading = false;
               this.disabling = true;
               this.loader= "Disabled";
            }
          }
       },
        methods: {
           startLogin() {
              this.errMsg = "";
               this.alert = false;
               this.$validator.validateAll().then(() => {
                  if (!this.errors.any()) {
                     this.loader = "loading";
                     this.loading = true;
                     this.disabling = true;
                     this.$store.dispatch('loginAdmin', {email: this.email, password: this.password});

                  }
               });

            }
        },
    }
</script>
<style scoped>
   .disabled-Login {
      cursor: not-allowed;
   }
   .enabled-Login {
      cursor: pointer;
   }
</style>
