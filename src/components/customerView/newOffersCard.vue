<template>
    <v-card
            :tile="true"
            :elevation="10"
            max-width="100%"
            min-width="250px"
            height="460px"
            id="rounded-card"

    >

        <v-card-title
                primary-title
                id="orders-title"
        >
            <div>
                <v-icon size="50px" color="black">loyalty</v-icon>
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


            <v-layout row justify-center align-center v-show="dataLoading" style="min-height: 263px" transition="scale-transition">
                <v-progress-circular
                        indeterminate
                        color="black"
                ></v-progress-circular>
            </v-layout>


        <v-scroll-y-transition >
            <v-carousel :cycle="cycleFlag" :interval="4000"  hide-controls v-show="dataLoaded" :height="345" vertical reverse style=" box-shadow: none; border-radius: 0;" >
                <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.offerPic"
                        :lazy-src="item.offerPic"
                        @click.stop="offerSelected(item.idOfOffer)"
                        style="cursor: pointer;  "
                        v-ripple
                        @mouseover="cycleFlag = false"
                        @mouseout="cycleFlag = true"

                >
                    <div class="scroll-y" style="background-image: linear-gradient(120deg, black, transparent);     height: -webkit-fill-available;">

                        <div style="text-align: left; margin-top: 5px">
                        <h1 class="offer-title">{{ item.offerTitle }}</h1>

                        <div  class="offer-rules">
                            <v-layout column wrap style="padding-bottom: 10px; min-width: 210px;">
                            <h3 class="offer-content">{{ item.offerContent }}</h3>


<!--                                <v-divider-->
<!--                                        class="mx-2"-->
<!--                                        inset-->
<!--                                       -->
<!--                                ></v-divider>-->
                            <div>
                                <v-divider style="margin-top: 5px"></v-divider>
                            <h3>Will get: {{item.offerPoints}} <v-icon size="20px" color="white" style="margin-top: 5px">stars</v-icon></h3>
                            <h3 v-if="item.offerExpNum != null" >Expired By First: {{item.offerExpNum}} <v-icon size="20px" color="white">directions_run</v-icon></h3>
                            <h3 v-if="item.offerExpDate != null">Expired On: {{item.offerExpDate}} <v-icon size="20px" color="white">av_timer</v-icon></h3>
                            <v-btn class="order-btn" depressed small outline >Order Now</v-btn>
                            </div>
                            </v-layout>
                        </div>
                        </div>
                    </div>

                </v-carousel-item>
            </v-carousel>
        </v-scroll-y-transition>
    </v-card>
</template>
<script>

    export default {
        name: 'newofferscard',
        components: {},
        data: () => {
            return{
                dataLoading: true,
                dataLoaded: false,
                cycleFlag: true,

                items:'',
            }
        },
        mounted() {
            this.$store.dispatch('getAllOffersDatabase');
        },
        computed:{
            getAllOffers(){
                return this.$store.getters.getAllOffersGetter;
            }
        },
        watch:{
            getAllOffers(offers) {
                this.items = '';
                let offersData = [];
                if (offers !== null || offers !== undefined) {
                    offers.forEach(function (i) {
                        if(i.offerStatus === "opened") {
                            offersData.push(i);
                        }
                    });
                    this.items = offersData;
                    ///starting remove progress and show data
                    this.dataLoading = false;
                    this.dataLoaded = true;

                }
            }
        },

        methods:{
            offerSelected(thisOfferId){
                console.log("offer selected", thisOfferId);
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