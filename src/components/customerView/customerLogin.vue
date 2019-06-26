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
                        elevation="20"
                        style="border-radius: 20px"
                >
                    <v-responsive
                            position="top"
                    >
                    <v-img

                            src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser1.png?alt=media&token=245212ee-6aa3-49ef-8564-7fe2cbc18513"
                            lazy-src="https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser1.png?alt=media&token=245212ee-6aa3-49ef-8564-7fe2cbc18513"
                            aspect-ratio="2.55"
                    ></v-img>
                    </v-responsive>

                    <v-card-title style="justify-content: center;">
                        <div>
                            <h3 class="headline mb-0">Sign-in to Profile</h3>

                        </div>
                    </v-card-title>

                    <v-card-text style="max-width: 350px">
                        <v-text-field
                                v-model="custEmail"
                                v-validate="'required|email'"
                                :error-messages="errors.collect('email')"
                                :disabled="custLoading"
                                data-vv-name="email"
                                label="E-mail"
                                color="black"
                                required
                                box
                                clearable
                                prepend-inner-icon="account_box"
                                v-on:keyup.enter="loginNow"
                                autofocus
                        ></v-text-field>
                        <v-text-field
                                v-model="custPassword"
                                v-validate="'required'"
                                :error-messages="errors.collect('password')"
                                :disabled="custLoading"
                                label="Password"
                                data-vv-name="password"
                                :append-icon="custshowPassword ? 'visibility' : 'visibility_off'"
                                :type="custshowPassword ? 'text' : 'password'"
                                box
                                color="black"
                                clearable
                                @click:append="[custshowPassword = !custshowPassword]"
                                prepend-inner-icon="lock"
                                v-on:keyup.enter="loginNow"
                                autofocus
                        ></v-text-field>

                        <h4><a style="color: black" @click.stop="signupDialog = true">Don't Have Account? Create One Now!</a></h4>
                    </v-card-text>
                    <v-alert
                            :value="custAlert"
                            type="error"
                            color="red"
                            transition="scale-transition"
                            class="custom-alert"
                    >
                        {{ errMsg }}
                    </v-alert>
                    <v-card-actions style="justify-content: center">

                        <v-btn
                                v-if="btnCustShow"
                               :loading="custLoading"
                               :disabled="custLoading"
                               color="black"
                               class="white--text"
                               @click="loginNow"

                        >login</v-btn>
                    </v-card-actions>
                </v-card>

            </v-layout>
        </v-flex>
<!--///////////////////////start of signup modal-->

        <v-dialog
                persistent
                v-model="signupDialog"
                max-width="700px"
        >

            <v-stepper v-model="creatingStepper"  >
                <v-btn icon v-if="creatingStepper <= 1" @click="cancelCreatingDialog" style="margin-left: 88%; padding: 1%;"><v-icon  >close</v-icon></v-btn>
                <v-stepper-header>
                    <v-stepper-step color="black" :complete="creatingStepper > 1" step="1">Account Info</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step color="black" :complete="creatingStepper > 2" step="2">Profile Info</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step color="black" :complete="creatingStepper > 3" step="3">Points Code <small>(Optional)</small></v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step color="black" step="4">Account Created</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
<!--                    step one for account info-->

                    <v-stepper-content step="1" >

                        <v-card
                               elevation="0"
                                height="auto"
                        >

                            <v-text-field
                                    v-model="createEmail"
                                    v-validate="'required|email'"
                                    :error-messages="errors.collect('Email')"
                                    label="E-mail*"
                                    data-vv-name="Email"
                                    color="black"
                                    required
                                    autofocus
                            ></v-text-field>


                            <v-text-field
                                    v-model="createPassword"
                                    v-validate="{required:true,regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'}"
                                    :error-messages="errors.collect('create Password')"
                                    placeholder="ex: Ex@pass0rd20"
                                    hint="Password must be at least 8 characters & contain (uppercase, lowercase, numbers and symbols)"
                                    data-vv-name="create Password"
                                    ref="createPassword"
                                    color="black"
                                    label="Create Password*"
                                    counter="true"
                                    :append-icon="createShowPass ? 'visibility' : 'visibility_off'"
                                    :type="createShowPass ? 'text' : 'password'"
                                    @click:append="[createShowPass = !createShowPass, createShowRePass = !createShowRePass]"
                            ></v-text-field>

                            <v-text-field
                                    v-model="createRePassword"
                                    v-validate="'required:true|confirmed:createPassword'"
                                    :error-messages="errors.collect('Re-Enter Password')"
                                    data-vv-name="Re-Enter Password"
                                    color="black"
                                    label="Re-Enter Password*"
                                    :type="createShowRePass ? 'text' : 'password'"
                            ></v-text-field>
                            <h6 style="color: red;">*required</h6>
                            <v-alert
                                    :value="signupAlert"
                                    type="error"
                                    color="red"
                                    transition="scale-transition"
                            >
                                {{ signupErrorMsg }}
                            </v-alert>

                        </v-card>
                        <v-card-actions style="justify-content: flex-end">
                        <v-btn
                                :loading="signupLoading"
                                :disabled="signupLoading"
                                color="black"
                                class="white--text"
                                @click="getAccountInfo"
                        >
                            Continue
                        </v-btn>

                        </v-card-actions>

                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                                elevation="0"
                                height="auto"
                        >
                            <v-text-field
                                    v-model="createFirstName"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('First Name')"
                                    label="First Name*"
                                    hint="This name will also used in you're promo code"
                                    data-vv-name="First Name"
                                    color="black"
                                    required
                                    autofocus
                            ></v-text-field>
                            <v-text-field
                                    v-model="createLastName"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('Last Name')"
                                    label="Last Name*"
                                    data-vv-name="Last Name"
                                    color="black"
                                    required
                            ></v-text-field>
                            <v-combobox
                                    v-model="createGender"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('Gender')"
                                    :items="genderSelect"
                                    label="Gender*"
                                    data-vv-name="Gender"
                                    required
                                    color="black"
                            ></v-combobox>
                            <v-combobox
                                    v-model="maritalStatus"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('Marital Status')"
                                    :items="maritalSelect"
                                    label="Marital Status*"
                                    data-vv-name="Marital Status"
                                    required
                                    color="black"
                            ></v-combobox>
                            <v-text-field
                                    style="    margin-top: 15px;"
                                    v-model="createPhone"
                                    v-validate="'required:true|digits:11'"
                                    :error-messages="errors.collect('Phone')"
                                    label="Mobile Number*"
                                    data-vv-name="Phone"
                                    color="black"
                                    required
                                    mask="###-###-###-##"
                                    prefix="(+2)-"
                            ></v-text-field>
                            <h6 style="color: red;">*required</h6>
                            <v-alert
                                    :value="profileAlert"
                                    type="error"
                                    color="red"
                                    transition="scale-transition"
                            >
                                {{ profileErrorMsg }}
                            </v-alert>
                        </v-card>
                        <v-card-actions style="    justify-content: flex-end;">
<!--                            <v-btn icon>-->
<!--                                <v-icon-->
<!--                                @click="creatingStepper = 1"-->
<!--                                >navigate_before</v-icon>-->
<!--                            </v-btn>-->
                        <v-btn
                                :loading="profileLoading"
                                :disabled="profileLoading"
                                color="black"
                                class="white--text"
                                @click="getUserInfo"
                        >
                            Continue
                        </v-btn>
                        </v-card-actions>

                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-layout row wrap style="    justify-content: center;" v-if="promoCodeRedeemed">
                        <v-card

                                style="text-align: center"
                                elevation="0"
                                height="auto"
                                width="300px"
                        >
                            <h3>Use Promo Code To get Your First Points</h3>

                            <v-text-field
                                    v-model="createPromoCode"
                                    v-validate="'required:true|max:10'"
                                    :error-messages="errors.collect('Promo Code')"
                                    data-vv-name="Promo Code"
                                    color="black"
                                    label="Promo Code"
                                    single-line
                                    outline
                                    clearable
                                    style="text-align: center"
                                    autofocus
                            ></v-text-field>
                            <v-btn
                                    :loading="promoLoading"
                                    :disabled="promoLoading"
                                    @click="startRedeem"
                            >
                                Redeem

                            </v-btn>
                            <v-alert
                                    :value="promoAlert"
                                    type="error"
                                    color="red"
                                    transition="scale-transition"
                                    outline
                            >
                                {{ promoMsg }}
                            </v-alert>

                            <h5 style="margin-top: 20px">You Can Skip This Step</h5>
                        </v-card>

                        </v-layout>

                        <v-layout row wrap style="    justify-content: center;" v-if="promoCodeSuccess" transition="scale-transition" origin="center center">
                            <v-card
                                    elevation="0"
                                    height="300px"
                            >
                                <v-responsive style="height: 300px">
                                    <v-card-text style="font-size: larger; font-weight: bold;">

                                        <img style=" max-width: 237px; max-height: 183px;" align="center" src="../../assets/undraw_happy_birthday_s72n.svg">
                                        <h2>{{ promoMsg }}</h2>
                                    </v-card-text>

                                </v-responsive>

                            </v-card>
                        </v-layout>
                        <v-card-actions style="    justify-content: flex-end;">
<!--                            <v-btn icon>-->
<!--                                <v-icon-->
<!--                                        @click="creatingStepper = 2"-->
<!--                                >navigate_before</v-icon>-->
<!--                            </v-btn>-->

                            <v-btn

                                    color="black"
                                    class="white--text"
                                    @click="creatingStepper = 4"
                            >
                                Continue
                            </v-btn>

                        </v-card-actions>



                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card
                                elevation="0"
                                height="auto"
                        >
                            <v-responsive style="height: 100%">
                                <v-card-text style="font-size: larger; font-weight: bold;">
                                    Account Created Successfully
                                    <img style=" max-width: 237px; max-height: 183px;" align="center" src="../../assets/undraw_done_a34v.svg">
                                </v-card-text>

                            </v-responsive>

                        </v-card>

                        <v-card-actions style="justify-content: center">
                        <v-btn
                                color="black"
                                class="white--text"
                                @click="startFinalLogin()"
                        >
                            Login Now
                        </v-btn>
                        </v-card-actions>
                    
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <annoying-no-internet></annoying-no-internet>

    </v-container>
    </v-app>
</template>
<script>

    import SimpleCrypto from "simple-crypto-js";
    import checkConnectionMixin from "../mixins/checkConnectionMixin";
    import annoyingNoInternet from  "../../views/annoyingNoInternet"
    export default {
        name: 'customerlogin',
        $_veeValidate: {
            validator: 'new',

        },
        mixins: [ checkConnectionMixin],
        components: {annoyingNoInternet},
        data: () => {
            return{
                creatingStepper: 0,
                createEmail:"",
                createPassword: "",
                createRePassword:"",
                createShowPass: false,
                createShowRePass:false,
                signupAlert: false,
                signupErrorMsg: "",
                signupLoading: false,

                createFirstName:"",
                createLastName:"",
                genderSelect: ["Male", "Female"],
                createGender: "",
                maritalStatus: "",
                maritalSelect: ["Single", "Engaged", "Married"],
                createPhone: "",
                profileLoading: false,
                profileAlert: false,
                profileErrorMsg: "",

                createPromoCode: "",
                promoCodeRedeemed: true,
                promoCodeSuccess: false,
                promoLoading: false,
                promoAlert: false,
                promoMsg: "",


                signupDialog:false,
                custEmail: '',
                custPassword: '',
                custshowPassword: false,
                custLoading: false,
                custAlert: false,
                btnCustShow: true,
                errMsg: ""


            }
        },
        computed:{
            userLoginWatcher(){
                return this.$store.getters.userStatus;
            },
            firebaseLoginErrorShow(){
                return this.$store.getters.firebaseError;
            },
            signupError(){
                return this.$store.getters.getSignupError;
            },
            writingProfileError(){
                return this.$store.getters.getProfileError;
            },
            readPromoCode(){
                return this.$store.getters.getPromoCodeMsg;
            },
            getPromoSuccess(){
                return this.$store.getters.getPromoSuccess;
            }
        },
        watch:{
            userLoginWatcher(watcher){
                console.log(watcher);
                if(watcher !== null){
                    if(this.signupDialog === false){
                        this.$router.replace('/home');
                    }

                }
            },
            firebaseLoginErrorShow(error){
                if(error !== null && error !== undefined) {

                    this.errMsg = error;
                    this.custAlert = true;
                    this.custLoading = false;

                }
                if(error === "You have Attempted to login many times, Try again later!"){
                    this.errMsg = error;
                    this.custAlert = true;
                    this.btnCustShow = false;

                }
            },
            signupError(error){

                    if(error !== null){
                        this.creatingStepper =1 ;
                        this.signupLoading= false;
                        this.signupErrorMsg= error;
                        this.signupAlert= true;
                    }else if(error === null){
                        this.creatingStepper = 2;
                        this.signupAlert= false;
                        this.signupErrorMsg= "";
                        this.signupLoading= false;
                    }

            },
            writingProfileError(error){
                if(error !== null){
                    this.creatingStepper = 2;
                    this.profileLoading= false;
                    this.profileErrorMsg= error;
                    this.profileAlert= true;
                }else if(error === null){
                    this.creatingStepper = 3;
                    this.profileAlert= false;
                    this.profileErrorMsg= "";
                    this.profileLoading= false;
                }
            },
            readPromoCode(msg){
                if(msg !== null){
                    this.promoMsg = msg;
                    this.promoLoading = false;
                    this.promoAlert = true;
                }
            },
            getPromoSuccess(flag){
                if(flag === true){
                    this.promoCodeSuccess = true;
                    this.promoCodeRedeemed = false;
                }
            }

        },
        methods:{
            cancelCreatingDialog(){
                this.$validator.reset();
                this.signupDialog = false;
                this.creatingStepper = 1;
            },

            getAccountInfo(){


                this.signupAlert= false;
                this.signupErrorMsg= "";

                const results = Promise.all([
                    this.$validator.validate('Email'),
                    this.$validator.validate('create Password'),
                    this.$validator.validate('Re-Enter Password')
                ]);

                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.signupLoading= true;
                        this.$store.dispatch('signupUser', {email: this.createEmail, password: this.createRePassword});
                        this.creatingStepper = 2;
                        this.signupLoading =  false;

                    }
                });
            },
            getUserInfo(){

                this.profileAlert= false;
                this.profileErrorMsg= "";

                const results = Promise.all([
                    this.$validator.validate('First Name'),
                    this.$validator.validate('Last Name'),
                    this.$validator.validate('Gender'),
                    this.$validator.validate('Phone'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.profileLoading= true;
                        this.$store.dispatch('setupUserProfile', {
                            userFirstName: this.createFirstName,
                            userLastName: this.createLastName,
                            userEmail: this.createEmail,
                            userGender: this.createGender,
                            userPhone: this.createPhone,
                            userMaritalStatus: this.maritalStatus
                        });

                    }
                });
            },

            startRedeem(){

                this.promoMsg = "";

                this.promoAlert = false;
                const results = Promise.all([
                    this.$validator.validate('Promo Code'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.promoLoading = true;
                        this.$store.dispatch('redeemPromoCode', {promoId: this.createPromoCode});
                    }
                });

            },
            loginNow(){
                const results = Promise.all([
                    this.$validator.validate('email'),
                    this.$validator.validate('password'),

                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.errMsg = "";
                        this.custAlert = false;
                        this.custLoading = true;
                        this.$store.dispatch('loginUser', {email: this.custEmail, password: this.custPassword});
                        console.log("starting login")

                    }
                });

            },
            startFinalLogin(){
                 this.custEmail = this.createEmail;
                 this.custPassword = this.createRePassword;
                this.signupDialog = false;
                this.loginNow();
                this.$router.replace('/');

            }
        },
        beforeCreate(){
            let localSession = localStorage.getItem('appData');
            let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
            let simpleCrypto = new SimpleCrypto(_secretKey);
            let decipherUser = simpleCrypto.decrypt(localSession);

                if(decipherUser !== "No-Didit"){
                    this.$router.replace('/');
                }
            this.$store.dispatch('checkConnetion');
        }
    }
</script>

<style>
    .custom-alert i{
        margin-right: 0;
    }
</style>
