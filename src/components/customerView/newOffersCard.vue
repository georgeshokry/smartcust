<template>
    <v-card
            :tile="true"
            :elevation="10"
            max-width="100%"
            id="rounded-card"

    >

        <v-card-title
                primary-title
                id="orders-title"
        >
            <div>
                <v-icon size="50px" color="black">loyalty</v-icon>
                <h3>Latest Offers</h3>


                <!--            <v-divider class="profile-divider"></v-divider>-->
            </div>
<!--            <v-switch-->
<!--                    v-model="cycleSlider"-->
<!--                    label="Auto Slide"-->
<!--                    color="black"-->
<!--                    style="    justify-content: flex-end;"-->
<!--            ></v-switch>-->
        </v-card-title>

        <!--some of user data show here-->
        <v-content style="">

            <v-carousel hide-delimiters>
                <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
                        @click.stop="offerSelected"
                        style="cursor: pointer;"
                        v-ripple
                >
                    <div class="offer-content">
                        <h3 class="offer-title">Get 50% off of any wedding photo session</h3>
                        <v-divider ></v-divider>
                        <div  class="offer-rules">
                            <h3>Will get: 30 <v-icon size="20px" >stars</v-icon></h3>
                            <h3>Expired By: first 3 <v-icon size="20px" >directions_run</v-icon></h3>
                            <h3>Order Now</h3>
                        </div>

                    </div>

                </v-carousel-item>
            </v-carousel>
        </v-content>
    </v-card>
</template>
<script>

    export default {
        name: 'newofferscard',
        components: {},
        data: () => {
            return{
                items: [
                    // {
                    //     src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                    // },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                    },
                    // {
                    //     src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                    // }
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
    .avatar{

    }
    #orders-title{
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-add-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }
    .offer-content{
        text-align: center;
        position: center;
        border-radius: 0px 0px 50px 50px;
        max-width: fit-content;
        background-color: rgba(0, 0, 0, 0.20);
        justify-content: center;
        margin: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .offer-title{
        font-size: large;
        padding: 3%;
        color: white;
    }
    .offer-rules{
        padding: 1%;
        margin: 1%;
        color: white
    }

</style>