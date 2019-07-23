<template>
    <v-container

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



<!--                <template v-slot:activator="{ on }">-->
<!--                    <v-btn  dark-->
<!--                            fixed-->
<!--                            bottom-->
<!--                            right-->
<!--                            fab-->
<!--                            style="margin-bottom: 35px"-->
<!--                            v-on="on"-->

<!--                    >-->
<!--                        <v-icon>add</v-icon>-->
<!--                    </v-btn>-->
<!--                </template>-->




                <v-card>
                    <v-card-title style="background-color: #dcdcdc; ">
                        <span class="headline"><v-icon medium >loyalty</v-icon> Create New Offer</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                <v-select
                                        prepend-icon="party_mode"
                                        v-model="occType"
                                        v-validate="'required:true'"
                                        :error-messages="errors.collect('occasion type')"
                                        :items="occTypeText"
                                        label="Occasion Type"
                                        data-vv-name="occasion type"
                                        placeholder="Select Occasion Type"
                                        :menu-props="{ maxHeight: '150' }"
                                        required
                                        color="black"
                                        autofocus
                                        hide-selected
                                        clearable
                                        open-on-clear
                                ></v-select>
                                </v-flex>
                                <!--the name of offer-->
                                <v-flex xs12>
                                    <v-text-field
                                            outline

                                            v-validate="'required:true'"
                                            :error-messages="errors.collect('Offer Title')"
                                            data-vv-name="Offer Title"

                                            color="black"
                                            label="Offer Title"
                                            v-model="offerTitle"
                                    ></v-text-field>
                                </v-flex>
                                <!--the offer content to define the offer rules to customer-->
                                <v-flex xs12>
                                    <v-text-field
                                            outline

                                            v-validate="'required:true'"
                                            :error-messages="errors.collect('Offer Content')"
                                            data-vv-name="Offer Content"

                                            color="black"
                                            label="Offer Content"
                                            v-model="offerContent"
                                    ></v-text-field>
                                </v-flex>
                                <!--the points of offer to choose-->
                                <v-flex>

                                    <v-flex
                                            shrink
                                            style="width: 170px"
                                    >
                                        <v-text-field
                                                v-model="points"

                                                v-validate="'required:true'"
                                                :error-messages="errors.collect('Offer Points')"
                                                data-vv-name="Offer Points"

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

                                                v-validate="'required:true'"
                                                :error-messages="errors.collect('Number Of Customers')"
                                                data-vv-name="Number Of Customers"

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
                                        <v-subheader class="pl-0">Choose a photo for the offer:</v-subheader>
                                        <v-text-field
                                                style=""
                                                v-model="offerPic"
                                                v-validate="'required:true'"
                                                data-vv-rules="image|size:10000"
                                                :error-messages="errors.collect('Offer Photo')"
                                                data-vv-name="Offer Photo"
                                                prepend-icon="add_photo_alternate"
                                                label="Browse Offer Photo"
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
                                                         class="d-flex fade-transition black darken-2 v-card--reveal display-3 white--text hover-remove-pic"

                                                    >

<!--                                                        <div class="remove-btn">-->
<!--                                                        <v-btn icon depressed  style="max-width: 40px;" color="white" @click="removePic"><v-icon>close</v-icon></v-btn>-->
<!--                                                            <h3 style="font-size: large;">Remove</h3>-->
<!--                                                        </div>-->
                                                    <div class="remove-btn"style="cursor: pointer; max-width: fit-content" @click="startPicking">
                                                        <v-btn icon depressed  style="max-width: 40px;" color="white" ><v-icon>edit</v-icon></v-btn>
                                                        <h3 style="font-size: large;">Change</h3>
                                                    </div>
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
            occType: "",
            occTypeText: [],
            allOcc: '',
            offerTitle: "",
            offerContent: "",
            offerExpDate: new Date().toISOString().substr(0, 10),
            points:5,
            numOfCustomers: 5,

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
        props: {
            value: Boolean
        },
        computed:{
            newOfferDialog: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            },
            user(){
                return this.$store.getters.userStatus;
            },
            firebaseErrorShow(){
                return this.$store.getters.firebaseError;

            },
            firebaseSuccessShow(){
                return this.$store.getters.firebaseSuccesses;
            },
            getAllOccasions(){
                return this.$store.getters.getAllOccasions;
            }

        },
        watch:{
            firebaseSuccessShow(success) {
                // this.newOfferDialog=false;
                // this.firebaseMsg = success;
                // this.snackbarAlert = true;
                // this.btnLoading = false;
                // this.snackbarColor = "success";
                if(success !==null) {
                    ///reseting all inputs
                    this.offerTitle = "";
                    this.offerContent = "";
                    this.offerExpDate = new Date().toISOString().substr(0, 10);
                    this.points = 5;
                    this.numOfCustomers = 5;
                    this.offerPic = '';
                    this.fileSelect = '';
                    this.imagePreview = "";
                }
            },
            firebaseErrorShow(error){
                if(error !== null) {
                    this.firebaseMsg = error;
                    this.snackbarAlert = true;
                    this.btnLoading = false;
                    this.snackbarColor = "error";
                }

            },
            getAllOccasions(occasionsArray){
                if(occasionsArray !== null){
                    this.allOcc = occasionsArray;
                    let data = occasionsArray;
                    for(let i in data) {
                        this.occTypeText.push(data[i].occasionName);
                    }
                }
            },
        },
        mounted(){
            this.$store.dispatch("listenOnAllOccasions");
        },
        methods: {
            startPicking() {
                this.$refs.image.click()
            },
            setImage(e) {
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
            removePic() {
                this.imagePreview = '';
                this.$refs.image.value = '';
                this.offerPic = '';
                this.fileSelect = '';

            },
            startSaveOffer() {


                if (this.showDatePicker === "byDate") {
                    const results = Promise.all([
                        this.$validator.validate('Offer Photo'),
                        this.$validator.validate('Offer Title'),
                        this.$validator.validate('Offer Content'),
                        this.$validator.validate('Offer Points'),
                        this.$validator.validate('occasion type')

                    ]);

                    this.$validator.validateAll(results).then(() => {
                        if (!this.errors.any()) {
                            this.btnLoading = true;

                            let result = this.allOcc.find(data => data.occasionName === this.occType);
                            this.$store.dispatch('addNewOffer', {
                                occasionType: result,
                                offerTitle: this.offerTitle,
                                offerContent: this.offerContent,
                                offerPoints: JSON.parse(this.points),
                                offerExpDate: this.offerExpDate,
                                offerExpNum: null,

                                offerPic: this.fileSelect,
                                picName: this.offerPic

                            });


                        }
                    });
                } else if (this.showDatePicker === "byNumOfCustomers") {
                    const results = Promise.all([
                        this.$validator.validate('Offer Photo'),
                        this.$validator.validate('Offer Title'),
                        this.$validator.validate('Offer Content'),
                        this.$validator.validate('Offer Points'),
                        this.$validator.validate('Number Of Customers'),

                    ]);

                    this.$validator.validateAll(results).then(() => {
                        if (!this.errors.any()) {
                            this.btnLoading = true;

                            let result = this.allOcc.find(data => data.occasionName === this.occType);
                            this.$store.dispatch('addNewOffer', {
                                offerTitle: this.offerTitle,
                                offerContent: this.offerContent,
                                offerPoints: JSON.parse(this.points),
                                offerExpDate: null,
                                offerExpNum: JSON.parse(this.numOfCustomers),

                                offerPic: this.fileSelect,
                                picName: this.offerPic

                            });
                        }
                    });

                }
            },
            cancelOffer() {
                ///reseting all inputs
                this.offerTitle = "";
                this.offerContent = "";
                this.offerExpDate = new Date().toISOString().substr(0, 10);
                this.points = 5;
                this.numOfCustomers = 5;
                this.offerPic = '';
                this.fileSelect = '';
                this.imagePreview = '';

                this.newOfferDialog = false;
                this.btnLoading = false;
                this.$validator.reset();
            }
        }
    }
</script>

<style>

    .hover-remove-pic{
        width: 100%;
        height: 100%;
        float: left;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1000;
        filter: opacity(0.5);
    }
    .remove-btn{
        font-size: small;

        margin: auto;
    }

</style>
