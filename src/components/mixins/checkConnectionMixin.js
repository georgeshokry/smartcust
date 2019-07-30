export default {
    data: () => {

        return {


            noInternetIcon: false,
            connection: false,
            connectionError: "",
            alertColor: "",
            tickerLocation: 0,
            timeoutInterval: 3000,

        }
    },
    computed: {

        connectionChecker() {

            return this.$store.getters.getConnectionFlag;
        },
    },
    watch: {
        connectionChecker(con) {
            if (con === true) {
                this.timeoutInterval = 3000;
                this.connectionError = "You're back Online!";
                this.alertColor = "success";
                this.noInternetIcon = false;
                this.connection = true;

            } else if (con === false) {
                this.timeoutInterval = 6000;
                this.connectionError = "You're Offline, Check your device connection!";
                this.alertColor = "error";
                this.noInternetIcon = true;
                this.connection = true;
            }
        },

    }
}









