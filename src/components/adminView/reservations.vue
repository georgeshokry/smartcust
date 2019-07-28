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
                        style="    max-width: 340px;"
                ></v-text-field>

            </v-toolbar>

            <!--            starting of offers datatabel-->
            <v-data-table
                    :headers="headers"
                    :items="allReserv"
                    :loading="dataTabelLoading"
                    :search="searchServByTitle"
                    :expand="expand"
                    item-key="idOfOccasion"
                    class="elevation-1  white--text"
                    color="black"
                    dark
                    no-data-text="Stay Tuned, This Might Take Some Time!"

            >
                <template v-slot:no-data v-if="allReserv ===[]">

                    <h5 >No <b>Reservations</b> yet,Try to create <b>Offers</b> to attract more <b>customers</b>!</h5>

                </template>
                <template v-slot:items="props" >


                        <td class="text-xs-left">{{ props.item.idOfOccasion }}</td>
<!--                        <td class="text-xs-left">{{ allStatusTypes[props.item.reservStatusId].name}}</td>-->

                        <td>
                            <v-edit-dialog
                                    lazy
                                    @open="statusSelected = allStatusTypes[props.item.reservStatusId].name"
                            >

                                    {{ allStatusTypes[props.item.reservStatusId].name }}&nbsp
                                    <v-icon small> edit</v-icon>


                                <template v-slot:input      >
                                    <v-select

                                            v-if=" ['status_1','status_2','status_50','status_51'].includes(props.item.reservStatusId)"
                                            v-model="statusSelected"
                                            :items="allStatusTypesNames"
                                            label="Change Status"
                                            :menu-props="{ maxHeight: '150' }"
                                            color="black"
                                            autofocus
                                    ></v-select>
                                    <v-select
                                            v-if="['status_3','status_4','status_5','status_6'].includes(props.item.reservStatusId)"
                                            v-model="statusSelected"
                                            :items="statusSelectedAfterPayment"
                                            label="Change Status"
                                            :menu-props="{ maxHeight: '150' }"
                                            color="black"
                                            autofocus
                                    ></v-select>
                                    <v-btn @click="changeReservStatus(props.item.customerId, statusSelected, props.item.idOfReservation )">Change</v-btn>
                                </template>
                            </v-edit-dialog>
                            <v-dialog
                                    persistent
                                    v-model="confirmPaymentDialog"
                                    width="300"
                                    content-class="custom-progress-dialog"
                            >
                                <v-card class="rounded-card">

                                    <v-card-title>
                                        <v-card-text>
                                            Are you sure to<br> <strong>confirm payment</strong> <br> on this Reservation?
                                        </v-card-text>
                                        <v-card-text>
                                        <b>Note:</b> points <br>will add to customer account.<br>
                                            <strong style="color: red">IF CONFIRMED CAN'T BE UNDO</strong>
                                        </v-card-text>
                                    </v-card-title>
                                    <v-card-actions style="justify-content: space-between; padding: 20px;">
                                        <v-btn
                                                color="black"
                                                flat
                                                @click="confirmPaymentDialog = false"
                                        >
                                            cancel
                                        </v-btn>
                                        <v-btn
                                                color="black"
                                                dark
                                                @click="confirmPayment(statusSelected, props.item.idOfReservation,props.item.customerId )"
                                        >
                                            confirm
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
                    <tr @click="props.expanded = !props.expanded; getSelectedCustomerInfo(props.item.customerId, props.item.occasionMap, props.item.reservOfferId)" style="cursor: pointer">
                        <td class="text-xs-left">Info <v-icon small>info</v-icon></td>
                    </tr>
                        <td class="text-xs-left">{{ props.item.reservDate}}</td>
                        <td class="text-xs-left">{{ props.item.reservTime}}</td>
                        <td class="text-xs-left">{{ props.item.reservAddress }}</td>
                    <td class="text-xs-left">{{ props.item.reservComment }}</td>
                    <tr @click="props.expanded = !props.expanded; getSelectedCustomerInfo(props.item.customerId, props.item.occasionMap, props.item.reservOfferId) " style="cursor: pointer">
                    <td class="text-xs-left">{{ props.item.reservOfferId === null ?  "No"  : "Yes" }} <v-icon small>info</v-icon></td>
                    </tr>

                </template>
                <template v-slot:expand="props">
                    <v-card flat color="grey">
                        <v-card-text style="text-align: left">
                            <v-layout row wrap>

                                <div>
                                    <strong class="black--text">Occasion Information</strong><br>
                                    <strong class="black--text">Type &nbsp</strong>{{occasionInfo.occasionName}}<br>
                                    <strong class="black--text">Price &nbsp</strong>{{occasionInfo.occasionPrice}}&nbsp EGP<br>
                                    <strong class="black--text">Points &nbsp</strong>{{occasionInfo.occasionPoints}}<br>
                                </div>

                                <v-divider vertical class="ma-3"></v-divider>
                                <div>
                                <strong class="black--text">Payment Information</strong><br>

                                    <strong v-if="customerInfo ===''">Loading....</strong>
                                    <div v-if="customerInfo !==''">

                                    <strong class="black--text">Offer Points &nbsp</strong>{{offerInfo.offerPoints !== undefined ? offerInfo.offerPoints : "No Offer Used"}}<br>
                                    <strong class="black--text">Customer Pay &nbsp</strong>{{offerInfo.offerPoints !== undefined ? occasionInfo.occasionPrice-offerInfo.offerPoints : occasionInfo.occasionPrice }} EGP
                                </div>
                                </div>
                                <v-divider vertical class="ma-3"></v-divider>

                                <div>
                                <strong class="black--text">User Information</strong><br>
                            <strong v-if="customerInfo ===''">Loading....</strong>
                            <div v-if="customerInfo !==''">

                            <strong class="black--text">Name &nbsp</strong>{{customerInfo.userFirstName}} {{customerInfo.userLastName}}<br>
                            <strong class="black--text">Phone &nbsp</strong>{{customerInfo.userPhone}} <br>
                            <strong class="black--text">Email &nbsp</strong>{{customerInfo.userEmail}}<br>
                            <v-btn
                                    small
                                    v-bind:href="'tel:' + customerInfo.userPhone"
                                    v-if="isMobile"
                            >
                                <v-icon small left>call </v-icon>
                                Call Now
                            </v-btn>
                            </div>
                                </div>





                            </v-layout>
                        </v-card-text>
                    </v-card>
                </template>
                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning" style="text-align: left">
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
    import moment from 'moment';

    export default {
        name: "reservations",
        components: {Navbar, pagePath},
        data:()=>{
            return{
                dataTabelLoading: true,
                searchServByTitle:'',
                viewNoData: false,
                expand: false,
                headers: [
                    {text: 'Reservation Type', value: 'idOfOccasion', class: 'reserv-type'},
                    {text: 'Status', value: 'idOfOccasion', class: 'status-detail'},
                    {text: 'Customer', value: 'customerId', sortable: false, class: 'customer-detail'},
                    {text: 'Date', value: 'reservDate', class: 'date'},
                    {text: 'Time', value: 'reservTime', class: 'reserv-time'},
                    {text: 'Address', value: 'reservAddress', class: 'reserv-address'},
                    {text: 'Comment', value: 'reservComment', },
                    {text: 'Offer Used?', value: 'reservAddress', },
                ],
                allReserv: [],
                allStatusTypes: [],
                allStatusTypesNames: [],
                statusSelectedAfterPayment:[],
                arrayOfStatusTypes:[],
                statusSelected: '',
                customerInfo:'',
                offerInfo: '',
                occasionInfo: '',
                isMobile: false,
                confirmPaymentDialog: false,
                customerSelected: '',
                reservSelected: '',
            }
        },
        computed: {

            getAllReserv(){
                this.dataTabelLoading = true;
                return this.$store.getters.getAllAdminReservations;
            },
            getCustomerSelected(){
                return this.$store.getters.getCustomerInfoById;
            },
            getOfferSelected(){
              return this.$store.getters.getOfferById;
            },
            getAllReservStatus(){
                return this.$store.getters.getAllReservStatus;
            },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
        },

        watch: {
            getAllReserv(resvArray){
                this.allReserv = [];
                if(resvArray !== null){
                    for(let i in resvArray) {
                        this.allReserv.push({
                            idOfOccasion: resvArray[i].idOfOccasion,
                            reservAddress: resvArray[i].reservAddress,
                            reservDate: resvArray[i].reservDate,
                            reservTime: moment(resvArray[i].reservTime, "hh:mm").format("LT"),
                            reservStatusId: resvArray[i].reservStatusId,
                            reservCreatedTimeStamp: resvArray[i].reservCreatedTimeStamp,
                            idOfReservation: resvArray[i].idOfReservation,
                            customerId: resvArray[i].customerId,
                            occasionMap: resvArray[i].occasionMap,
                            reservOfferId: resvArray[i].reservOfferId,
                            reservComment: resvArray[i].reservComment
                        });
                    }
                    console.log(this.allReserv)
                    this.dataTabelLoading = false;
                }

            },
            getCustomerSelected(customer){
                if(customer !== null){
                    this.customerInfo = customer;
                }
            },
            getOfferSelected(offer){
                if(offer !== null){
                    this.offerInfo = offer;
                    console.log(this.offerInfo)
                }
            },
            getAllReservStatus(status){

                if(status !== null){
                    this.allStatusTypes = [];
                    for(let i in status) {
                        this.allStatusTypes[status[i].id] = {
                            id: status[i].id,
                            name: status[i].name
                        };
                        if(status[i].id !== 'status_50') {
                            this.allStatusTypesNames.push(status[i].name);
                            this.statusSelectedAfterPayment.push(status[i].name);
                            this.arrayOfStatusTypes.push(status[i]);
                        }
                    }
                    this.allStatusTypesNames.splice(3, 7, "canceled by photographer");
                    this.statusSelectedAfterPayment.splice(0,3);
                    this.dataTabelLoading = false;
                }
            },
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.confirmPaymentDialog = false;
                    this.customerSelected = '';
                    this.reservSelected = '';

                }
            },
            getFirebaseErrors(error){
                if(error !== null){


                }
            },

        },

        mounted () {

        },

        methods: {
            getSelectedCustomerInfo(customerId, occasionId, offerId){
                this.customerInfo= '';
                this.offerInfo= '';
                this.$store.dispatch('readCustomerInfoById', customerId);
                this.$store.dispatch('readOfferById', {offerId: offerId});
                this.occasionInfo = occasionId;
                this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            changeReservStatus(customerId, status, idOfReservation){
                this.customerSelected =customerId;
                this.reservSelected = idOfReservation;
                if(status !== 'payment confirmed'){
                let result = this.arrayOfStatusTypes.find(state => state.name === status);
                this.$store.dispatch('editReservationStatusByAdmin', {idOfReservation: idOfReservation, status: result.id});
                }else {
                    this.confirmPaymentDialog = true;
                }
            },
            confirmPayment(status, idOfReservation, customerId){
                let result = this.arrayOfStatusTypes.find(state => state.name === status);
                this.$store.dispatch('editReservationStatusByAdmin', {customerId: this.customerSelected,idOfReservation: this.reservSelected, status: result.id});
            }
        },
        created() {
            this.$store.dispatch('readAllReservStatus');
            this.$store.dispatch('listenOnAllAdminReservations');
        }
    }
</script>

<style>
.date{
    min-width: 120px;
}
.customer-detail{
    min-width: 150px;
}
    .reserv-time{
        min-width: 120px;
    }
    .reserv-address{
        min-width: 300px;
    }
    .status-detail{
        min-width: 200px;
    }
    .reserv-type{
        min-width: 200px;
    }
</style>