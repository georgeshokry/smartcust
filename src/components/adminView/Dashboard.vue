<template>

    <!--content of dashboard-->
    <v-container
            fluid grid-list-md
            style="
            padding-top: 30px;
            padding-bottom: 50px;
            height: auto;"
    >

<navbar></navbar>
        <newOfferDialog></newOfferDialog>

        <v-layout row wrap justify-space-between child-flex>


                    <v-flex d-flex xs12 sm4 md3   v-for="(card, i) in cards" :key="i"  justify-center>
                        <v-card  elevation="10" max-width="250">
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
    import NewOfferDialog from "./newOfferDialog";
    import AnimatedNumber from "animated-number-vue";

    export default {
        name: 'dashboard',
        components: {Navbar, NewOfferDialog, AnimatedNumber},
        data:function () {
            return {
                cards: [
                    {title: "Customers", icon: "people", link: "/customers", data: 0, text: "view all"},
                    {title: "Offers", icon: "loyalty", link: "/offers", data: this.$store.getters.getNumOfOffers, text: "Edit"},
                    {title: "Orders", icon: "forum", link: "/orders", data: 0, text: "manage"},
                    {title: "Points Level", icon: "import_export", link: "/pointslevel", data: 0, text: "change"}
                ],
                value: 0,
            }
        },
        created() {
            this.$store.dispatch("getAllOffersDatabase");
        },
        computed: {

            getAllOffers(){

                return this.$store.getters.getNumOfOffers;
            }
        },

        watch: {
            getAllOffers(offersCount){
                if(offersCount !== 0){
                   let objIndex = this.cards.findIndex((obj => obj.title === "Offers"));
                    this.cards[objIndex].data = offersCount;

                }
            }

        },
        methods:{

        }
    }
</script>