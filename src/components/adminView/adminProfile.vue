<template>
    <v-container

    >
        <v-dialog v-model="editAdminProfile"  max-width="400px" scrollable>
            <v-card>
                <v-card-title style="background-color: #dcdcdc; ">
                    <span class="headline"> Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md style="margin-top: -10%">
                        <v-card-text >
                        <v-list-tile-avatar size="70" style="justify-content: center">
                            <img src="../../../public/favicon-logo.png">
                        </v-list-tile-avatar>
                        </v-card-text>
                        <v-layout column wrap style="justify-content: center">
                            <v-text-field
                                    v-model="adminData.firstName"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('first Name')"
                                    data-vv-name="first Name"
                                    label="first Name"
                                    color="black"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.lastName"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('last Name')"
                                    data-vv-name="last Name"
                                    label="last Name"
                                    color="black"
                                    required
                            ></v-text-field>
                            <v-btn
                                    small
                                    outline
                                    @click="changePasswordDialog = true"
                            >
                                change password
                            </v-btn>
                            <v-card-title>The following information show to customers profile page</v-card-title>
                            <v-text-field
                                    v-model="adminData.companyName"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('company Name')"
                                    data-vv-name="company Name"
                                    label="Company Name"
                                    color="black"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.email"
                                    label="Email (Can't Edit this field)"
                                    color="black"
                                    hint="This field shows to customers home page"
                                    readonly
                                    disabled
                            ></v-text-field>

                            <v-text-field
                                    v-model="adminData.phone_1"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('phone')"
                                    data-vv-name="phone"
                                    label="Phone"

                                    color="black"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.phone_2"
                                    v-validate="'required:true'"
                                    :error-messages="errors.collect('Alternative Phone')"
                                    data-vv-name="Alternative Phone"
                                    label="Alternative Phone & Payment Method"
                                    hint="like orange cash"
                                    color="black"
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.address"
                                    label="Address (optional)"

                                    color="black"
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.facebook"
                                    label="Facebook page (optional)"

                                    color="black"
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.instagram"
                                    label="Instagram page (optional)"

                                    color="black"
                            ></v-text-field>
                            <v-text-field
                                    v-model="adminData.twitter"
                                    label="Twitter page (optional)"

                                    color="black"
                            ></v-text-field>

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn

                            color="black"
                            flat
                            @click="editAdminProfile = false"
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
        </v-dialog>
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
                            :loading="changeLoading"
                            :disabled="changeLoading"
                            color="black"
                            flat
                            @click="changePassword"
                    >
                        Change
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import adminInfoMixin from '../mixins/adminInfoMixin'
    export default {
        name: "adminProfile",
        mixins: [adminInfoMixin],
        data:() =>{
            return{

                saveLoading: false,
                changeLoading: false,
                changePasswordDialog: false,
                oldPassword: '',
                newPassword: '',
                showPassword: false
            }
        },
        props: {
            value: Boolean
        },
        computed: {

            editAdminProfile: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value);
                    this.$store.dispatch('readAdminProfile');
                }
            },
            getFirebaseSuccess(){
                return this.$store.getters.firebaseSuccesses;
            },
            getFirebaseErrors() {
                return this.$store.getters.firebaseError;
            },

        },
        watch: {

            getFirebaseSuccess(alert) {
                if (alert !== null) {
                    this.changePasswordDialog = false;
                    this.changeLoading = false;
                    this.saveLoading = false;
                }
            },
            getFirebaseErrors(error) {
                if (error !== null) {
                    this.changeLoading = false;
                    this.saveLoading = false;
                }
            },
        },
        mounted() {
            this.$store.dispatch('readAdminProfile');
        },
        methods:{
            startSaveEdits(){
                const results = Promise.all([
                    this.$validator.validate('first Name'),
                    this.$validator.validate('last Name'),
                    this.$validator.validate('phone'),
                    this.$validator.validate('company Name'),
                    this.$validator.validate('Alternative Phone')
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.saveLoading = true;
                        this.$store.dispatch('editAdminProfile', {
                            "firstName": this.adminData.firstName,
                            "lastName": this.adminData.lastName,
                            "companyName": this.adminData.companyName,
                            "phone_1": this.adminData.phone_1,
                            "phone_2": this.adminData.phone_2,
                            "address": this.adminData.address,
                            "facebook": this.adminData.facebook,
                            "instagram": this.adminData.instagram,
                            "twitter": this.adminData.twitter
                        });
                    }
                });
            },
            changePassword(){
                if(this.oldPassword !== '' && this.newPassword !== ''){
                    this.changeLoading = true;
                    this.$store.dispatch('updatePassword', {
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    });
                }
            }
        }
    }
</script>

<style>

</style>