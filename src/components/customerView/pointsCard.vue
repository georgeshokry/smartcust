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
                <h3>Your Points</h3>

            </div>
        </v-card-title>

        <v-content class="points">
            <div>
                <span style="font-family: cursive;">{{ userPoints }}</span>
                <v-card-text style="font-size: medium;padding: 0px;">Smart Code: {{ userCode }}</v-card-text>
            </div>
            <v-divider style="margin-left: 15px; margin-right: 15px"></v-divider>
            <div style="padding: 15px">


                <v-card-text style="font-size: small;padding: 0px;">
                    *Share your Smart Code<br>to get more Points,<br>
                    Every new customer use you're code<br>
                    you will get <span>(20)</span> Points
                </v-card-text>
            </div>
        </v-content>
        </div>
    </v-card>
</template>
<script>

    export default {
        name: 'pointscard',
        components: {},
        data: () => {
            return{
                dataLoading: true,
                dataLoaded: false,

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
        padding-top: 40px;
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