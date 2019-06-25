<template>

    <!--content of dashboard-->
    <v-container
            fluid grid-list-md
            style="
            padding-top: 70px;
            padding-bottom: 50px;
            height: auto;"
    >

<navbar></navbar>

<!--        <div style="text-align: start;  margin-left: 15px; ">-->
<!--            <h2 class="headline" style="text-transform: capitalize;">-->
<!--                {{$route.path.substr(1, $route.path.length)}}-->
<!--                <v-divider dark class="mx-2 ma-1"></v-divider>-->
<!--            </h2>-->
<!--        </div>-->
        <page-path></page-path>

        <v-layout row wrap justify-space-between child-flex >
            <v-flex d-flex xs12 sm4 md3 justify-center style="justify-content: space-around;">
                <v-card  elevation="3" max-width="300" class="round-card " style="border-right: .25rem solid #00800c !important;">

                    <v-card-text>
                        <div class="led-box">
                            <v-layout row wrap justify-space-between style="justify-content: center">



                                <div class="led-yellow-stoped" v-if="numOfUsersOnlineNow <= 0"></div>
                                <div class="led-yellow" v-if="numOfUsersOnlineNow > 0"></div>
                                <div class="headline " style=" margin-right: 15px;">Online Customers {{numOfUsersOnlineNow}}</div>




                            </v-layout>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-divider class="mx-2 ma-3"></v-divider>
        <v-layout row wrap justify-space-between child-flex>


                    <v-flex d-flex xs12 sm4 md3   v-for="(card, i) in cards" :key="i"  justify-center>
                        <v-card  elevation="3" max-width="250" class="round-card" v-bind:id="card.id">
                            <v-card-text>
                                <v-icon color="black" x-large>{{card.icon }}</v-icon>
                                <div class="headline">{{card.title}}</div>

                            </v-card-text>
                            <v-card-text class="headline font-weight-bold">
                                <animated-number
                                    :value="card.data"
                                    :round="1"
                                    :duration="900"
                                    style="font-size: -webkit-xxx-large;"
                            />
                            </v-card-text>
                            <v-divider class="mx-3" style="margin-bottom: 5px"></v-divider>
                            <v-btn   :to="card.link" dark> {{ card.text }} </v-btn>
                        </v-card>
                    </v-flex>


        </v-layout>

    </v-container>
</template>

<script>
    import Navbar from "./Navbar";
    import createSpeedDial from "./CreateSpeedDial";
    import AnimatedNumber from "animated-number-vue";
    import pagePath from "./pagePath";

    export default {
        name: 'dashboard',
        components: {Navbar, createSpeedDial, AnimatedNumber, pagePath},
        data:function () {
            return {
                cards: [
                    {title: "Customers", icon: "people", link: "dashboard/customers", data: 0, text: "view all", id: "customer-card"},
                    {title: "Offers", icon: "loyalty", link: "dashboard/offers", data: this.$store.getters.getNumOfOffers, text: "Edit", id: "offer-card"},
                    {title: "Reservations", icon: "forum", link: "dashboard/reservations", data: 0, text: "manage", id: "order-card"},
                    {title: "Points Plan", icon: "import_export", link: "dashboard/pointsplan", data: 0, text: "change", id: "point-card"}
                ],
                value: 0,
                numOfUsersOnlineNow: this.$store.getters.getNumberOfusersOnline,
            }
        },
        created() {
            this.$store.dispatch("listenToOnlineUsers");
            this.$store.dispatch("listenNumberOfOffers");
        },
        computed: {

            getAllOffers(){

                return this.$store.getters.getNumOfOffers;
            },
            getOnlineUsersNo(){
                return this.$store.getters.getNumberOfusersOnline;
            }
        },

        watch: {
            getAllOffers(offersCount){
                if(offersCount !== 0){
                   let objIndex = this.cards.findIndex((obj => obj.title === "Offers"));
                    this.cards[objIndex].data = offersCount;

                }
            },
            getOnlineUsersNo(no){
                if(no !== null){
                    this.numOfUsersOnlineNow = no;

                }
            }

        },
        methods:{

        }
    }
</script>
<style>
.round-card{
    border-radius: 20px; 
}

#customer-card{
    border-bottom: .25rem solid #00800c !important;
}
#offer-card{
    border-bottom: .25rem solid #df322e !important;
}
#order-card{
    border-bottom: .25rem solid #7c3a80 !important;
}
#point-card{
    border-bottom: .25rem solid #4e73df!important;
}



.led-box {

    /*margin-left: 45%;*/
    /*float: left;*/
}
.led-yellow {
    margin: 3px !important;
    width: 25px;
    height: 25px;
    background-color: #09ff00;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #00800c 0 -1px 9px, #00ff13 0 2px 12px;
    -webkit-animation: blinkYellow 1s infinite;
    animation: blinkYellow 1s infinite;
}


@keyframes blinkYellow {
    from { background-color: #09ff00; }
    50% { background-color: #00aa2c; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #00800c 0 -1px 9px, #00ff13 0 2px 0; }
    to { background-color: #00ff1f; }
}

    .led-yellow-stoped{
        margin: 3px !important;
        width: 25px;
        height: 25px;
        background-color: #00800c;
        border-radius: 50%;

    }

</style>