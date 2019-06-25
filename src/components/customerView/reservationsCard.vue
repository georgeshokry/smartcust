<template>
<v-card
        :tile="true"
        :elevation="10"
        max-width="250px"
        id="rounded-card"

>
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
            <v-icon size="50px" color="black">forum</v-icon>
            <h3>Reservations</h3>
<!--            <v-divider class="profile-divider"></v-divider>-->
        </div>
    </v-card-title>

    <!--some of user data show here-->
    <v-content style="text-align: left; padding-left: 16px; padding-bottom: 16px">
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>

    </v-content>

<reservation-dialog :createResvDialog="oneWayFlag" @closeNow="twoWayFlag" ></reservation-dialog>
</v-card>
</template>
<script>


    import reservationDialog from "./reservationDialog";
    export default {
        name: 'reservationsCard',
        components: {reservationDialog},

        data: () => {
            return {
                oneWayFlag: false,
                offerIdSelected: null,
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
        // props: {
        //     createResvDialog:{
        //         default: false,
        //         type: Boolean,
        //     }
        // },
        // computed:{
        //     seeProps(){
        //         return this.createResvDialog;
        //     }
        // },
        // watch: {
        //     seeProps(value) {
        //         this.createResvDialog = value;
        //     }
        // },
        // methods:{
        //     modalVar(){
        //
        //     }
        // },
        // computed: {
        //     createResvDialog: {
        //         get() {
        //             return this.open
        //         },
        //         set(open) {
        //             this.$emit('input', open)
        //         }
        //
        //     },
        // },
        created() {

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


</style>