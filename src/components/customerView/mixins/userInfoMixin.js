export default {

    data: () => {

        return{
            iconType: "",
            dataGetted: "",
        }
    },
    computed:{
        getUserInfo(){
            return this.$store.getters.getProfileInfoDb;
        }
    },
    watch: {
        getUserInfo(userData) {

            console.log("IAM IN MIXIXN ", userData);
            if (userData) {
                this.dataGetted = userData;
                if (userData.userGender === "Male") {
                  this.iconType = require("@/assets/male-avatar.png");

                } else if (userData.userGender === "Female") {

                   this.iconType = require("@/assets/female-avatar.png");
                }
            }
        }
    }
};