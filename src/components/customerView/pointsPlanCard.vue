<template>
    <v-card
            :tile="true"
            :elevation="10"
            max-width="250px"
            id="rounded-card"

    >

        <v-card-title
                primary-title
                :elevation="10"
                id="plan-title"
        >
            <div>
                <v-icon size="50px" color="black">import_export</v-icon>
                <h3>Points Plan</h3>
            </div>

        </v-card-title>


        <v-content >
            <v-layout row justify-center align-center  v-if="dataLoading" style="margin: 20px;" transition="scale-transition">
                <v-progress-circular
                        indeterminate
                        color="black"
                ></v-progress-circular>
            </v-layout>
            <div class="scroll-y" style="max-height: 190px;" >


                <v-scroll-y-transition >
            <v-list two-line v-if="dataLoaded">
                <template v-for="(item, index) in items">
                    <v-divider ></v-divider>
                    <v-list-tile :key="index" >

                        <v-list-tile-content style="font-size: x-large;font-weight: bold;">
                            <v-list-tile-sub-title>{{ item.occasionName }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-action-text style="font-size: larger;font-weight: bold;">
                                {{ item.occasionPoints }} <v-icon color="black">stars</v-icon>
                            </v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 === items.length" :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
                </v-scroll-y-transition>
            </div>
            <!--- section of how to pay -->
            <v-layout row wrap>
            <v-card-text>
                <v-card-title
                        primary-title
                        style="
                        padding: 0;
                        justify-content: center;
                        font-size: large;"
                >
                You can pay by:
                </v-card-title>

                <v-responsive avatar>
                    <v-avatar>
                        <img width="50px" src="../../assets/orange-cash.png" alt="orange cash">
                    </v-avatar>
                </v-responsive>
            </v-card-text>
            </v-layout>
        </v-content>

    </v-card>
</template>
<script>

    export default {
        name: 'pointsplancard',
        components: {},
        data: () => {
            return{
                items: '',
                dataLoading: true,
                dataLoaded: false,
            }
        },
        computed:{
            getAllOccasions(){
                return this.$store.getters.getAllOccasions;
            },
        },
        watch: {
            getAllOccasions(occasionsArray){
                if(occasionsArray !== null){
                    this.items = occasionsArray;
                    this.dataLoading = false;
                    this.dataLoaded = true;
                }
            },
        },
        created(){

        },
        methods:{
            offerSelected(){
                console.log("offer selected");
            }
        }
    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }
    #plan-title{
        padding-top: 40px;
        padding-bottom: 5px;
        justify-content: center;
    }

</style>