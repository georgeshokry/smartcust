<template>
    <v-card
            :tile="true"
            :elevation="10"
            min-width="250px"
            id="rounded-card"

    >
        <v-layout row justify-center align-center v-if="dataLoading" style="min-height: 263px" transition="scale-transition">
            <v-progress-circular
                    indeterminate
                    color="black"
            ></v-progress-circular>
        </v-layout>


        <div v-if="dataLoaded" >
<!--        starting of points card-->
        <v-card-title
                primary-title
                id="points-title"
        >
            <div>
                <v-icon size="50px" color="black">stars</v-icon>
                <h3>Points</h3>

            </div>
        </v-card-title>

        <v-content class="points">
            <div>


                <v-badge right  color="white" style="margin-top: 10px;" >

                    <template  v-slot:badge >
                        <span style="color: black"><v-btn icon size="5px" color="white" @click="pointsRules= true"><v-icon size="20px" style="font-weight:bold;">help_outline</v-icon></v-btn></span>
                    </template>
                    <span style="font-family: cursive;">
                        <animated-number
                                :value="userPoints"
                                :round="1"
                                :duration="1000"
                                style="font-size: -webkit-xxx-large;"
                        />
                    </span>
                </v-badge>

                <v-card-text style="font-size: medium;padding: 0px;">Smart Code: {{ userCode }}</v-card-text>
            </div>
            <v-divider style="margin-left: 15px; margin-right: 15px"></v-divider>
            <div style="padding: 15px">



            </div>
        </v-content>
        </div>

        <v-dialog
                v-model="pointsRules"
                width="400"
                style="z-index: 55"
                scrollable
        >

            <v-card>
                <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >help </v-icon> Points Rules*</span>
                </v-card-title>

                <v-card-text>
                    *Share your Smart Code to get more Points,<br>
                    Every new customer create new account with using your Smart Code
                    you will get <span style="font-weight: bold">(20)</span> points in return.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions style="align-self: center;">
                    <v-spacer></v-spacer>
                    <v-btn
                            dark
                            color="black"
                            flat
                            @click="pointsRules = false"
                    >
                       OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>
<script>
    import AnimatedNumber from "animated-number-vue";
    export default {
        name: 'pointscard',
        components: {AnimatedNumber},
        data: () => {
            return{
                dataLoading: true,
                dataLoaded: false,
                pointsRules: false,

                userPoints: '',
                userCode: ''

            }
        },
        computed:{
            getUserPoints(){
                return this.$store.getters.getProfileInfoDb;
            }
        },
        watch:{
            getUserPoints(points) {

                if (points) {
                    this.userPoints = points.userPoints;
                    this.userCode = points.userCode;


                    ///starting remove progress and show data
                    this.dataLoading = false;
                    this.dataLoaded = true;

                }
            }
        },
        methods: {

        }

    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }
    .avatar{

    }
    #points-title{
        padding-top: 45px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }

    .points {
        text-align: center !important;
        padding-bottom: 16px !important;
        font-weight: 600;
        font-size: -webkit-xxx-large;
    }

</style>