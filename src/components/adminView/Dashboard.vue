<template>

    <!--content of dashboard-->
    <v-container
            fluid grid-list-md
            style="padding: 0 0 50px 10px; margin: 0"
    >


        <page-path></page-path>
        <v-layout row wrap justify-space-between child-flex >
            <v-flex d-flex xs12 sm4 md3 justify-center style="justify-content: space-around;">
                <v-card  elevation="3" max-width="300" min-width="284" class="round-card " style="border-right: .25rem solid #00ff16 !important;">

                    <v-card-text>
                        <div class="led-box">
                            <v-layout row wrap justify-space-between style="justify-content: center">

                                <div class="headline " style=" margin-right: 10px;">Online Customers </div>
                                <div class="led-yellow-stoped" v-if="numOfUsersOnlineNow <= 0"><h3 style="color: white">{{numOfUsersOnlineNow}}</h3></div>
                                <div class="led-yellow" v-if="numOfUsersOnlineNow > 0"><h3 style="color: white">{{numOfUsersOnlineNow}}</h3></div>

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
                                <small v-if="card.data2"> new</small>
                                <animated-number

                                    :value="card.data"
                                    :round="1"
                                    :duration="900"
                                    style="font-size: xx-large;"
                            />
                               <span v-if="card.data2"> - </span>
                                <animated-number
                                        v-if="card.data2"
                                        :value="card.data2"
                                        :round="1"
                                        :duration="900"
                                        style="font-size: xx-large;"
                                />
                                <small v-if="card.data2">old </small>
                            </v-card-text>

                            <v-divider class="mx-3" style="margin-bottom: 5px"></v-divider>
                            <v-btn   :to="card.link" dark> {{ card.text }} </v-btn>
                        </v-card>
                    </v-flex>


        </v-layout>
<!--        <v-divider class="mx-2 ma-3"></v-divider>-->
<!--        <v-layout row wrap>-->
<!--            <v-card-->

<!--                   width="500"-->
<!--            >-->
<!--                <v-card-text class="headline">-->
<!--                    Reservations-->
<!--                </v-card-text>-->
<!--                <v-sheet-->
<!--                        class="v-sheet&#45;&#45;offset mx-auto"-->
<!--                        color="black"-->
<!--                        elevation="5"-->
<!--                        max-width="calc(100% - 32px)"-->

<!--                >-->
<!--                    <v-sparkline-->
<!--                            :labels="labels"-->
<!--                            :value="graph"-->
<!--                            color="white"-->
<!--                            line-width="2"-->
<!--                            padding="16"-->
<!--                            :show-labels="true"-->
<!--                            auto-draw-->
<!--                            label-size="50"-->
<!--                            :auto-draw-duration="5000"-->
<!--                    ></v-sparkline>-->
<!--                </v-sheet>-->
<!--            </v-card>-->
<!--        </v-layout>-->
    </v-container>
</template>

<script>

    export default {
        name: 'dashboard',
        components: {
            Navbar: () => import("./Navbar"),
            createSpeedDial: () => import("./CreateSpeedDial"),
            AnimatedNumber: () => import("animated-number-vue"),
            pagePath: () => import("./pagePath")
        },
        data:function () {
            return {
                cards: [
                    {title: "Customers", icon: "people", link: "/admin/customers", data: 0, text: "view", id: "customer-card"},
                    {title: "Offers", icon: "loyalty", link: "/admin/offers", data: 0, text: "Edit", id: "offer-card"},
                    {title: "Reservations", icon: "forum", link: "/admin/reservations", data: 0, text: "manage", id: "order-card"},
                    {title: "Points Plan", icon: "import_export", link: "/admin/pointsplan", data: 0, data2: 0, text: "change", id: "point-card"}
                ],
                value: 0,
                numOfUsersOnlineNow: this.$store.getters.getNumberOfusersOnline,
                labels: [
                    '12am',
                    '3am',
                    '6am',
                    '9am',
                    '12pm',
                    '3pm',
                ],
                graph: [
                    10,
                    20,
                    90,
                    2,
                    5,
                    18
                ]
            }
        },
        created() {
            this.$store.dispatch("listenToOnlineUsers");
            this.$store.dispatch("listenNumberOfOffers");
            this.$store.dispatch("readNumOfCustomers");
            this.$store.dispatch('readMaxPointsLevel');
        },
        computed: {
            getNumOfCustomers(){
                return this.$store.getters.getNumOfCustomers;
            },
            getNumOfOffers(){
                return this.$store.getters.getNumOfOffers;
            },
            getMaxPointsLevel(){
                return this.$store.getters.getMaxPointsLevel;
            },
            getOnlineUsersNo(){
                return this.$store.getters.getNumberOfusersOnline;
            },
        },

        watch: {
            getNumOfCustomers(num){
                if(num !== null){
                   this.cards[0].data = num;
                }
            },
            getNumOfOffers(num){
                if(num !== null){
                    this.cards[1].data = num;
                }
            },
            getMaxPointsLevel(max){
                if(max !== null){
                    this.cards[3].data = max.maxNewToAdd;
                    this.cards[3].data2 = max.maxOwnerToAdd;
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
    border-bottom: .25rem solid #00ff0c !important;
}
#offer-card{
    border-bottom: .25rem solid #ff3834 !important;
}
#order-card{
    border-bottom: .25rem solid #f874ff !important;
}
#point-card{
    border-bottom: .25rem solid #5884ff !important;
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
    50% { background-color: #00aa2c; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #00800c 0 -1px 9px, #00ff13 0 0px 0; }
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