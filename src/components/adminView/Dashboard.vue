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


                    <v-flex d-flex xs12 sm6 md3   v-for="card in cards">
                        <v-card dark >
                            <v-card-text>
                                <v-icon dark x-large>{{card.icon }}</v-icon>
                                <div class="headline">{{card.title}}</div>

                            </v-card-text>
                            <v-card-text class="headline font-weight-bold">
                                {{ card.data }}
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-btn   :to="card.link"> {{ card.text }} </v-btn>
                        </v-card>
                    </v-flex>


        </v-layout>


    </v-container>
</template>

<script>
    import Navbar from "./Navbar";
    import NewOfferDialog from "./newOfferDialog";
    export default {
        name: 'dashboard',
        components: {Navbar, NewOfferDialog},
        data:function () {
            return {
                cards: [
                    {title: "Customers", icon: "people", link: "/customers", data: "20", text: "view all"},
                    {title: "Offers", icon: "star", link: "/offers", data: "20", text: "Edit"},
                    {title: "Orders", icon: "forum", link: "/orders", data: "30", text: "manage"},
                    {title: "Points Level", icon: "import_export", link: "/pointslevel", data: "5", text: "change"}
                ]
            }
        }
    }
</script>