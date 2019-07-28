<template>
    <v-dialog v-model="openDetailsDialog" persistent width="800" >

        <v-card             id="rounded-card">
            <v-responsive>
            <v-img


                    :src="offerData.offerPic"
                    :lazy-src="offerData.offerPic"
                    aspect-ratio="2.75"
            >
                <template v-slot:placeholder>
                    <v-layout
                            fill-height
                            align-center
                            justify-center
                            ma-0
                    >
                        <v-progress-circular indeterminate color="black darken-2 lighten-5"></v-progress-circular>
                    </v-layout>
                </template>
            </v-img>
            </v-responsive>
            <v-divider ></v-divider>
            <v-card-text style="text-align: left">
                <h3 v-html="offerData.offerTitle"></h3>
                <v-divider class="ma-1 "></v-divider>
                <h4 v-html="offerData.offerContent"></h4>
                <v-divider dark class="ma-1 "></v-divider>
                <h4><v-icon size="15px" color="black" style="margin-top: 5px">party_mode</v-icon> Occasion Type {{offerData.occasionType.occasionName}}* </h4>
                <h4 v-if="offerData.offerExpNum != null" ><v-icon size="15px" color="black">d irections_run</v-icon>Offer End By First {{offerData.offerExpNum}} </h4>
                <h4 v-if="offerData.offerExpDate != null" ><v-icon size="15px" color="black">av_timer</v-icon> Offer End {{offerData.offerExpDate}} </h4>
                <h4><v-icon size="15px" color="black" style="margin-top: 5px">stars</v-icon> Points -{{offerData.offerPoints}} </h4>
            </v-card-text>
            <div style="text-align: center"><h5>*Offer applies <b>only</b> on the occasion type in the offer</h5></div>
            <v-divider ></v-divider>
            <v-card-actions style="justify-content: center">
            <v-btn
                    flat
                    @click="closeDetails()"
            >
                close
            </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
    export default {
        name: "newOfferDetails",
        data:()=>{
            return{
                openDetailsDialog:false,
                offerId: '',
                offerData: '',
            }
        },
        computed:{
            getOfferById(){
                return this.$store.getters.getOfferById;
            }
        },
        watch:{
            '$route': function () {
                if(this.$route.query.offer !== undefined){
                    this.fetchData()
                }
            },
            getOfferById(offer){
                if(offer !== null){
                    this.offerData = offer;
                    this.openDetailsDialog = true;
                }
            }
        },
        methods: {
            fetchData() {
                this.offerId = this.$route.query.offer;

                this.$store.dispatch('readOfferById',  {offerId: this.offerId})
            },
            closeDetails(){
                this.$router.push('/profile');
                this.openDetailsDialog = false
            }
        },
        mounted() {

             if(this.$route.query.offer !== undefined){
                 this.fetchData()
             }
        }
        //     props: {
    //         value: Boolean
    //     },
    //     computed:{
    //
    //         openDetailsDialog: {
    //             get() {
    //                 return this.value
    //             },
    //             set(value) {
    //                 this.$emit('input', value)
    //             }
    //         },
    // }
    }
</script>

<style scoped>

</style>