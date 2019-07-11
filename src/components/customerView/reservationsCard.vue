<template>
<v-card
        :tile="true"
        :elevation="10"
        max-width="250px"
        height="auto"
        id="rounded-card"

>
    <loading-data-progress v-if="dataLoading"/>


    <div v-if="dataLoaded" >
    <div class="btn-add-corner">
        <v-tooltip left color="black">
            <template v-slot:activator="{ on }">
                <v-btn flat icon color="black " style="margin: 0" v-on="on" @click="openNow">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
            <span>Create New Reservation</span>
        </v-tooltip>


    </div>
    <!--                        starting of orders header-->



    <v-card-title
            primary-title
            id="orders-title"
            style="padding-right: 0; padding-left: 0; padding-top: 20px"

    >
        <div>
            <v-responsive avatar>
                <v-avatar color="black">
                    <v-icon size="40px" color="white">forum</v-icon>
                </v-avatar>
            </v-responsive>
            <h3>Reservations</h3>
<!--            <v-divider class="profile-divider"></v-divider>-->
        </div>
    </v-card-title>

    <!--some of user data show here-->
    <v-content style="text-align: left; padding: 0 0 25px 0; max-height: 350px; margin-bottom: 20px " class="scroll-y">
        <div style="justify-content: center; text-align: center;" v-if="data.length ===0">
            <v-responsive style="    min-height: 175px;">
            <img width="150px" src="../../assets/photographer.svg">
            <div style="position: absolute;top: 120px;right: 25px;">
                <h3>
                    We are waiting for you &#128522;
                </h3>
            </div>
            </v-responsive>
        </div>

        <v-expansion-panel light >


            <v-divider></v-divider>
            <v-expansion-panel-content
                    v-for="(item,i) in data"
                    :key="i"

            >


                <template v-slot:header style="    padding: 15px;">
                    <v-layout row wrap>
                    <v-card-title style="font-size: large">
                        <v-layout column>
                        <div>
                            <v-icon >party_mode</v-icon>
                            {{item.idOfOccasion}}

                        </div>
                            <span style="font-size: small">Sent: {{item.reservCreatedTimeStamp}} ago</span>
                        <div>
                        <span  style="font-size: small; color: red" v-if="item.reservStatusId === 'canceled by customer' || item.reservStatusId === 'canceled by photographer'">
                            <v-icon small color="red">highlight_off</v-icon>
                            Canceled
                        </span>
                        <span  style="font-size: small; color: grey"  v-if="['status_1','status_2','status_3','status_4'].includes(item.reservStatusId)">
<!--                            <v-icon small color="grey">arrow_right</v-icon>-->
                            In progress...
                        </span>
                        <span  style="font-size: small; color: green"  v-if="item.reservStatusId === 'status_5'">
                            <v-icon small color="green">done_all</v-icon>
                            Done
                        </span>
                        </div>
                        </v-layout>

                    </v-card-title>
                    </v-layout>
                </template>
                <v-divider></v-divider>
                <v-card style="    background-color: #eeeeee; border-style: solid;">

                        <v-card-text style="    padding-bottom: 0;">
                            <v-icon >place</v-icon>{{item.reservAddress}}<br>
                            <v-icon >event</v-icon> {{item.reservDate.fromNow}} | {{item.reservDate.On}}<br>
                            <v-icon >query_builder</v-icon> {{item.reservTime}}<br>
                            <strong>Status</strong>
                            <v-divider style="    max-width: 40px;"></v-divider>
                        </v-card-text>
                    <v-card-title style="    padding-top: 0;">

                        <v-layout column justify-center >
                        <v-timeline
                                v-if="item.reservStatusId.substr(0, 7) === 'status_'"
                                dense
                                v-for="(stat,h) in allTypesOfStatus"

                        >
                            <v-timeline-item small color="grey"  >
                                <template v-slot:icon  v-if="parseInt(item.reservStatusId.substr(7)) >= parseInt(stat.id.substr(7)) || item.reservDate.On === new Date().toISOString().substr(0, 10)">
                                    <v-avatar size="18">
                                        <v-icon color="white" size="15" style="background-color: green">done</v-icon>
                                    </v-avatar>
                                </template>

                                <div :class="{'status-checked': parseInt(item.reservStatusId.substr(7)) >= parseInt(stat.id.substr(7))}">{{ stat.name }}</div>
                            </v-timeline-item>
                        </v-timeline>

                            <v-timeline
                                    v-if="item.reservStatusId === 'canceled by customer' || item.reservStatusId === 'canceled by photographer'"
                                    dense

                            >
                                <v-timeline-item small color="grey" >
                                <template v-slot:icon  >
                                    <v-avatar size="18">
                                        <v-icon color="white" size="15" style="background-color: red">clear</v-icon>
                                    </v-avatar>
                                </template>
                                    <div style="color: red" class="status-checked">
                                        {{item.reservStatusId}}
                                    </div>

                                </v-timeline-item>
                            </v-timeline>
                            <v-divider style="    max-width: 40px;"></v-divider>
                            <strong>Done</strong>
                            <v-btn @click="startCancelConfirm(item.idOfReservation)" outline small color="red" v-if="['status_1','status_2'].includes(item.reservStatusId)">Cancel Reservation?*</v-btn>
                            <h5 style="color: red; text-align: center" v-if="item.reservStatusId.substr(0,8) !== 'canceled'">
                                <b>*</b>You can't cancel the reservation after "<b>Payment Confirmation</b>", Contact us for more details.
                            </h5>
                        </v-layout>
                    </v-card-title>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-content>

        <v-dialog
                persistent
                v-model="confirmCancelDialog"
                width="300"
                content-class="custom-progress-dialog"
        >
            <v-card class="rounded-card">
                    <v-card-title style="text-align: center">
                        <v-card-text>
                            <h3>You are about to cancel<br>the reservation, Are you sure?</h3>

                        </v-card-text>
                        <v-card-text>
                            <h5 style="color: red"><b>Be careful<br> you can't undo this step again.</b></h5>
                        </v-card-text>
                    </v-card-title>

                    <v-card-actions style="justify-content: space-between; padding: 20px;">
                        <v-btn
                                color="black"
                                flat
                                @click="confirmCancelDialog = false"
                        >
                            no
                        </v-btn>
                        <v-btn
                                color="red"
                                dark
                                @click="confirmCancelation"
                        >
                            yes
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
<reservation-dialog :createResvDialog="oneWayFlag" @closeNow="twoWayFlag" ></reservation-dialog>
</v-card>
</template>
<script>

    import moment from 'moment';
    import reservationDialog from "./reservationDialog";
    import loadingDataProgress from './loadingDataProgress.vue';
    export default {
        name: 'reservationsCard',
        components: {loadingDataProgress,reservationDialog},

        data: () => {
            return {
                dataLoading: true,
                dataLoaded: false,
                oneWayFlag: false,
                offerIdSelected: null,
                data:[],
                allTypesOfStatus: [],
                confirmCancelDialog:false,
                reservationIdSelected: '',
            }
        },
        computed:{
            getAllCustomerReservations(){
                return this.$store.getters.getAllCustomerReservations;
            },
            getAllReservStatus(){


                return this.$store.getters.getAllReservStatus;
            }
        },
        watch:{
            getAllCustomerReservations(reservastions){

                if(reservastions){
                    this.data = [];
                    for(let i in reservastions){

                        this.data.push({
                            idOfReservation: reservastions[i].idOfReservation,
                            idOfOccasion: reservastions[i].idOfOccasion,
                            reservAddress: reservastions[i].reservAddress,
                            reservDate: {fromNow: moment(reservastions[i].reservDate).fromNow(), On: moment(reservastions[i].reservDate).format("YYYY-MM-DD")} ,
                            reservTime: moment(reservastions[i].reservTime, "hh:mm").format("LT"),
                            reservStatusId: reservastions[i].reservStatusId,
                            reservCreatedTimeStamp: moment(reservastions[i].reservCreatedTimeStamp).toNow(true),

                        });
                    }
                    this.dataLoading = false;
                    this.dataLoaded = true;

                }
            },
            getAllReservStatus(status){
                if(status !== null){
                    for(let i in status) {
                        if(status[i].id !== "status_50" && status[i].id !== "status_51") {
                            this.allTypesOfStatus.push({
                                name: status[i].name,
                                id: status[i].id
                            });
                        }
                    }
                    console.log(this.allTypesOfStatus);
                }
            }
        },
        methods:{
            openNow(){
                this.oneWayFlag = true;
            },
            twoWayFlag(){
                this.oneWayFlag = false;
            },
            startCancelConfirm(id){
                console.log(id);
                this.reservationIdSelected = id;
                this.confirmCancelDialog = true;
            },
            confirmCancelation(){
                this.$store.dispatch('editReservationStatusToCanceledByCust', {idOfReservation: this.reservationIdSelected});
                this.confirmCancelDialog = false;
                this.reservationIdSelected = '';
            }
        },


        created() {
            this.$store.dispatch('listenOnAllCustomerReservations');
            this.$store.dispatch('readAllReservStatus');

        },
        mounted() {
        }
    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }

    #orders-title{
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
    }

    .btn-add-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 209px !important;
        text-align: right;
        padding-bottom: 7px;
        padding-left: 5px;
        z-index: 1;
        position: absolute

    }
.status-checked{
    font-weight: bolder;
}

</style>