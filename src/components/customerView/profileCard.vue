<template>
<!--starting of profile card-->
                    <v-card
                            :tile="true"
                            :elevation="10"
                            max-width="250px"
                            id="rounded-card"


                    >

                        <v-layout row justify-center align-center style="min-height: 263px" v-if="dataLoading" >
                            <v-progress-circular
                                    indeterminate
                                    color="black"
                            ></v-progress-circular>
                        </v-layout>


                        <v-scroll-y-transition >
                            <div v-if="dataLoaded">
<!--                        the edit profile icon with tooltip-->
                        <div class="btn-corner" style="z-index: 1">
                            <v-tooltip left color="black" >
                                <template v-slot:activator="{ on }">
                                    <v-btn flat icon color="black " style="margin: 0" v-on="on" @click="editProfileDialog = true">
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                </template>
                                <span >Edit Profile</span>
                            </v-tooltip>
                        </div>

<!--                        starting of profile avatar-->
                        <div class="avatar" style="z-index: 2">
                        <v-avatar
                                :tile="false"
                                size="70px"
                                color="grey lighten-4"

                        >
                            <img :src="avatarIcon" alt="avatar">
                        </v-avatar>
                        </div>

<!--                        user name and greetings-->
                        <v-card-title
                                primary-title
                                id="card-title"
                        >
                            <div>
                                <span class="headline mb-0">{{ greetings }},<br><span style="text-transform: capitalize;">{{userName}}</span>!</span>

                            </div>
                        </v-card-title>
                                <v-divider class="profile-divider" style="margin-left: 15px; margin-right: 15px"></v-divider>
                        <!--some of user data show here-->
                        <v-content style="text-align: left; padding-left: 16px; padding-bottom: 16px">

                            <v-card-text style="padding: 0">
                                <v-icon>contact_mail </v-icon>
                                {{ userEmail }}
                            </v-card-text>

                            <v-card-text style="padding: 0">
                                <v-icon>contact_phone </v-icon>
                                {{ userPhone }}
                            </v-card-text>

                        </v-content>

                       <!--     starting of editing profile dialog-->
                        <v-dialog
                                v-model="editProfileDialog"
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
                                            prefix="(+2)-"
                                    ></v-text-field>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="black"
                                            flat
                                            @click="editProfileDialog = false"
                                    >
                                        cancel
                                    </v-btn>
                                    <v-btn
                                            color="black"
                                            flat
                                            @click="startSaveEdits"
                                    >
                                        save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-dialog>
                            </div>
                        </v-scroll-y-transition>

                    </v-card>

</template>
<script>

    import avatarMixin from "../mixins/userInfoMixin"
    export default {
        name: 'profilecard',
        components: {},
        mixins: [avatarMixin],
        data: () => {
            return{
                //the loading views show until all data loaded from database
                dataLoading: true,
                dataLoaded: false,

                editProfileDialog: false,
                greetings: '',
                userName: '',
                userEmail:'',
                userPhone: '',
                avatarIcon: '',

                // properties of editor dialog
                editEmail: '',
                editFirstName: '',
                editLastName: '',
                editPhone: '',
                editMartial: '',
                maritalSelect: ["Single", "Engaged", "Married"],
                allDbData: '',
            }
        },
        computed:{
            getData(){
                return this.dataGetted;
            }
        },
        watch:{
            getData(userData){

                if(userData){

                    console.log(this.iconType);
                    this.avatarIcon = this.iconType;
                    this.userName = userData.userFirstName;
                    this.userEmail = userData.userEmail;
                    this.userPhone = userData.userPhone;
                    // starting fill in dialog for editing
                    this.editEmail = userData.userEmail;
                    this.editFirstName = userData.userFirstName;
                    this.editLastName = userData.userLastName;
                    this.editPhone = userData.userPhone;
                    this.editMartial = userData.userMaritalStatus;
                    this.allDbData = userData;

                    ///starting remove progress and show data
                    this.dataLoading =  false;
                    this.dataLoaded =  true;

                }
            },
            getFirebaseSuccess(alert){
                if(alert !== null){
                    this.editProfileDialog = false;
                }
            }

        },
        created(){
            this.greetingsCheck();

        },
        methods:{
            // check the time now to start greeting the user
          greetingsCheck(){
              let timeNow = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
              let dayOrNight = timeNow.split(" ");
              if(dayOrNight[1] === "PM"){
                  this.greetings = "Good Afternoon";
              }else if(dayOrNight[1] === "AM"){
                  this.greetings = "Good Morning";
              }
          },
            startSaveEdits(){

                const results = Promise.all([
                    this.$validator.validate('First Name'),
                    this.$validator.validate('Last Name'),
                    this.$validator.validate('Marital Status'),
                    this.$validator.validate('Phone'),
                ]);
                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
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
    #card-title{
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;
        padding-left: 7px;

    }


</style>
