<template>
    <v-container
            fluid grid-list-md
            style="
            padding-top: 70px;
            padding-bottom: 50px;
            height: auto;"
    >

        <navbar></navbar>
<page-path></page-path>

        <div>

<!--            starting of tool bar above the datatabel-->
            <v-toolbar flat  dark>
                <v-toolbar-title><v-icon larg>star</v-icon> <v-spacer></v-spacer><div class="header-text">All Offers</div></v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>

                <v-text-field
                        v-model="searchOfferByTitle"
                        append-icon="search"
                        label="Search Offers By any type"
                        single-line
                        hide-details
                        color="black"
                ></v-text-field>

            </v-toolbar>

<!--            starting of offers datatabel-->
            <v-data-table
                    :headers="headers"
                    :items="allOffers"
                    :loading="dataTabelLoading"
                    :search="searchOfferByTitle"
                    class="elevation-1  white--text"
                    color="black"
                    dark
                    no-data-text="Stay Tuned, This Might Take Some Time!"

            >
                <v-progress-linear v-slot:progress  indeterminate></v-progress-linear>
                <template v-slot:no-data v-if="viewNoData">

                    <h5 >No Offers yet, Start Create Now!</h5>

                </template>
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.offerTitle }}</td>
                    <td class="text-xs-left">{{ props.item.offerContent}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpDate ? props.item.offerExpDate : "*(By No of customers)"}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpNum ? props.item.offerExpNum : "*(By Date)" }}</td>
                    <td class="text-xs-left">{{ props.item.offerPoints }}</td>
                    <td class="text-xs-left">
                        <img style="max-width: 130px; max-height: 90px;" :src="props.item.offerPic || url('../../assets/no-image.jpg')" >
<!--                        <img style="max-width: 130px; max-height: 90px;" src="">-->
                    </td>
                    <td class="text-xs-left">{{ props.item.offerCreatedTimestamp }}</td>
                    <td class="text-xs-left">
                        ({{ props.item.offerStatus }})
                        <v-btn icon small @click="closeOffer(props.item.idOfOffer)">
                        <v-icon v-if="props.item.offerStatus === 'opened'">cancel</v-icon>
                            <v-icon v-if="props.item.offerStatus === 'closed'">check_circle</v-icon>
                    </v-btn>
                    </td>
                    <td class="text-xs-left">{{ props.item.userIdRedeem ? props.item.userIdRedeem : "No one yet"}}</td>


                </template>

                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning">
                        No results for "{{ searchOfferByTitle }}" .
                    </v-alert>
                </template>

            </v-data-table>
        </div>




    </v-container>
</template>
<script>
    import Navbar from "./Navbar";
    import pagePath from "./pagePath"
    export default {
        name: 'offers',
        components: {Navbar, pagePath},
        data: () => ({
            dataTabelLoading: true,
            searchOfferByTitle:'',
            viewNoData: false,
            idOfOffer: "",
            headers: [
                {text: 'Offer Title', value: 'offerTitle'},
                {text: 'Content', value: 'offerContent', class: "offer-content"},
                {text: 'Expiration *(By Date)', value: 'offerExpDate', class: "offer-exp-date"},
                {text: 'Expiration *(By Number Of Customer)', value: 'offerExpNum'},
                {text: 'Points', value: 'offerPoints'},
                {text: 'Photo', value: 'offerPic'},
                {text: 'Created On', value: 'offerCreatedTimestamp'},
                {text: 'Status', value: 'offerStatus',},
                {text: 'No. of users redeem', value: 'userIdRedeem', class:"no-of-users"}
            ],
        allOffers: [],

    }),

    computed: {

        getAllOffers(){

            return this.$store.getters.getAllOffersGetter;
        }
    },

    watch: {
        getAllOffers(offersArray){
            if(offersArray !== null){
                this.allOffers = offersArray;

                console.log(this.allOffers);
            }else {
                this.viewNoData = true;
            }
            this.dataTabelLoading = false;
        }

    },

    mounted () {
        this.allOffersNow();
    },

    methods: {
            allOffersNow() {
                this.$store.dispatch("getAllOffersDatabase");
            },
        closeOffer(item){
            this.$store.dispatch("changeOfferStatus", {offerId: item});
        }
    }

    }
</script>

<style>
.offer-content{
    min-width: 250px;
}
    .offer-exp-date{
        max-width: 150px;
    }
    .no-of-users{
        max-width: 160px;

    }
@media screen and (max-width: 375px) {
    div.header-text {
        font-size: smaller;
    }
}
</style>
