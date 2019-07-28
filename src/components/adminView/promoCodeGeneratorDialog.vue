<template>
    <v-container

    >
    <v-dialog v-model="promoCodeGeneratorDialog"  max-width="400px" scrollable>
        <v-card>
            <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >star</v-icon> Create New Promo Code</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md style="margin-top: -10%">
                    <v-layout column wrap>

                            <div >
                                <v-card-text  ><h2 >Generated Code</h2></v-card-text>
                            <h3 style="background-color: grey; color: white;        font-family: monospace;">{{finalCode}}</h3>
                            </div>
                            <br>
                        <v-flex xs7 sm6>
                            <v-text-field
                                    v-model="userGenerator"
                                    outline
                                    clearable
                                    maxlength="10"
                                    color="black"
                                    label="Create Code"
                                    counter
                                    hint="Maximum Characters: 10"
                                    v-on:keyup="generateCode(userGenerator)"
                            ></v-text-field>
                        </v-flex>
                        <h3>- OR -</h3>
                        <v-flex xs7 sm6>
                        <v-btn outline  @click="randomGeneratorCode()">Generate Randomly!</v-btn>
                        </v-flex>
                        <br>
                        <v-flex
                                shrink
                                xs7 sm6
                        >
                            <v-text-field
                                    v-model="points"
                                    outline
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('Code Points')"
                                    data-vv-name="Code Points"

                                    label="Code Points"
                                    color="black"
                                    type="number"
                            ></v-text-field>

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
                                            v-model="codeExpDate"
                                            label="Expiration Date"
                                            readonly
                                            outline
                                            color="black"
                                            v-validate="'required:true'"
                                            :error-messages="errors.collect('code exp date')"
                                            data-vv-name="code exp date"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        :min="todayDate"
                                        dark
                                        v-model="codeExpDate"
                                        :first-day-of-week="6"
                                        :show-current="true"
                                        @input="datePickerMenu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>


                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  flat @click="promoCodeGeneratorDialog = false">Cancel</v-btn>
                <v-btn
                        flat
                        :loading="btnLoading"
                        :disabled="btnLoading"
                        @click="startSaveCode"
                >Save Code</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </v-container>
</template>

<script>

    export default {
        name: "promoCodeGeneratorDialog",
        $_veeValidate: {
            validator: 'new',
        },
        data:()=>{
            return{
                btnLoading: false,
                finalCode: '',
                userGenerator: '',
                points: 10,
                todayDate: new Date().toISOString().substr(0, 10),
                codeExpDate: '',
                datePickerMenu: false,

            }
        },
        props: {
            value: Boolean
        },
        computed:{

            promoCodeGeneratorDialog: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
        },
        watch:{
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.btnLoading = false;
                    this.$emit('input', false);
                    this.$validator.reset();
                }
            },
            getFirebaseErrors(error){
                if(error !== null){
                    this.btnLoading = true;
                }
            },
        },
        created(){
            this.firstGnerator();
        },
        methods:{
            firstGnerator(){
                let prefix = "photo";
                this.generateCode(prefix);
            },
            generateCode(pre){
                let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                let firstPart = pre.replace(/\s/g, '');

                let string_length;
                if(firstPart.length <= 10){
                    string_length= 10*firstPart.length ;

                }
                let randomstring = '';
                for (let i=0; i<string_length; i++) {
                    let rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum,rnum+1);
                }

                let finalString = firstPart.concat(randomstring);
                let finalCode = finalString.substring(0,10);
                this.finalCode = finalCode;
            },
            randomGeneratorCode(){
                let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

                let randomstring = '';
                for (let i=0; i<10; i++) {
                    let rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum,rnum+1);
                }
                this.finalCode = randomstring;
            },
            startSaveCode(){
                if(this.finalCode !== '') {
                    const results = Promise.all([
                        this.$validator.validate('Code Points'),
                        this.$validator.validate('code exp date'),
                    ]);
                    this.$validator.validateAll(results).then(() => {
                        if (!this.errors.any()) {
                            this.btnLoading = true;
                            this.$store.dispatch('createNewPromoCode', {
                                promoCode: this.finalCode,
                                Exp: this.codeExpDate,
                                pointsToAdd: this.points,
                            });
                        }
                    });
                }
            }
        },

    }
</script>

<style >

</style>