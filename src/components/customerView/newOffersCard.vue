<template>
    <v-card
            :tile="true"
            :elevation="10"
            width="100%"
            height="480px"
            id="rounded-card"

    >

        <v-card-title
                primary-title
                id="orders-title"
        >
            <div style="padding-top: 15px">
                <v-responsive avatar>
                    <v-avatar color="black">
                        <v-icon size="40px" color="white">loyalty</v-icon>
                    </v-avatar>
                </v-responsive>
                <h3>Latest Offers</h3>


                <!--            <v-divider class="profile-divider"></v-divider>-->
            </div>
<!--            <v-switch-->
<!--                    v-model="cycleSlider"-->
<!--                    label="Auto Slide"-->
<!--                    color="black"-->
<!--                    style="    justify-content: flex-end;"-->
<!--            ></v-switch>-->
        </v-card-title>


        <!--some of user data show here-->


            <loading-data-progress v-if="dataLoading"/>


        <v-fade-transition >
            <v-carousel     v-if="items.length !== 0" :cycle="cycleFlag" :interval="4000"  hide-controls v-show="dataLoaded" :height="345" :max="300" vertical reverse style=" box-shadow: none; border-radius: 0;" >
                <v-carousel-item

                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.offerPic"
                        :lazy-src="item.offerPic"
                        @mouseover="cycleFlag = false"
                        @mouseout="cycleFlag = true"
                >
                    <div class="scroll-y" style=" background: linear-gradient(120deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 65%); position: absolute;    height: 100%; padding-bottom: 50px">

                        <div style="text-align: left; margin-top: 5px; ">
                        <h1 class="offer-title">{{ item.offerTitle }}</h1>

                        <div  class="offer-rules">
                            <v-layout column wrap style="padding-bottom: 10px; min-width: 230px;">
                            <h3 class="offer-content">{{ item.offerContent }}</h3>


<!--                                <v-divider-->
<!--                                        class="mx-2"-->
<!--                                        inset-->
<!--                                       -->
<!--                                ></v-divider>-->
                            <div>
                                <v-divider style="margin-top: 5px"></v-divider>
                                <h3>Occasion Type {{item.occasionName}}* <v-icon size="15px" color="white" style="margin-top: 5px">party_mode</v-icon></h3>
                            <h3 v-if="item.offerExpNum != null" >Offer End By First {{item.offerExpNum}} <v-icon size="15px" color="white">directions_run</v-icon></h3>
                            <h3 v-if="item.offerExpDate != null">Offer End {{item.offerExpDate}} <v-icon size="15px" color="white">av_timer</v-icon></h3>
                                <h3>Points -{{item.offerPoints}} <v-icon size="15px" color="white" style="margin-top: 5px">stars</v-icon></h3>
                            <v-btn
                                    class="order-btn"
                                    depressed
                                    small
                                    outline
                                    v-if="userPoints >= item.offerPoints"
                                    @click.stop="openReservDialog(item.offerId,item.occasionName, item.occasionPrice, item.offerPoints)"
                            >
                                Order Now
                            </v-btn>
                                <h3 v-if="userPoints < item.offerPoints">Earn more points to order!</h3>
                            </div>
                            </v-layout>
                        </div>
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
            <v-card-text style="height: 75%" v-if="items.length === 0 && dataLoaded">

                <v-flex style="margin-top: 10%;">
                    <v-card-title  class="headline align-center" >
                        <v-layout column wrap>
                            <div>
                        <img src="../../../public/favicon-logo.png">
                            </div>
                        <h3>No Offers Now, Stay Tuned!</h3>
                        </v-layout>
                    </v-card-title>
                </v-flex>
            </v-card-text>
        </v-fade-transition>
        <div style="text-align: center"><h5>*Offer applies <b>only</b> on the occasion type in the offer</h5></div>
        <reservation-dialog :reservOfferId="id" :createResvDialog="openReservNow" :occasionNameSelected="occasionName" :offerPoints="offerPoints" :occasionPrice="occasionPrice" @closeNow="resetOccasionName" ></reservation-dialog>
    </v-card>


</template>
<script>
    import loadingDataProgress from './loadingDataProgress.vue'
    import reservationDialog from "./reservationDialog";
    import moment from 'moment';
    export default {
        name: 'newofferscard',
        components: {
            loadingDataProgress,
            reservationDialog
        },
        data: () => {
            return{
                dataLoading: true,
                dataLoaded: false,
                openReservNow: false,
                cycleFlag: true,
                occasionName: '',
                occasionPrice: '',
                offerPoints: '',
                items:'',
                noOffers: false,
                id: null,
                userPoints: '',
            }
        },
        mounted() {
            this.$store.dispatch('getAllOffersDatabase');
        },
        computed:{
            getAllOffers(){
                return this.$store.getters.getAllOffersGetter;
            },
            getUserPoints(){
                return this.$store.getters.getProfileInfoDb;
            },
        },
        watch:{
            getAllOffers(offers) {
                this.items = '';
                let offersData = [];
                console.log(offers);
                if (offers.length !== 0) {
                    offers.forEach(function (i) {
                        if(i.offerStatus === "opened" ) {
                            if(i.offerExpDate !== null ) {
                                if(moment() <= moment(i.offerExpDateLocalString)) {
                                    offersData.push({
                                        offerTitle: i.offerTitle,
                                        offerContent: i.offerContent,
                                        offerExpDate: i.offerExpDate,
                                        offerExpNum: null,
                                        offerPoints: i.offerPoints,
                                        offerPic: i.offerPic,
                                        offerId: i.idOfOffer,
                                        occasionName: i.occasionType.occasionName,
                                        occasionPrice: i.occasionType.occasionPrice,
                                    });
                                }
                            }else {
                                offersData.push({
                                    offerTitle: i.offerTitle,
                                    offerContent: i.offerContent,
                                    offerExpDate: null,
                                    offerExpNum: i.offerExpNum,
                                    offerPoints: i.offerPoints,
                                    offerPic: i.offerPic,
                                    offerId: i.idOfOffer,
                                    occasionName: i.occasionType.occasionName,
                                    occasionPrice: i.occasionType.occasionPrice,
                                });
                            }
                        }
                    });
                    this.items = offersData;
                    console.log(this.items);
                    ///starting remove progress and show data
                    this.dataLoading = false;
                    this.dataLoaded = true;

                }
                // else{
                //     this.dataLoading = false;
                //     this.dataLoaded = true;
                //     this.noOffers = true;
                // }
            },
            getUserPoints(points) {
                console.log(points)
                if (points) {
                    this.userPoints = points.userPoints;
                }
            },
        },

        methods:{
            openReservDialog(id,name, price, points){
                this.openReservNow = true;
                this.occasionName = name;
                this.occasionPrice = price;
                this.offerPoints = points;
                this.id = id;

            },
            resetOccasionName(){
                this.openReservNow = false;
            }
        }
    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }
    .avatar{

    }
    #orders-title{
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-add-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }
    .offer-content{
        text-align: left;
        color: white;
        /*background-color: white;*/
        max-width: 100%;
        /*font-size: 1vw;*/
        margin: 10px 0px 0px 0px;
    }
    .offer-title{
        /*font-size: 3.5vw;*/
        color: white;

        /*mix-blend-mode: lighten;*/
        /*background-color: white;*/
        border-radius: 0px 100px 0px 0px;
        padding-left: 20px;
        margin: 0px 0px 0px 0px;
        max-width: 94%;

    }
    .offer-rules{
        -webkit-box-pack: left;
        -ms-flex-pack: left;
        justify-content: left;
        /*background-color: white;*/
        color: white;
        border-radius: 0px 0px 100px 0px;
        padding-left: 20px;
        max-width: 40%;
    }
    .order-btn{
        margin: 5px 0px 10px;
    }
    .adv-show{
        clip-path: polygon(0 0, 90% 0, 33% 100%, 0 100%);
        background-color: white; height: 100%;
        filter: opacity(0.5);
    }

</style>