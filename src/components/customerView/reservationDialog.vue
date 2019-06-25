<template>
    <v-dialog
            persistent
            v-model="createResvDialog"
            width="500"
            scrollable
    >


        <v-card>

            <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >forum </v-icon> Create Reservation</span>
            </v-card-title>

            <v-card-text>
<!--                <v-text-field-->
<!--                        v-model="offerId != null"-->
<!--                        label="Email (Can't Edit this field)"-->
<!--                        color="black"-->
<!--                        readonly-->
<!--                        disabled-->
<!--                ></v-text-field>-->


<!--                <v-text-field-->
<!--                        v-model="orderType"-->
<!--                        v-validate="'required:true'"-->
<!--                        :error-messages="errors.collect('First Name')"-->
<!--                        label="First Name"-->
<!--                        hint="This name will use in the whole app"-->
<!--                        data-vv-name="First Name"-->
<!--                        color="black"-->
<!--                        required-->
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

            <v-card-actions>
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

                >
                    save
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

    export default {
        name: "reservationDialog",

        data:()=>{
            return{
                offerChosen:'',
                orderType: ''
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
        methods:{
            closeNow(){
                this.$emit('closeNow')

            }
        },
        // computed:{
        //     seeProps(){
        //         return this.createResvDialog;
        //     }
        // },
        // watch: {
        //     seeProps(value) {
        //         this.openClose = value;
        //     }
        // },


    }
</script>

<style scoped>

</style>