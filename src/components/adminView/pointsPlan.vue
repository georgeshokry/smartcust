<template>
    <v-container
            fluid grid-list-md
            style="
            padding-top: 70px;
            padding-bottom: 50px;
            height: auto;"
    >
        <navbar></navbar>
        <page-path></page-path>

        <v-container fluid grid-list-md>
            <v-data-iterator
                    :items="items"
                    :search="searchOccByType"
                    :loading="dataTabelLoading"
                    no-data-text="Loading ...."
                    content-tag="v-layout"
                    row
                    wrap
            >
                <template v-slot:header>
                    <v-toolbar
                            class="mb-2"
                            dark
                            flat
                    >
                        <v-toolbar-title><div class="header-text">Occasions</div></v-toolbar-title>
                        <v-divider
                                class="mx-2"
                                inset
                                vertical
                        ></v-divider>

                        <v-btn icon="" color="white" class="black--text" @click="occasionDialog = true"><v-icon>add_circle</v-icon></v-btn>

                        <v-spacer></v-spacer>

                        <v-text-field
                                v-model="searchOccByType"
                                append-icon="search"
                                label="Search Offers By any type"
                                single-line
                                hide-details
                                color="black"
                                style="    max-width: 300px;"
                                maxlength="50"
                        ></v-text-field>
                    </v-toolbar>
                </template>
                <template v-slot:progress="items">
                    <v-progress-circular
                            :size="70"
                            :width="7"
                            color="black"
                            indeterminate
                    ></v-progress-circular>
                </template>

                <template v-slot:item="props">
                    <v-flex
                            xs12
                            sm6
                            md4
                            lg3
                    >
                        <v-card>
                            <v-card-title  style="justify-content: space-between;">
                                <h4>{{ props.item.occasionName }}</h4>
                                <div>
                                    <v-btn icon small><v-icon>edit</v-icon></v-btn>
                                    <v-btn icon small><v-icon color="red">delete</v-icon></v-btn>
                                </div>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-tile>
                                    <v-list-tile-content>Price:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.occasionPrice }}</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>Points:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.occasionPoints }}</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                </template>

                <template v-slot:no-results>
                    <v-layout row wrap>
                    <v-alert :value="true" color="error" icon="warning">
                        No results for "{{ searchOccByType }}" .
                    </v-alert>
                    </v-layout>
                </template>


            </v-data-iterator>

        </v-container>


        <v-dialog
                persistent
                v-model="occasionDialog"
                width="500"
                scrollable
        >


            <v-card>

                <v-card-title style="background-color: #dcdcdc; ">
                    <span class="headline"><v-icon medium >create </v-icon> Add new Occasion Type</span>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                            v-model="occasionName"
                            v-validate="'required:true|min:5'"
                            :error-messages="errors.collect('Occasion Name')"
                            label="Occasion Name"
                            data-vv-name="Occasion Name"
                            color="black"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="occasionPrice"
                            v-validate="'required:true'"
                            :error-messages="errors.collect('Price')"
                            label="Price"
                            data-vv-name="Price"
                            color="black"
                            required
                            type="number"
                            suffix="EGP"
                    ></v-text-field>
                    <v-text-field
                            v-model="occasionPoints"
                            v-validate="'required:true'"
                            :error-messages="errors.collect('Points')"
                            label="Points"
                            data-vv-name="Points"
                            color="black"
                            required
                            type="number"
                    ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="black"
                            flat
                            @click="occasionDialog = false"
                    >
                        cancel
                    </v-btn>
                    <v-btn
                            color="black"
                            flat
                            @click="startSaveOcc"
                            :loading="btnLoading"
                            :disabled="btnLoading"
                    >
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

    </v-container>
</template>

<script>
    import Navbar from "./Navbar";
    import pagePath from "./pagePath"

    export default {
        name: "pointsPlan",
        $_veeValidate: {
            validator: 'new',

        },
        components: {Navbar, pagePath,},
        data: ()=>{
            return{
                dataTabelLoading: true,
                searchOccByType: '',
                viewNoData: false,

                occasionDialog:false,
                occasionName: '',
                occasionPrice: 100,
                occasionPoints: 10,
                btnLoading: false,


                items: []
            }
        },
        computed:{
            getAllOccasions(){
                return this.$store.getters.getAllOccasions;
            },
            firebaseSuccessShow(){
                return this.$store.getters.firebaseSuccesses;
            },
            firebaseErrorShow(){
                return this.$store.getters.firebaseError;

            },
        },
        watch: {
            getAllOccasions(occasionsArray){
                if(occasionsArray !== null){
                    this.items = occasionsArray;

                }else {
                    this.viewNoData = true;
                }
                this.dataTabelLoading = false;
            },
            firebaseSuccessShow(success) {
                this.occasionDialog = false;
                this.btnLoading = false;
                this.occasionName = "";
                this.occasionPrice= 100;
                this.occasionPoints = 10;
            },
            firebaseErrorShow(error){
                this.btnLoading = false;

            },

        },
        methods:{
            startSaveOcc(){


                const results = Promise.all([
                    this.$validator.validate('Occasion Name'),
                    this.$validator.validate('Price'),
                    this.$validator.validate('Points')
                ]);

                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.btnLoading = true;
                        this.$store.dispatch('addNewOccasionType',{
                            occasionName: this.occasionName,
                            occasionPrice: this.occasionPrice,
                            occasionPoints: this.occasionPoints
                        });


                    }
                });
            }
        },
        created() {
            this.$store.dispatch('listenOnAllOccasions');
        }
    }
</script>

<style>
    @media screen and (max-width: 375px) {
        div.header-text {
            font-size: smaller;
        }
    }
</style>