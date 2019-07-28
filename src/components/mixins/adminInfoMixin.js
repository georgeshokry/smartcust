export default {

    data: () => {

        return{
            adminData: '',
            dataLoaded: false
        }
    },
    computed:{
        getAdminProfile(){
            return this.$store.getters.getAdminProfile;
        }
    },
    watch: {
        getAdminProfile(data){
            if (data !== null){
                this.adminData = data;
                this.dataLoaded = true;
            }
        },
    }
};