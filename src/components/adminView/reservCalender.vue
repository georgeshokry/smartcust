<template>
    <v-layout>
        <v-flex>
            <v-card height="fit-content">
                <v-card-title class="headline" style="text-align: left;">
                    Reservations Agenda*<br>


                </v-card-title>
                <h3 style="background-color: #c5c5c5">Up Next: {{upNextEvent}}</h3>
                <v-divider class="mx-0 ma-0"></v-divider>
                <v-calendar
                        :now="today"
                        :value="today"
                        color="primary"
                >
                    <template v-slot:day="{ date }">
                        <template v-for="(event,i) in eventsMap[date]">
                            <v-menu
                                    :key="i"
                                    v-model="event.open"
                                    full-width
                                    offset-x
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
                                        min-width="350px"
                                        flat
                                >
                                    <v-toolbar
                                            color="grey"
                                            dark
                                    >

                                        <v-toolbar-title v-html="event.reservName"></v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-card-title>
                                            <v-icon size="15">query_builder</v-icon><h4>{{event.reservTime}}</h4>

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
                <v-card-text>
                <h5>*Confirmed Payment reservations only show here, for more details go to
                    <a style="color: #f874ff" @click="$router.replace('/admin/reservations')">Reservations</a>.
                </h5>
                </v-card-text>
            </v-card>


        </v-flex>
    </v-layout>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "reservCalender",
        data:()=>{
            return {
                today: new Date().toISOString().substr(0, 10),
                events: [],
                upNextEvent: '',
            }
        },
        computed:{
            getAllReserv(){
                return this.$store.getters.getAllAdminReservations;
            },
            eventsMap () {
                const map = {};
                this.events.forEach(e => (map[e.reservDate] = map[e.reservDate] || []).push(e));
                console.log(map);
                return map
            }
        },
        watch:{
            getAllReserv(resvArray){
                this.events = [];
                if(resvArray !== null){
                    for(let i in resvArray)
                        if(resvArray[i].reservStatusId === 'status_3') {
                            this.events.push({
                                reservName: resvArray[i].occasionMap.occasionName,
                                reservAddress: resvArray[i].reservAddress,
                                reservDate: resvArray[i].reservDate,
                                reservTime: moment(resvArray[i].reservTime, "hh:mm").format("LT"),
                                reservCreatedTimeStamp: resvArray[i].reservCreatedTimeStamp,
                                open: false

                            });
                            if(moment() <= moment(resvArray[i].reservDate) ){
                                this.upNextEvent =
                                    resvArray[i].occasionMap.occasionName + ' '+ '('+
                                    moment(resvArray[i].reservDate).fromNow()+')' +
                                    " at " +
                                    moment(resvArray[i].reservTime, "hh:mm").format("LT");
                            }
                        }
                    }
                    console.log(this.events)
                }

            },
        methods:{
            open (event) {
                alert(event.reservName)
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
</style>