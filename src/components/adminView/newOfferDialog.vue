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
            <v-dialog v-model="newOfferDialog"  max-width="500px" scrollable>



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
                        <span class="headline"><v-icon medium >loyalty</v-icon> Create New Offer</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <!--the name of offer-->
                                <v-flex xs12>
                                    <v-text-field
                                            outline
                                            color="black"
                                            label="Offer Title"
                                            v-model="offerTitle"
                                    ></v-text-field>
                                </v-flex>
                                <!--the offer content to define the offer rules to customer-->
                                <v-flex xs12>
                                    <v-text-field
                                            outline
                                            color="black"
                                            label="Offer Content"
                                            v-model="offerContent"
                                    ></v-text-field>
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
                                    <v-divider></v-divider>
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
                                    <v-divider></v-divider>
<!--                                    the pic of offer appears as background for the user-->
                                    <v-flex

                                            xs12
                                    >

                                        <v-text-field
                                                style="margin-top: 15px"
                                                v-model="offerPic"
                                                v-validate="'required:true'"
                                                data-vv-rules="image|size:10000"
                                                :error-messages="errors.collect('Offer Photo')"
                                                data-vv-name="Offer Photo"
                                                prepend-icon="add_photo_alternate"
                                                label="Offer Photo"
                                                color="black"
                                                readonly

                                                @click="startPicking"
                                        >
                                        </v-text-field>
                                        <input
                                                type="file"
                                                style="display: none"
                                                ref="image"
                                                accept="image/*"
                                                @input="setImage"
                                        >
                                        <v-layout row wrap style="justify-content: center;">
                                            <v-hover>
                                                <v-card
                                                        slot-scope="{ hover }"
                                                        class="mx-auto"
                                                        color="grey lighten-4"
                                                        max-width="100%"
                                                >
                                                    <img
                                                    :src="imagePreview"
                                                    height="100%"
                                                    width="100%"
                                                    v-if="imagePreview"/>
                                                <v-expand-transition name="slide">

                                                    <div
                                                            v-if="hover"
                                                         class="d-flex fade-transition black darken-2 v-card--reveal display-3 white--text"
                                                         style="width: 100%; height: 100%"
                                                    >

                                                        <v-btn icon depressed style="font-size: small; max-width: 40px" color="white" @click="removePic"><v-icon>close</v-icon></v-btn>
                                                    </div>
                                                </v-expand-transition>
                                                </v-card>
                                            </v-hover>
                                        </v-layout>
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
        $_veeValidate: {
            validator: 'new',

        },
        data: () => ({
            offerTitle: "",
            offerContent: "",
            offerExpDate: new Date().toISOString().substr(0, 10),
            points:5,
            numOfCustomers: 5,
            newOfferDialog: false,
            datePickerMenu: false,
            showDatePicker: "byDate",
            offerPic: '',
            imagePreview:'',
            fileSelect: '',

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
                this.offerPic='';
                this.fileSelect = '';
            },
            firebaseErrorShow(error){
                this.firebaseMsg = error;
                this.snackbarAlert = true;
                this.btnLoading = false;
                this.snackbarColor = "error";


            }
        },
        methods:{
            startPicking(){
                this.$refs.image.click()
            },
            setImage(e){
                let set = e.target.files;
                this.offerPic = e.target.files[0].name;

///////////start grapping the photo and showing it to admin
                const fr = new FileReader();
                fr.readAsDataURL(set[0]);
                fr.addEventListener('load', () => {
                    this.imagePreview = fr.result;
                    this.fileSelect = set[0];
                })
            },
            removePic(){
                this.imagePreview = '';
                this.$refs.image.value = '';
                this.offerPic = '';
                this.fileSelect = '';

            },
            startSaveOffer(){


                const results = Promise.all([
                    this.$validator.validate('Offer Photo'),

                ]);

                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.btnLoading = true;
                        console.log(this.fileSelect);


                        if (this.showDatePicker === "byDate") {
                            this.$store.dispatch('addNewOffer', {
                                offerTitle: this.offerTitle,
                                offerContent: this.offerContent,
                                offerPoints: this.points,
                                offerExpDate: this.offerExpDate,
                                offerExpNum: null,

                                offerPic: this.fileSelect,
                                picName: this.offerPic

                            });
                        } else if (this.showDatePicker === "byNumOfCustomers") {
                            this.$store.dispatch('addNewOffer', {
                                offerTitle: this.offerTitle,
                                offerContent: this.offerContent,
                                offerPoints: this.points,
                                offerExpDate: null,
                                offerExpNum: this.numOfCustomers,

                                offerPic: this.fileSelect,
                                picName: this.offerPic

                            });
                        }
                    }
                });
            },
            cancelOffer(){
                ///reseting all inputs
                this.offerTitle= "";
                this.offerContent= "";
                this.offerExpDate= new Date().toISOString().substr(0, 10);
                this.points=5;
                this.numOfCustomers= 5;
                this.offerPic='';
                this.fileSelect = '';

                this.newOfferDialog=false;
                this.btnLoading = false;
            }
        }

    }
</script>

<style>

    .v-card--reveal {
        align-items: center;
        bottom: 0;
        text-align: center;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
    }
</style>
