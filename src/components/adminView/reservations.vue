<template>

    <v-container
            fluid grid-list-md
            style="
            padding-bottom: 50px;
            height: auto;"
    >
        <page-path></page-path>

        <div>

            <!--            starting of tool bar above the datatabel-->
            <v-toolbar flat  dark>
                <v-toolbar-title><v-icon larg>forum</v-icon> <v-spacer></v-spacer>All Reservations</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>

                <v-text-field
                        v-model="searchServByTitle"
                        append-icon="search"
                        label="Search Reservations By any type"
                        single-line
                        hide-details
                        color="black"
                ></v-text-field>

            </v-toolbar>

            <!--            starting of offers datatabel-->
            <v-data-table
                    :headers="headers"
                    :items="allReserv"
                    :loading="dataTabelLoading"
                    :search="searchServByTitle"
                    class="elevation-1  white--text"
                    color="black"
                    dark
                    no-data-text="Stay Tuned, This Might Take Some Time!"

            >
                <v-progress-linear v-slot:progress  indeterminate></v-progress-linear>
                <template v-slot:no-data v-if="viewNoData">

                    <h5 >No <b>Reservations</b> yet,Try to create <b>Offers</b> to attract more <b>customers</b>!</h5>

                </template>
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.offerTitle }}</td>
                    <td class="text-xs-left">{{ props.item.offerContent}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpDate}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpNum}}</td>
                    <td class="text-xs-left">{{ props.item.offerPoints }}</td>
                    <td class="text-xs-left">{{ props.item.offerCreatedTimestamp }}</td>
                    <td class="text-xs-left">({{ props.item.offerStatus }})</td>


                </template>

                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning">
                        No results for "{{ searchServByTitle }}" .
                    </v-alert>
                </template>

            </v-data-table>
        </div>
    </v-container>



</template>

<script>
    import Navbar from "./Navbar";
    import pagePath from "./pagePath";

    export default {
        name: "reservations",
        components: {Navbar, pagePath},
        data:()=>{
            return{
                dataTabelLoading: true,
                searchServByTitle:'',
                viewNoData: false,
                headers: [
                    {text: 'Reservation Type', value: 'offerTitle'},
                    {text: 'Customer', value: 'userIdRedeem', class:"no-of-users"},
                    {text: 'Date', value: 'offerContent', class: "offer-content"},
                    {text: 'Time', value: 'offerExpDate', class: "offer-exp-date"},
                    {text: 'Address', value: 'offerExpNum'},
                    {text: 'Points', value: 'offerPoints'},
                    {text: 'Photo', value: 'offerPic'},
                    {text: 'Created On', value: 'offerCreatedTimestamp'},
                    {text: 'Reservation Status', value: 'offerStatus',},
                    {text: 'Offer Used', value: 'userIdRedeem', class:"no-of-users"}
                ],
                allReserv: [],
            }
        },
        computed: {

            getAllReserv(){


            }
        },

        watch: {
            getAllReserv(resvArray){
                if(resvArray !== null){
                    this.allOffers = resvArray;

                }else {
                    this.viewNoData = true;
                }
                this.dataTabelLoading = false;
            }

        },

        mounted () {

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>