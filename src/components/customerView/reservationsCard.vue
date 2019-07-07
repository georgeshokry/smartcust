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
    <v-content style="text-align: left; padding: 0 0 25px 0; max-height: 300px; margin-bottom: 30px " class="scroll-y">
        <v-expansion-panel>
            <v-divider></v-divider>
            <v-expansion-panel-content
                    v-for="(item,i) in data"
                    :key="i"

            >

                <template v-slot:header >
                    <v-card-title style="font-size: large">{{item.idOfOccasion}}</v-card-title>
                </template>
                <v-divider></v-divider>
                <v-card style="    background-color: #eeeeee; border-style: solid;">

                        <v-card-text style="    padding-bottom: 0;">
                            <strong>Address:</strong> {{item.reservAddress}}<br>
                            <strong>On:</strong> {{item.reservDate}}<br>
                            <strong>At:</strong> {{item.reservTime}}<br>
                            <strong>status</strong>
                        </v-card-text>
                    <v-card-title style="    padding-top: 0;">

                        <v-layout column justify-center >
                        <v-timeline
                                v-if="item.reservStatusId.substr(0, 7) === 'status_'"
                                dense
                                v-for="(stat,h) in allTypesOfStatus"

                        >
                            <v-timeline-item small color="grey"  >
                                <template v-slot:icon  v-if="parseInt(item.reservStatusId.substr(7)) >= parseInt(stat.id.substr(7))">
                                    <v-avatar size="18">
                                        <v-icon color="white" size="15" style="background-color: black">done</v-icon>
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
                                    <div style="color: red" >
                                        {{item.reservStatusId}}
                                    </div>

                                </v-timeline-item>
                            </v-timeline>

                            <strong>Done</strong>
                        </v-layout>
                    </v-card-title>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>

    </v-content>
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
                console.log(reservastions);
                if(reservastions){
                    this.data = [];
                    for(let i in reservastions){
                        this.data.push({
                            idOfOccasion: reservastions[i].idOfOccasion,
                            reservAddress: reservastions[i].reservAddress,
                            reservDate: reservastions[i].reservDate,
                            reservTime: moment(reservastions[i].reservTime, "hh:mm").format("LT"),
                            reservStatusId: reservastions[i].reservStatusId,
                            reservCreatedTimeStamp: reservastions[i].reservCreatedTimeStamp,
                        });
                    }
                    this.dataLoading = false;
                    this.dataLoaded = true;
                    console.log(this.data);

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
            }
        },


        created() {
            this.$store.dispatch('listenOnAllCustomerReservations');
            this.$store.dispatch('readAllReservStatus');
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
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }
.status-checked{
    font-weight: bolder;
}

</style>