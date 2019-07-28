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
                <v-toolbar-title><v-icon larg>loyalty</v-icon> <v-spacer></v-spacer><div class="header-text">All Offers</div></v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-btn icon="" color="white" class="black--text" @click="showForm = true"><v-icon>add_circle</v-icon></v-btn>

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
                    <td class="text-xs-left">{{ props.item.occasionType.occasionName }}
                        <v-tooltip bottom color="black" nudge-bottom="-10">
                            <template v-slot:activator="{ on }">
                                <div v-on="on" style="width: fit-content;     margin: auto;">
                                    <v-btn icon  size="5px" small color="white" style="margin: 5px" @click="shareFacebook(props.item.idOfOffer)" target="_blank">

                                        <img width="20px" src="../../assets/facebook.svg">
                                    </v-btn>
                                    <v-btn icon size="5px" small color="white" style="margin: 5px" @click="shareTweeter(props.item.idOfOffer)" target="_blank">

                                        <img width="20px" src="../../assets/twitter.svg">
                                    </v-btn>
                                    <v-btn icon   size="5px" small color="white" style="margin: 5px" @click="shareWhatsapp(props.item.idOfOffer)" target="_blank">

                                        <img width="20px" src="../../assets/whatsapp.svg">
                                    </v-btn>
                                </div>
                            </template>
                            <span >Share Offer</span>
                        </v-tooltip>
                    </td>
                    <td class="text-xs-left">{{ props.item.offerTitle }}</td>
                    <td class="text-xs-left">{{ props.item.offerContent}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpDate ? props.item.offerExpDate : "*(By No of customers)"}}</td>
                    <td class="text-xs-left">{{ props.item.offerExpNum ? props.item.offerExpNum : "*(By Date)" }}</td>
                    <td class="text-xs-left">{{ props.item.offerPoints }}</td>
                    <td class="text-xs-left">
                        <v-fade-transition mode="out-in">
                        <v-img contain max-width="130" :src="props.item.offerPic " >
                            <template v-slot:placeholder>
                                <v-layout
                                        fill-height
                                        align-center
                                        justify-center
                                        ma-0
                                >
                                    <v-progress-circular indeterminate color="white darken-2 lighten-5"></v-progress-circular>
                                </v-layout>
                            </template>
                        </v-img>
                        </v-fade-transition>
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
                    <td class="text-xs-left">{{ props.item.userRedeemId.length !== 0 ? props.item.userRedeemId.length : "No one yet"}}</td>


                </template>

                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning" style="text-align: left">
                        No results for "{{ searchOfferByTitle }}" .
                    </v-alert>
                </template>

            </v-data-table>
        </div>

        <new-offer-dialog style="display: none" v-model="showForm"></new-offer-dialog>

    </v-container>
</template>
<script>
    import Navbar from "./Navbar";
    import pagePath from "./pagePath"
    import newOfferDialog from './newOfferDialog';
    export default {
        name: 'offers',
        components: {Navbar, pagePath, newOfferDialog},
        data: () => ({
            dataTabelLoading: true,
            searchOfferByTitle:'',
            viewNoData: false,
            idOfOffer: "",
            headers: [
                {text: 'Occasion Type', value: 'occasionType', class: "offer-title"},
                {text: 'Offer Title', value: 'offerTitle'},
                {text: 'Content', value: 'offerContent', class: "offer-content"},
                {text: 'Expiration *(By Date)', value: 'offerExpDate', class: "offer-exp-date"},
                {text: 'Expiration *(By Number Of Customer)', value: 'offerExpNum', class: "offer-exp-num"},
                {text: 'Points', value: 'offerPoints'},
                {text: 'Photo', value: 'offerPic', class: "image-column"},
                {text: 'Created', value: 'offerCreatedTimestamp'},
                {text: 'Status', value: 'offerStatus',},
                {text: 'No. of users redeem', value: 'userRedeemId', class:"no-of-users"}
            ],
        allOffers: [],
            showForm: false,

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
        closeOffer(item) {
            this.$store.dispatch("changeOfferStatus", {offerId: item});
        },
        shareFacebook(id) {
            let ShareLink =
                "https://www.facebook.com/sharer/sharer.php?u="
                + window.location.origin + "/profile"
                + "?offer=" + id;
            window.open(ShareLink);
        },
        shareWhatsapp(id) {
            let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                let shareOnMobile =
                    "whatsapp://send?text="
                    + window.location.origin + "/profile"
                    + "?offer=" + id;
                window.open(shareOnMobile);
            } else {
                let ShareLink =
                    "https://web.whatsapp.com/send?text="
                    + window.location.origin + "/profile"
                    + "?offer=" + id;
                window.open(ShareLink);
            }
        },
        shareTweeter(id) {
            let ShareLink =
                "https://twitter.com/intent/tweet?url="
                + window.location.origin + "/profile"
                + "?offer=" + id;
            window.open(ShareLink);
        }
    }

    }
</script>

<style>
.offer-content{
    min-width: 250px;
}
    .offer-exp-date{
        max-width: 160px;
    }
    .no-of-users{
        max-width: 160px;

    }
    .image-column{
        min-width: 130px;
    }
    .offer-title{
        min-width: 200px;
    }
    .offer-exp-num{
        max-width: 220px;
    }
@media screen and (max-width: 375px) {
    div.header-text {
        font-size: smaller;
    }
}
</style>
