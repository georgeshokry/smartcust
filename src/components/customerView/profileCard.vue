<template>
<!--starting of profile card-->
                    <v-card
                            :tile="true"
                            :elevation="10"
                            max-width="250px"
                            id="rounded-card"


                    >

                        <loading-data-progress v-if="dataLoading"/>

                        <v-scroll-y-transition >
                            <div v-if="dataLoaded">
<!--                        the edit profile icon with tooltip-->
                        <div class="btn-corner">
                            <v-tooltip left color="black" >
                                <template v-slot:activator="{ on }">
                                    <v-btn flat icon color="black " style="margin: 0" v-on="on" @click="openEditProfileDialogNow">
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                </template>
                                <span >Edit Profile</span>
                            </v-tooltip>
                        </div>

                                <div style="padding-top: 20px">
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
                                style="margin-bottom: 10px"
                        >
                            <div>
                                <span class="headline mb-0">{{ greetings }},<br><span style="text-transform: capitalize;">{{userName}}</span>!</span>

                            </div>
                        </v-card-title>
<!--                                <v-divider class="profile-divider pa-2"  style="margin-left: 15px; margin-right: 15px"></v-divider>-->
                        <!--some of user data show here-->
                        <v-content style="text-align: center; padding-left: 16px; padding-bottom: 16px; padding-right: 16px">
<!--                            <div style="font-weight: 600; text-align: center">Profile</div>-->
<!--                            <v-icon small>contact_mail </v-icon><br>-->
<!--                            {{ userEmail }}<br>-->
<!--                            <v-icon small>contact_phone </v-icon><br>-->
<!--                            {{ userPhone }}-->
                        </v-content>


                            </div>
                            </div>
                        </v-scroll-y-transition>
<edit-profile-dialog :editDialog="EditProfileDialog" @closeEditProfileDialog="closeEditProfileDialog"></edit-profile-dialog>
                    </v-card>

</template>
<script>
    import loadingDataProgress from './loadingDataProgress.vue';
    import avatarMixin from "../mixins/userInfoMixin"
    import moment from 'moment';
    export default {
        name: 'profilecard',
        components: {
            loadingDataProgress,
            editProfileDialog: ()=> import('./editProfileDialog.vue')
        },
        mixins: [avatarMixin],
        data: () => {
            return{
                //the loading views show until all data loaded from database
                dataLoading: true,
                dataLoaded: false,
                EditProfileDialog: false,

                greetings: '',
                userName: '',
                userEmail:'',
                userPhone: '',
                avatarIcon: '',


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

                    this.avatarIcon = this.iconType;
                    this.userName = userData.userFirstName;
                    this.userEmail = userData.userEmail;
                    this.userPhone = userData.userPhone;


                    ///starting remove progress and show data
                    this.dataLoading =  false;
                    this.dataLoaded =  true;

                }
            },

        },
        created(){
            this.greetingsCheck();

        },
        methods:{
            openEditProfileDialogNow(){
                this.EditProfileDialog = true;
            },
            closeEditProfileDialog(){
                this.EditProfileDialog = false;
            },
            // check the time now to start greeting the user
          greetingsCheck(){
              let timeNow = moment().format('LT').replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
              let dayOrNight = timeNow.split(" ");
              if(dayOrNight[1] === "PM"){
                  this.greetings = "Good Afternoon";
              }else if(dayOrNight[1] === "AM"){
                  this.greetings = "Good Morning";
              }
          },

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
        margin-left: 207px !important;
        text-align: right;
        padding-bottom: 7px;
        padding-left: 7px;
        z-index: 1;
        position: absolute

    }


</style>
