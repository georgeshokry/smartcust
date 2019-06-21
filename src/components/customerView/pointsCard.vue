<template>
    <v-card
            :tile="true"
            :elevation="10"
            min-width="250px"
            id="rounded-card"

    >
        <v-layout row justify-center align-center v-if="dataLoading" style="min-height: 263px" transition="scale-transition">
            <v-progress-circular
                    indeterminate
                    color="black"
            ></v-progress-circular>
        </v-layout>


        <div v-if="dataLoaded" >
<!--        starting of points card-->
        <v-card-title
                primary-title
                id="points-title"
        >
            <div>
                <v-icon size="50px" color="black">stars</v-icon>
                <h3>Points</h3>

            </div>
        </v-card-title>

        <v-content class="points">
            <div>


                <v-badge right  color="white" style="margin-top: 10px;" >

                    <template  v-slot:badge >
                        <span style="color: black"><v-btn icon size="5px" color="white" @click="pointsRules= true"><v-icon size="20px" style="font-weight:bold;">help_outline</v-icon></v-btn></span>
                    </template>
                    <span style="font-family: cursive;">
                        <animated-number
                                :value="userPoints"
                                :round="1"
                                :duration="3000"
                                style="font-size: -webkit-xxx-large;"
                        />
                    </span>
                </v-badge>

                <v-card-text style="font-size: medium;padding: 0px;">Smart Code: {{ userCode }}</v-card-text>
            </div>
            <v-divider style="margin-left: 15px; margin-right: 15px"></v-divider>
            <v-card-actions style="justify-content: center;  padding-top: 20px;">
                <v-btn
                        outline
                        dark
                        color="black"
                        flat
                        @click="promoCodeDialog = true"
                >
                    use promo code
                </v-btn>
            </v-card-actions>
        </v-content>
        </div>

        <v-dialog
                v-model="pointsRules"
                width="400"
                style="z-index: 55"
                scrollable
        >

            <v-card>
                <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >help </v-icon> Points Rules*</span>
                </v-card-title>
                <v-responsive>
                    <v-card-text style="font-size: larger; font-weight: bold;">
                        <img style=" max-width: 237px; max-height: 183px; filter: drop-shadow(1px 1px 2px black);" align="center" src="../../assets/undraw_choice_9385.svg">
                    </v-card-text>
                </v-responsive>
                <v-card-text>
                    *To earn more points share your Smart Code,<br>
                    Every new customer create new account with using your Smart Code
                    you will get <span style="font-weight: bold">({{PointsLevel}})</span> points in return.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions style="align-self: center;">
                    <v-spacer></v-spacer>
                    <v-btn
                            dark
                            color="black"
                            flat
                            @click="pointsRules = false"
                    >
                       got it
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="promoCodeDialog"

                width="400"
        >


            <v-scroll-x-transition name="slide-fade" tag="div" mode="out-in" v-if="promoRedeem">
                <v-card

                        style="text-align: center"
                        elevation="0"
                        height="auto"

                >
                    <v-btn icon @click="cancelPromoDialog" style="margin-left: 88%; padding: 1%; background-color: white"><v-icon  >close</v-icon></v-btn>
                    <v-card-title>
                        <v-layout row wrap style="    justify-content: center;">
                        <img style=" max-width: 237px; max-height: 183px;     filter: drop-shadow(1px 1px 2px black);" align="center" src="../../assets/undraw_treasure_of9i.svg">
                            <v-icon size="80px" color="black" style="    filter: drop-shadow(1px 1px 2px black);">stars</v-icon>
                        </v-layout>
                    </v-card-title>

                    <v-card-text style="justify-content: center; max-width: fit-content;margin: auto;" >
                    <v-text-field
                            v-model="PromoCode"
                            v-validate="'required:true|max:10'"
                            :error-messages="errors.collect('Promo Code')"
                            data-vv-name="Promo Code"
                            color="black"
                            label="Promo Code"
                            single-line
                            outline
                            clearable
                            maxlength="10"
                            autofocus
                            style="filter: drop-shadow(1px 1px 2px black);"
                            v-on:keyup.enter="startRedeemCode"
                    ></v-text-field>
                        <v-alert
                                :value="promoCodeAlert"
                                type="error"
                                color="red"
                                transition="scale-transition"
                                outline
                        >
                            {{ promoMsgError }}
                        </v-alert>
                    </v-card-text>
                    <v-btn
                            color="black"
                            class="white--text"
                            :loading="promoCodeLoading"
                            :disabled="promoCodeLoading"
                            @click="startRedeemCode"
                            style="    margin-bottom: 25px;"
                    >
                        Redeem

                    </v-btn>


                </v-card>
            </v-scroll-x-transition>

            <v-scroll-x-transition name="slide-fade" tag="div" mode="out-in" v-if="promoSuccess">
            <v-layout row wrap style="    justify-content: center;"  origin="center center">
                <v-card
                        elevation="0"
                        height="auto"
                        width="400"
                >
                    <v-responsive style="height: 300px" lazy>
                        <v-card-text style="font-size: larger; font-weight: bold;">
                            <v-icon size="30px" color="black" style="    filter: drop-shadow(1px 1px 2px black);">stars</v-icon>
                            <img style=" max-width: 237px; max-height: 183px; filter: drop-shadow(1px 1px 2px black);" align="center" src="../../assets/undraw_happy_birthday_s72n.svg">
                            <v-icon size="30px" color="black" style="    filter: drop-shadow(1px 1px 2px black);">stars</v-icon>
                            <h3 style="margin-top: 30px;">{{ promoMsgError }}</h3>
                        </v-card-text>

                    </v-responsive>

                </v-card>
            </v-layout>
            </v-scroll-x-transition>

        </v-dialog>

    </v-card>
</template>
<script>
    import AnimatedNumber from "animated-number-vue";
    export default {
        name: 'pointscard',
        components: {AnimatedNumber},
        $_veeValidate: {
            validator: 'new',

        },
        data: () => {
            return{
                dataLoading: true,
                dataLoaded: false,
                pointsRules: false,
                PointsLevel: "",

                promoCodeDialog:false,
                promoCodeLoading: false,
                PromoCode:"",
                promoCodeAlert: "",
                promoMsgError: "",

                promoRedeem: true,
                promoSuccess: false,


                userPoints: '',
                userCode: ''

            }
        },
        computed:{
            getUserPoints(){
                return this.$store.getters.getProfileInfoDb;
            },
            getMaxPointsToAdd(){
              return this.$store.getters.getUsersMaxPoints;
            },
            readPromoCode(){
                return this.$store.getters.getPromoCodeMsg;
            },
            getPromoSuccess(){
                return this.$store.getters.getPromoSuccess;
            }
        },
        watch:{
            getUserPoints(points) {

                if (points) {
                    this.userPoints = points.userPoints;
                    this.userCode = points.userCode;


                    ///starting remove progress and show data
                    this.dataLoading = false;
                    this.dataLoaded = true;

                }
            },
            getMaxPointsToAdd(level){
              if(level !== null){
                  this.PointsLevel = level;
              }
            },
            readPromoCode(msg){
                if(msg !== null){
                    this.promoMsgError = msg;
                    this.promoCodeLoading = false;
                    this.promoCodeAlert = true;
                }
            },
            getPromoSuccess(flag){
                if(flag === true){
                    this.promoSuccess = true;
                    this.promoRedeem = false;
                    setTimeout(this.resetPromoCodeDialog, 3000);
                }
            }
        },
        methods: {
            startRedeemCode(){

                this.promoMsgError = "";

                this.promoCodeAlert = false;
                const results = Promise.all([
                    this.$validator.validate('Promo Code'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.promoCodeLoading = true;
                        this.$store.dispatch('redeemPromoCode', {promoId: this.PromoCode});
                    }
                });

            },
            resetPromoCodeDialog(){
                this.promoCodeDialog = false;

                this.promoCodeDialog =false;
                this.$validator.reset();
                this.promoCodeLoading = false;
                this.PromoCode = "";
                this.promoCodeAlert = false;
                this.promoMsgError = "";

                this.promoSuccess = false;
                this.promoRedeem = true;
            },
            cancelPromoDialog(){
                this.promoCodeDialog =false;
                this.$validator.reset();
                this.promoCodeLoading = false;
                this.PromoCode = "";
                this.promoCodeAlert = false;
                this.promoMsgError = "";
            }
        },
        beforeCreate() {
            this.$store.dispatch("getMaxPointsUsersCode");
        }

    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }
    .avatar{

    }
    #points-title{
        padding-top: 45px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }

    .points {
        text-align: center !important;
        padding-bottom: 16px !important;
        font-weight: 600;
        font-size: -webkit-xxx-large;
    }

</style>