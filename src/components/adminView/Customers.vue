<template>


        <v-container
                fluid grid-list-md
                style="
            padding-bottom: 50px;
            height: auto;"
        >

<page-path></page-path>

            <div>

                <!--            starting of tool bar above the datatabel-->
                <v-toolbar flat  dark>
                    <v-toolbar-title><v-icon larg>people</v-icon> <v-spacer></v-spacer><div class="header-text">All Customers</div></v-toolbar-title>
                    <v-divider
                            class="mx-2"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>

                    <v-text-field
                            v-model="searchCustByTitle"
                            append-icon="search"
                            label="Search Offers By any type"
                            single-line
                            hide-details
                            color="black"
                    ></v-text-field>

                </v-toolbar>

                <!--            starting of offers datatabel-->
                <v-data-table
                        :headers="headers"
                        :items="allCustomers"
                        :loading="dataTabelLoading"
                        :search="searchCustByTitle"
                        class="elevation-1  white--text"
                        color="black"
                        dark
                        no-data-text="Stay Tuned, This Might Take Some Time!"

                >
                    <v-progress-linear v-slot:progress  indeterminate></v-progress-linear>
                    <template v-slot:no-data v-if="viewNoData">

                        <h5 >No Customers yet!</h5>

                    </template>
                    <template v-slot:items="props">
                        <td class="text-xs-left">
                            <div v-if="props.item.userGender === 'Male'" style="display: grid;"><img width="40" src="../../assets/male-avatar.png"></div>
                            <div v-if="props.item.userGender === 'Female'" style="display: grid;"><img width="40" src="../../assets/female-avatar.png"></div>
                        </td>
                        <td class="text-xs-left">
                            <div class="led-yellow-stoped" v-if="props.item.userActiveState === 'offline'"></div>
                            <div class="led-yellow" v-if="props.item.userActiveState === 'online'"></div>
                        </td>
                        <td class="text-xs-left">{{ props.item.userFirstName }}</td>
                        <td class="text-xs-left">{{ props.item.userEmail}}</td>
                        <td class="text-xs-left">{{ props.item.userPhone}}</td>
                        <td class="text-xs-left">{{ props.item.userCode}}</td>
                        <td class="text-xs-left">{{ props.item.userMaritalStatus}}</td>
                        <td class="text-xs-left">{{ props.item.userPoints }}</td>
                        <td class="text-xs-left">{{ props.item.userLastActive }}</td>
                    </template>

                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning" style="text-align: left">
                            No results for "{{ searchCustByTitle }}" .
                        </v-alert>
                    </template>

                </v-data-table>
            </div>
        </v-container>



</template>
<script>

    import Navbar from "./Navbar";
    import pagePath from "./pagePath"
    export default {
        name: 'customers',
        components: {Navbar, pagePath},
        data: () => ({
            dataTabelLoading: true,
            searchCustByTitle:'',
            viewNoData: false,
            idOfOffer: "",
            headers: [
                {text: '', value: 'userGender', sortable: false },
                {text: 'Status', value: 'userActiveState', sortable: true },
                {text: 'Name', value: 'userFirstName', sortable: true},
                {text: 'Email', value: 'userEmail'},
                {text: 'Phone', value: 'userPhone', sortable: false},
                {text: 'Smart Code', value: 'userCode',},
                {text: 'Martial Status', value: 'userMaritalStatus'},
                {text: 'Earned Points', value: 'userPoints'},
                {text: 'Last Login', value: 'userLastActive',},
            ],
            allCustomers: [],

        }),
        computed: {

            getAllCustomers(){

                return this.$store.getters.getAllCustomers;
            }
        },

        watch: {
            getAllCustomers(custArray){
                if(custArray !== null){
                    this.allCustomers = custArray;

                }else {
                    this.viewNoData = true;
                }
                this.dataTabelLoading = false;

            }

        },
        created() {
            this.$store.dispatch('readAllCustomers');
        }
    }
</script>

<style>
    .led-yellow {
        margin: 3px !important;
        width: 25px;
        height: 25px;
        background-color: #09ff00;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #00800c 0 -1px 9px, #00ff13 0 2px 12px;
        -webkit-animation: blinkYellow 1s infinite;
        animation: blinkYellow 1s infinite;
    }


    @keyframes blinkYellow {
        from { background-color: #09ff00; }
        50% { background-color: #00aa2c; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #00800c 0 -1px 9px, #00ff13 0 0px 0; }
        to { background-color: #00ff1f; }
    }

    .led-yellow-stoped{
        margin: 3px !important;
        width: 25px;
        height: 25px;
        background-color: #00800c;
        border-radius: 50%;

    }

</style>
