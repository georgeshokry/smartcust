<template>
    <!--     starting of editing profile dialog-->
    <v-dialog
            persistent
            v-model="editDialog"
            width="500"
            scrollable
    >


        <v-card>

            <v-card-title style="background-color: #dcdcdc; ">
                <span class="headline"><v-icon medium >create </v-icon> Edit Profile</span>
            </v-card-title>

            <v-card-text>
                <v-text-field
                        v-model="editEmail"
                        label="Email (Can't Edit this field)"
                        color="black"
                        readonly
                        disabled
                ></v-text-field>
                <v-text-field
                        v-model="editFirstName"
                        v-validate="'required:true'"
                        :error-messages="errors.collect('First Name')"
                        label="First Name"
                        hint="This name will use in the whole app"
                        data-vv-name="First Name"
                        color="black"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="editLastName"
                        v-validate="'required:true'"
                        :error-messages="errors.collect('Last Name')"
                        label="Last Name"
                        data-vv-name="Last Name"
                        color="black"
                        required
                ></v-text-field>
                <v-combobox
                        v-model="editMartial"
                        v-validate="'required:true'"
                        :error-messages="errors.collect('Marital Status')"
                        :items="maritalSelect"
                        label="Marital Status"
                        data-vv-name="Marital Status"
                        required
                        color="black"
                ></v-combobox>
                <v-text-field
                        style="    margin-top: 15px;"
                        v-model="editPhone"
                        v-validate="'required:true|digits:11'"
                        :error-messages="errors.collect('Phone')"
                        label="Mobile Number"
                        data-vv-name="Phone"
                        color="black"
                        required
                        mask="###-###-###-##"
                        prefix="(+02)-"
                ></v-text-field>

                <v-btn
                        small
                        outline
                        @click="changePasswordDialog = true; editDialog = false"
                >
                    change password
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn

                        color="black"
                        flat
                        @click="closeEditProfileDialog"
                >
                    cancel
                </v-btn>
                <v-btn
                        :loading="saveLoading"
                        :disabled="saveLoading"
                        color="black"
                        flat
                        @click="startSaveEdits"
                >
                    save
                </v-btn>

            </v-card-actions>
        </v-card>
        <v-dialog
                v-model="changePasswordDialog"
                max-width="400px"
                persistent
        >
            <v-card>
                <v-card-text>
                    <v-layout column wrap>
                        <v-card-text class="headline">
                            Change Password
                        </v-card-text>
                        <v-text-field
                                v-model="oldPassword"
                                label="Old Password"
                                color="black"
                                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="[showPassword = !showPassword]"
                        ></v-text-field>
                        <v-text-field
                                v-model="newPassword"
                                label="Create New Password"
                                color="black"
                                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="[showPassword = !showPassword]"
                        ></v-text-field>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn

                            color="black"
                            flat
                            @click="changePasswordDialog = false"
                    >
                        cancel
                    </v-btn>
                    <v-btn
                            :loading="saveLoading"
                            :disabled="saveLoading"
                            color="black"
                            flat
                            @click="changePassword"
                    >
                        Change
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-dialog>
</template>

<script>
    import avatarMixin from "../mixins/userInfoMixin"
    export default {
        name: "editProfileDialog",
        components: {

        },
        mixins: [avatarMixin],
        data:()=>{
            return{
                // properties of editor dialog
                editEmail: '',
                editFirstName: '',
                editLastName: '',
                editPhone: '',
                editMartial: '',
                maritalSelect: ["Single", "Engaged", "Married"],
                allDbData: '',

                saveLoading: false,

                changePasswordDialog: false,
                oldPassword: '',
                newPassword: '',
                showPassword: false,
            }
        },
        props: {
            editDialog: {
                default: false,
                type: Boolean,
            },
        },
        computed:{
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },
            getData(){
                return this.dataGetted;
            }
        },
        watch:{
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.$emit('closeEditProfileDialog');
                    this.saveLoading = false;
                    this.changePasswordDialog = false;
                }
            },
            getFirebaseErrors(error){
                if(error !== null){
                    this.saveLoading = false;
                }
            },
            getData(userData) {
                if (userData !== null) {
                    // starting fill in dialog for editing
                    this.editEmail = userData.userEmail;
                    this.editFirstName = userData.userFirstName;
                    this.editLastName = userData.userLastName;
                    this.editPhone = userData.userPhone;
                    this.editMartial = userData.userMaritalStatus;
                    this.allDbData = userData;
                }
            }
        },
        methods:{
            startSaveEdits(){

                const results = Promise.all([
                    this.$validator.validate('First Name'),
                    this.$validator.validate('Last Name'),
                    this.$validator.validate('Marital Status'),
                    this.$validator.validate('Phone'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.saveLoading = true;
                        if(
                            this.editFirstName !== this.allDbData.userFirstName ||
                            this.editLastName !== this.allDbData.userLastName ||
                            this.editPhone !== this.allDbData.userPhone ||
                            this.editMartial !== this.allDbData.userMaritalStatus
                        ) {

                            this.$store.dispatch('editCustProfileInfo', {
                                userFirstName: this.editFirstName,
                                userLastName: this.editLastName,
                                userPhone: this.editPhone,
                                userMaritalStatus: this.editMartial,
                            });
                        }

                    }
                });
            },
            closeEditProfileDialog(){
                this.$emit('closeEditProfileDialog');

            },
            changePassword(){
                if(this.oldPassword !== '' && this.newPassword !== ''){
                    this.saveLoading = true;
                    this.$store.dispatch('updatePassword', {
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>