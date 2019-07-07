<template>
    <div>
    <v-dialog
            persistent
            v-model="createResvDialog"
            width="500"
            scrollable

    >


        <v-card >

            <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >forum </v-icon> Create Reservation</span>
            </v-card-title>

            <v-card-text>

                <v-select
                        prepend-icon="party_mode"
                        v-model="occType"
                        v-validate="'required:true'"
                        :error-messages="errors.collect('occasion type')"
                        :items="occTypeText"
                        label="Occasion Type*"
                        data-vv-name="occasion type"
                        placeholder="Select Occasion Type"
                        :menu-props="{ maxHeight: '150' }"
                        required
                        color="black"
                        autofocus
                        @change="viewSelected(occType)"
                        hide-selected
                        clearable
                        open-on-clear
                ></v-select>

                <br>

                <v-textarea
                        prepend-icon="place"
                        v-model="occAddress"
                        v-validate="'required:true'"
                        :error-messages="errors.collect('occasion address')"
                        data-vv-name="occasion address"
                        label="Occasion Address*"
                        placeholder="please type the address in details"
                        hint="حديقة الميريلاند- مصر الجديدة"
                        color="black"
                        required
                        :auto-grow="true"
                        no-resize
                        rows="1"
                ></v-textarea>

                <br>

                <v-layout row wrap>
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
                                v-model="occDate"
                                label="Occasion Date*"
                                prepend-icon="event"
                                readonly
                                shrink
                                style="width: 170px"
                                color="black"
                                v-on="on"
                                v-validate="'required:true'"
                                :error-messages="errors.collect('occasion date')"
                                data-vv-name="occasion date"
                                placeholder="Select Date"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            :min="todayDate"
                            dark
                            v-model="occDate"
                            :first-day-of-week="6"
                            :show-current="true"
                            @input="datePickerMenu = false"
                    >

                            <div class="text--lighten-5" style="color: white;text-align: left;">*You can't make reservation before (2 days) of <br> the occasion</div>

                    </v-date-picker>
                </v-menu>
                    <v-menu

                            v-model="timePickerMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            format="12hr"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                            color="black"
                            @click="timePickerMenu = !timePickerMenu"

                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    prepend-icon="query_builder"
                                    v-model="occTime"
                                    label="Occasion Time*"
                                    readonly
                                    shrink
                                    style="width: 170px"
                                    color="black"
                                    v-on="on"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('occasion time')"
                                    data-vv-name="occasion time"
                                    placeholder="Select Time"
                                    format="12hr"
                            ></v-text-field>
                        </template>
                        <v-time-picker dark format="ampm" v-model="occTime" ></v-time-picker>
                    </v-menu>
                </v-layout>
                <br>
                <v-textarea
                        prepend-icon="comment"
                        v-model="occComment"
                        label="Comment (optional)"
                        placeholder="leave any comment..."
                        color="black"
                        :auto-grow="true"
                        no-resize
                        rows="1"
                ></v-textarea>

                <h6 style="color: red;">*required</h6>
                <v-divider></v-divider>

                <v-card-text>
                   <span class="font-weight-bold">Important: </span>
                    Make sure the phone number you have associated with your account is up-to-date to allow us to contact you.<br>
                    <v-btn outline small @click="openEditPhone">update phone number</v-btn>
                </v-card-text>
<!--                <v-text-field-->
<!--                        v-model="offerId != null"-->
<!--                        label="Email (Can't Edit this field)"-->
<!--                        color="black"-->
<!--                        readonly-->
<!--                        disabled-->
<!--                ></v-text-field>-->




<!--                <v-text-field-->
<!--                        v-model="editLastName"-->
<!--                        v-validate="'required:true'"-->
<!--                        :error-messages="errors.collect('Last Name')"-->
<!--                        label="Last Name"-->
<!--                        data-vv-name="Last Name"-->
<!--                        color="black"-->
<!--                        required-->
<!--                ></v-text-field>-->
<!--                <v-combobox-->
<!--                        v-model="editMartial"-->
<!--                        v-validate="'required:true'"-->
<!--                        :error-messages="errors.collect('Marital Status')"-->
<!--                        :items="maritalSelect"-->
<!--                        label="Marital Status"-->
<!--                        data-vv-name="Marital Status"-->
<!--                        required-->
<!--                        color="black"-->
<!--                ></v-combobox>-->
<!--                <v-text-field-->
<!--                        style="    margin-top: 15px;"-->
<!--                        v-model="editPhone"-->
<!--                        v-validate="'required:true|digits:11'"-->
<!--                        :error-messages="errors.collect('Phone')"-->
<!--                        label="Mobile Number"-->
<!--                        data-vv-name="Phone"-->
<!--                        color="black"-->
<!--                        required-->
<!--                        mask="###-###-###-##"-->
<!--                        prefix="(+2)-"-->
<!--                ></v-text-field>-->
            </v-card-text>

            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-card-actions>
                <v-layout row wrap style="justify-content: flex-end;">
                <v-expand-transition>
                    <v-card-text v-if="occType !== null" style="    padding-top: 0;">


                        <div style="text-align: left">
                            <h4>You have Selected</h4>
                            Occasion Type: {{occType}} <v-icon small>party_mode</v-icon><br>
                            Occasion Price: {{occPrice}} EGP <v-icon small>attach_money</v-icon><br>
                            Occasion Reward Points: {{occPoints}} <v-icon small>stars</v-icon><br>
                        </div>
                    </v-card-text>
                </v-expand-transition>

                <v-spacer></v-spacer>

                <v-btn
                        color="black"
                        flat
                       @click="closeNow"
                >
                    cancel
                </v-btn>
                <v-btn
                        color="black"
                        flat
                        @click="startSendReserv"
                >
                    Send
                </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>

    </v-dialog>
        <v-dialog
                persistent
                v-model="confirmSendDialog"
                width="300"
                content-class="custom-progress-dialog"
        >
            <v-card class="rounded-card">
                <div v-if="sendWait">
                <v-card-title>
                    <v-card-text>
                        <h3>Are you sure to send this reservation?</h3>
                    </v-card-text>
                    <h5><b>Note:</b> you can't cancel the reservation after <b>"Payment Confirmation".</b></h5>
                </v-card-title>

                <v-card-actions style="justify-content: space-between; padding: 20px;">
                    <v-btn
                            color="black"
                            flat
                            @click="confirmSendDialog = false"
                    >
                        cancel
                    </v-btn>
                    <v-btn
                            color="black"
                            dark
                            @click="confirmSendReserv"
                    >
                        confirm
                    </v-btn>
                </v-card-actions>
                </div>
                <v-fade-transition>
                <div v-if="sendConfirmed">
                    <v-layout row wrap style="    justify-content: center; padding: 20px 20px 0 20px">
                        <img style=" max-width: 237px; max-height: 183px; " align="center" src="../../assets/undraw_camera_mg5h.svg">
                        <v-icon size="100px" color="green" class="done-reserve-icon">done</v-icon>
                        <v-card-title>
                            <h4>
                            Reservation Sent Successfully!<br>
                            We will contact you soon!
                            </h4>
                        </v-card-title>
                    </v-layout>
                    <v-card-actions style="justify-content: center">
                        <v-btn
                                color="black"
                                dark
                                @click="doneReservationFinal"
                        >
                            done
                        </v-btn>

                    </v-card-actions>
                </div>
                </v-fade-transition>
            </v-card>
        </v-dialog>
    <edit-profile-dialog :editDialog="editPhone" @closeEditProfileDialog="closeEditProfileDialog"></edit-profile-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "reservationDialog",
        components:{
            editProfileDialog: ()=> import('./editProfileDialog.vue')
        },
        data:()=>{
            return{
                offerChosen:'',

                occType: null,
                occTypeText: [],
                occAddress: '',
                datePickerMenu: false,
                occDate: '',
                todayDate: moment().add(3, 'days').toISOString().substr(0, 10),
                timePickerMenu: false,
                occTime: '',
                occComment: '',

                editPhone: false,


                allOcc: '',


                occPrice:'',
                occPoints:'',
                confirmSendDialog: false,
                sendWait: true,
                sendConfirmed: false,
                sendLoading: false,
            }
        },
        props: {
            createResvDialog:{
                default: false,
                type: Boolean,
            },
            // offerId:{
            //     default: null,
            //     type: String,
            // }
        },
        computed:{
            getAllOccasions(){
                return this.$store.getters.getAllOccasions;
            },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
        },
        watch: {
            getAllOccasions(occasionsArray){
                if(occasionsArray !== null){
                    this.allOcc = occasionsArray;
                    let data = occasionsArray;
                    for(let i in data) {
                        this.occTypeText.push(data[i].occasionName);
                    }
                }
            },
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.sendLoading = false;
                    this.sendWait = false;
                    this.sendConfirmed = true;

                }
            },
            getFirebaseErrors(error){
                if(error !== null){
                    this.sendLoading = false;

                }
            },
        },
        created(){

        },
        methods:{

            openEditPhone(){
                this.$validator.reset();
                this.editPhone = true;
            },
            closeEditProfileDialog(){
                this.editPhone = false;
            },
            closeNow(){

                this.$validator.reset();
                this.$emit('closeNow');
                this.occType = null;
                this.occTypeSelect = [];
                    this.occAddress = '';
                    this.datePickerMenu = false;
                    this.occDate = '';
                    this.timePickerMenu = false;
                    this.occTime = '';
                    this.occComment = '';

            },
            viewSelected(selected){
                if(selected) {
                    let result = this.allOcc.find(data => data.occasionName === selected);
                    this.occType = selected;
                    this.occPrice = result.occasionPrice;
                    this.occPoints = result.occasionPoints;
                }else {
                    this.occType = null;
                    this.occPrice = '';
                    this.occPoints = '';
                }
            },
            startSendReserv(){
                // this.confirmSendDialog = true;


                const results = Promise.all([
                    this.$validator.validate('occasion type'),
                    this.$validator.validate('occasion address'),
                    this.$validator.validate('occasion date'),
                    this.$validator.validate('occasion time'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.confirmSendDialog = true;
                        this.sendLoading = false;
                        this.sendWait = true;
                        this.sendConfirmed = false;
                    }
                });
            },
            confirmSendReserv(){
                this.sendLoading = true;
                let idOfOccasion = this.allOcc.find(data => data.occasionName === this.occType);
                this.$store.dispatch('setNewOrder', {
                    idOfOccasion: idOfOccasion,
                    reservAddress: this.occAddress,
                    reservDate: this.occDate,
                    reservTime: this.occTime,
                });
            },
            doneReservationFinal(){

                this.confirmSendDialog = false;
                this.$emit('closeNow');
                this.sendWait = true;
                this.sendConfirmed =false;
                this.occAddress = '';
                this.datePickerMenu = false;
                this.occDate = '';
                this.todayDate = '';
                this.occTime = '';
                this.occComment = '';

                this.confirmSendDialog = false;
                this.sendLoading = false;
                this.sendWait = true;
                this.sendConfirmed = false;
            }
        },



    }
</script>

<style>
    .rounded-card{
        border-radius: 20px !important;
    }
    .done-reserve-icon{
        top: 105px;
        right: 100px;
        position: absolute;
    }
</style>