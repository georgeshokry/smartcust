<template>
    <v-container
            fluid grid-list-md
            style=""
    >


        <v-snackbar
                v-model="snackbarAlert"
                :color="snackbarColor"
                :timeout= 10000
        >
            {{ firebaseMsg }}
            <v-btn
                    dark
                    flat
                    @click="snackbarAlert = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <!--        the start of add new offer Dialog-->
        <v-layout row style="    justify-content: flex-end;">
            <v-dialog v-model="newOfferDialog"  max-width="500px">



                <template v-slot:activator="{ on }">
                    <v-btn  dark
                            fixed
                            bottom
                            right
                            fab
                            style="margin-bottom: 35px"
                            v-on="on"

                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>




                <v-card>
                    <v-card-title style="background-color: #dcdcdc; ">
                        <span class="headline"><v-icon medium >star</v-icon> Create New Offer</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <!--the name of offer-->
                                <v-flex xs12>
                                    <v-text-field outline color="black" label="Offer Title" v-model="offerTitle"></v-text-field>
                                </v-flex>
                                <!--the offer content to define the offer rules to customer-->
                                <v-flex xs12>
                                    <v-text-field outline color="black"  label="Offer Content" v-model="offerContent"></v-text-field>
                                </v-flex>
                                <!--the points of offer to choose-->
                                <v-flex>

                                    <v-flex
                                            shrink
                                            style="width: 120px"
                                    >
                                        <v-text-field
                                                v-model="points"
                                                prepend-icon="import_export"
                                                label="Offer Points"
                                                color="black"
                                                type="number"
                                        ></v-text-field>
                                    </v-flex>
                                </v-flex>
                                <!--   How will the offer going to end-->
                                <v-flex xs12>
                                    <v-subheader class="pl-0">Choose How The Offer Going To End:</v-subheader>
                                    <v-radio-group v-model="showDatePicker" :mandatory="false" >
                                        <v-radio color="black" label="By Date" value="byDate"></v-radio>
                                        <v-radio color="black"  label="By Number Of Customers" value="byNumOfCustomers"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <!--the expiration date picker of the offer-->
                                <v-flex xs12>
                                    <v-flex v-if="showDatePicker === 'byDate'"
                                            style="">
                                        <v-menu
                                                v-model="datePickerMenu"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                                color="black"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="offerExpDate"
                                                        label="Expiration Date"
                                                        prepend-icon="event"
                                                        readonly
                                                        shrink
                                                        style="width: 170px"
                                                        color="black"
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker dark v-model="offerExpDate" @input="datePickerMenu = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <!--      the number of customers when reaches the offer end-->
                                    <v-flex
                                            v-if="showDatePicker === 'byNumOfCustomers'"
                                            shrink
                                            style="width: 170px"

                                    >
                                        <v-text-field
                                                v-model="numOfCustomers"
                                                prepend-icon="people"
                                                label="Number Of Customers"
                                                color="black"
                                                type="number"
                                        ></v-text-field>
                                    </v-flex>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  flat @click="cancelOffer">Cancel</v-btn>
                        <v-btn
                                flat @click="startSaveOffer"
                                :loading="btnLoading"
                                :disabled="btnLoading"
                        >Save Offer</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <!--        end of new offer dialog-->

    </v-container>
</template>
<script>

    export default {
        name: 'newOfferDialog',
        components: {},
        data: () => ({
            offerTitle: "",
            offerContent: "",
            offerExpDate: new Date().toISOString().substr(0, 10),
            points:5,
            numOfCustomers: 5,
            newOfferDialog: false,
            datePickerMenu: false,
            showDatePicker: "byDate",
            btnLoading: false,
            firebaseMsg: "",
            snackbarAlert: false,
            snackbarColor: ''
        }),
        computed:{
            user(){
                return this.$store.getters.userStatus;
            },
            firebaseErrorShow(){
                return this.$store.getters.firebaseError;

            },
            firebaseSuccessShow(){
                return this.$store.getters.firebaseSuccesses;
            }

        },
        watch:{
            firebaseSuccessShow(success) {
                this.newOfferDialog=false;
                this.firebaseMsg = success;
                this.snackbarAlert = true;
                this.btnLoading = false;
                this.snackbarColor = "success";

                ///reseting all inputs
                this.offerTitle= "";
                this.offerContent= "";
                this.offerExpDate= new Date().toISOString().substr(0, 10);
                this.points=5;
                this.numOfCustomers= 5;
            },
            firebaseErrorShow(error){
                this.firebaseMsg = error;
                this.snackbarAlert = true;
                this.btnLoading = false;
                this.snackbarColor = "error";


            }
        },
        methods:{
            startSaveOffer(){
                this.btnLoading = true;


                if(this.showDatePicker === "byDate"){
                    this.$store.dispatch('addNewOffer', {
                        offerTitle: this.offerTitle,
                        offerContent: this.offerContent,
                        offerPoints: this.points,
                        offerExpDate: this.offerExpDate,
                        offerExpNum: null

                    });
                }else if(this.showDatePicker === "byNumOfCustomers"){
                    this.$store.dispatch('addNewOffer', {
                        offerTitle: this.offerTitle,
                        offerContent: this.offerContent,
                        offerPoints: this.points,
                        offerExpDate: null,
                        offerExpNum: this.numOfCustomers

                    });
                }


            },
            cancelOffer(){
                ///reseting all inputs
                this.offerTitle= "";
                this.offerContent= "";
                this.offerExpDate= new Date().toISOString().substr(0, 10);
                this.points=5;
                this.numOfCustomers= 5;

                this.newOfferDialog=false;
                this.btnLoading = false;
            }
        }

    }
</script>

<style>

</style>
