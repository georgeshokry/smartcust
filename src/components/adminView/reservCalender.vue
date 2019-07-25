<template>
    <v-layout>
        <v-flex d-flex >
            <v-card height="fit-content" width="500" class="round-card">



                <v-card-text class="headline" style="text-align: center;">
                    <v-icon color="black" x-large>book</v-icon>
                    <div class="headline">Reservations Agenda*</div>


                </v-card-text>
                <v-card-title v-if="upNextEvent.length !== 0" v-for="next in upNextEvent"  style="color: white; background-color: #000000; text-align: left" v-bind:class="{ 'next-header-blinker': next.todayFlag }">
                <v-layout row wrap>
                    <div class="vl"></div>
                <h3>Up Next &#8226; {{next.date}}
                    <v-icon style="margin: 2px" size="15" color="white">query_builder</v-icon>
                    {{next.at}}<br>
                    <h5 >{{next.Name}}</h5>
                </h3>


                </v-layout>
                </v-card-title>
                <v-divider class="mx-0 ma-0"></v-divider>
                <loading-data-progress v-if="dataLoading"></loading-data-progress>
                <v-calendar
                        ref="calendar"
                        v-model="today"
                        type="month"
                        color="primary"
                        v-if="dataLoaded"
                >

                    <template v-slot:day="{ date }">
                        <template v-for="(event,i) in eventsMap[date]">
                            <v-menu
                                    :key="i"
                                    v-model="event.open"
                                    full-width
                                    offset-y
                            >
                                <template v-slot:activator="{ on }">
                                    <div

                                            v-ripple
                                            class="my-event"
                                            v-on="on"
                                            v-html="event.reservName"
                                    ></div>
                                </template>
                                <v-card
                                        color="grey lighten-4"
                                        min-width="300px"
                                        flat

                                >
                                    <v-toolbar
                                            color="grey"
                                            dark
                                            height="40"

                                    >

                                        <v-toolbar-title  style="font-size: small" v-html="event.reservName"></v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-card-title>
                                            <v-icon size="15">query_builder</v-icon>&nbsp<h5> {{event.reservTime}}</h5>

                                        </v-card-title>
                                    </v-toolbar>
                                    <v-card-title primary-title>
                                        <h4 style="text-align: left"><v-icon size="20">place</v-icon>
                                            {{event.reservAddress}}
                                        </h4>
                                    </v-card-title>
                                </v-card>
                            </v-menu>
                        </template>
                    </template>

                </v-calendar>
                <div style="justify-content: space-between;   margin: 5px;">
                    {{today}}
                    <v-layout row  wrap justify-space-between style="    align-items: center;">
                <v-btn fab outline  small @click="prev">
                    <v-icon >keyboard_arrow_left</v-icon>
                </v-btn>
                <v-btn fab outline small @click="resetToday">
                    <v-icon small>fiber_manual_record</v-icon>
                </v-btn>
                <v-btn fab outline small @click="next">
                    <v-icon >keyboard_arrow_right</v-icon>
                </v-btn>
                    </v-layout>
                </div>
                <v-divider class="mx-0 ma-0"></v-divider>
                <v-card-text>
                    <h5>*Confirmed Payment reservations <b>only</b> show here, for more details go to
                    <a style="color: #f874ff" @click="$router.replace('/admin/reservations')">Reservations</a>.
                </h5>
                </v-card-text>
            </v-card>


        </v-flex>
    </v-layout>
</template>

<script>
    import moment from 'moment';
    import LoadingDataProgress from '../customerView/loadingDataProgress'
    export default {
        name: "reservCalender",
        components: {LoadingDataProgress},
        data:()=>{
            return {
                today: new Date().toISOString().substr(0, 10),
                events: [],
                upNextEvent: [],
                nextFlag: false,
                dataLoading: true,
                dataLoaded: false,
            }
        },
        computed:{
            getAllReserv(){
                return this.$store.getters.getAllAdminReservations;
            },
            eventsMap () {
                const map = {};
                this.events.forEach(e => (map[e.reservDate] = map[e.reservDate] || []).push(e));
                return map
            }
        },
        watch:{
            getAllReserv(resvArray){

                let index = 1;
                if(resvArray !== null) {
                    this.events = [];
                    this.upNextEvent= [];
                    for (let i in resvArray) {

                        if (resvArray[i].reservStatusId === 'status_3') {
                            this.events.push({
                                reservName: resvArray[i].occasionMap.occasionName,
                                reservAddress: resvArray[i].reservAddress,
                                reservDate: resvArray[i].reservDate,
                                reservTime: moment(resvArray[i].reservTime, "hh:mm").format("LT"),
                                reservCreatedTimeStamp: resvArray[i].reservCreatedTimeStamp,
                                open: false

                            });
                            if (moment().toNow() >= moment(resvArray[i].reservDate).toNow() || moment().get("day") === moment(resvArray[i].reservDate).get("day")) {
                                this.upNextEvent.push({
                                    Name: resvArray[i].occasionMap.occasionName,
                                    date: moment(resvArray[i].reservDate).get("day") === moment().get("day") ? "Today" : moment(resvArray[i].reservDate).format("dddd"),
                                    at: moment(resvArray[i].reservTime, "hh:mm").format("LT"),
                                    index: index,
                                    todayFlag: moment(resvArray[i].reservDate).get("date") === moment().get("date"),
                                });

                            }
                            console.log(moment(resvArray[i].reservDate).get("date") , moment().get("date"))

                        }
                        index++;
                    }
                this.upNextEvent.splice(1);
                    this.dataLoading = false;
                    this.dataLoaded = true;
                }

                }

            },
        methods:{
            open (event) {
                alert(event.reservName)
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },
            resetToday(){
              this.today =   new Date().toISOString().substr(0, 10);
            }
        },
        created() {
            this.$store.dispatch('listenOnAllAdminReservations');
        }
    }
</script>

<style >
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #000000;
        color: #ffffff;
        border: 1px solid #000000;
        width: 100%;
        font-size: 12px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
    }
    .next-header-blinker {
        -webkit-animation: blinkNext 2s infinite;
        animation: blinkNext 2s infinite;
    }
    @keyframes blinkNext {
        from { background-color: #000000; }
        50% { background-color: #bfbfbf; }
        to { background-color: #000000; }
    }
    .vl {
        border-left: 2px solid #ffffff;
        height: 50px;
        margin-right: 10px;
    }
</style>