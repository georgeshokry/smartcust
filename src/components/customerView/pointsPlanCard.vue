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

            <div class="scroll-y" style="max-height: 200px;" >
            <v-list two-line>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index" avatar ripple @click="">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
<!--                            <v-list-tile-sub-title class="text&#45;&#45;primary">{{ item.headline }}</v-list-tile-sub-title>-->
<!--                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>-->
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
<!--                            <v-icon color="grey lighten-1">star_border</v-icon>-->
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
            </div>
            <!--- section of how to pay -->
            <v-layout row wrap>
            <v-card-text>
                <v-card-title
                        primary-title
                        style="
                        padding-bottom: 10px;
                        justify-content: center;
                        font-size: x-large;"
                >
                You can pay by:
                </v-card-title>

                <v-responsive>
                <img width="75px" src="../../assets/orange-cash.png" alt="orange cash">

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
                items: [
                    { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
                    { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
                    { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
                    { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
                    { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
                ]
            }
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