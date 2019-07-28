<template>
    <v-container
            fluid grid-list-md
            style="
            padding-top: 0;
            padding-bottom: 50px;
            height: auto;"
    >

        <page-path></page-path>

            <v-layout row wrap style="    justify-content: space-around;" >

<!--                list of all promo codes-->
                <v-data-iterator
                        :items="codes"
                        :search="searchCodeByType"
                        :loading="dataTabelLoadingCodes"
                        :pagination.sync="paginationCodes"
                        :rows-per-page-items="rows"
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
                            <v-toolbar-title><v-icon larg>star</v-icon> <v-spacer></v-spacer><div class="header-text">Promo Codes</div></v-toolbar-title>
                            <v-divider
                                    class="mx-2"
                                    inset
                                    vertical
                            ></v-divider>

                            <v-btn icon="" color="white" class="black--text" @click="showGenerator = true"><v-icon>add_circle</v-icon></v-btn>

                            <v-spacer></v-spacer>

                            <v-text-field
                                    v-model="searchCodeByType"
                                    append-icon="search"
                                    label="Search Codes by any type"
                                    single-line
                                    hide-details
                                    color="black"
                                    style="    max-width: 240px;"
                                    maxlength="50"
                            ></v-text-field>
                        </v-toolbar>
                    </template>
                    <template v-slot:progress="codes">
                        <v-progress-circular
                                :size="70"
                                :width="7"
                                color="black"
                                indeterminate
                        ></v-progress-circular>
                    </template>

                    <template v-slot:item="props" style="background-color: black">
                        <v-flex
                                xs12
                                sm6

                        >
                            <v-card>
                                <v-card-title style="justify-content: space-between;height: 73px" >
                                    <h4 style="        font-family: monospace;">{{ props.item.promoCode }}</h4><br>

                                    <v-layout v-if="!props.item.expDated.includes('ago')" style="justify-content: flex-end; margin-left: auto;" v-on="on">
                                                <v-btn icon  size="5px" larg color="white" style="margin: 0 0 5px 0;" @click="shareFacebook(props.item.promoCode)" target="_blank">

                                                    <img width="25px" src="../../assets/facebook.svg">
                                                </v-btn>
                                                <v-btn icon size="5px" larg color="white" style="margin: 0 0 5px 0;" @click="shareTweeter(props.item.promoCode)" target="_blank">

                                                    <img width="25px" src="../../assets/twitter.svg">
                                                </v-btn>
                                                <v-btn icon   size="5px" larg color="white" style="margin: 0 0 5px 0;" @click="shareWhatsapp(props.item.promoCode)" target="_blank">

                                                    <img width="25px" src="../../assets/whatsapp.svg">
                                                </v-btn>
                                    </v-layout>

                                </v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Points:</v-list-tile-content>
                                        <v-list-tile-content class="align-end pa-3">{{ props.item.points }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Expiration:</v-list-tile-content>
                                        <v-list-tile-content class="align-end pa-3">{{ props.item.expDated }}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Used By:</v-list-tile-content>
                                        <v-list-tile-content class="align-end pa-3">{{ props.item.numOfUsersUsed }} Customer(s)</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Created:</v-list-tile-content>
                                        <v-list-tile-content class="align-end pa-3">{{ props.item.createdTimeStamp }}</v-list-tile-content>
                                    </v-list-tile>

                                </v-list>
                            </v-card>
                        </v-flex>
                    </template>

                    <template v-slot:no-results>

                        <v-alert :value="true" color="error" icon="warning" style="text-align: left">
                            No results for "{{ searchCodeByType }}" .
                        </v-alert>

                    </template>


                </v-data-iterator>
                <v-divider vertical></v-divider>
                <v-card  elevation="3" width="300" height="fit-content" class="round-card">
                    <v-card-text class=" text-lg-left">
                        <h2>Max Points for Customers*</h2>
                        <h3>New will get:  <b> {{readMaxNew}}</b></h3>
                        <h3>Owner will get:  <b> {{readMaxOwner}}</b></h3>
                        <v-divider  class="ma-2 mx-3" style="margin-bottom: 5px"></v-divider>
                        <h5>*This done when every new customer use another customer's Smart Code after creating a new account for one time only.</h5>
                    </v-card-text>
                    <v-divider  class="mx-3" style="margin-bottom: 5px"></v-divider>
                    <v-btn  dark @click="openEditMaxDialog"> edit</v-btn>
                </v-card>

            </v-layout>
            <v-divider class="mx-1 ma-4"></v-divider>
<!--        list of all occastion types-->
            <v-data-iterator
                    :items="items"
                    :search="searchOccByType"
                    :loading="dataTabelLoading"
                    :pagination.sync="pagination"
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
                        <v-toolbar-title><v-icon larg>collections_bookmark</v-icon> <v-spacer></v-spacer><div class="header-text">Occasions</div></v-toolbar-title>
                        <v-divider
                                class="mx-2"
                                inset
                                vertical
                        ></v-divider>

                        <v-btn icon="" color="white" class="black--text" @click="occasionDialog = true; editOccBtn = false; saveOccBtn = true;"><v-icon>add_circle</v-icon></v-btn>

                        <v-spacer></v-spacer>

                        <v-text-field
                                v-model="searchOccByType"
                                append-icon="search"
                                label="Search Reservations by any type"
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

                <template v-slot:item="props" style="background-color: black">
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
                                    <v-btn icon small @click="editOccasion(props.item.idOfOccasion, props.item.occasionName, props.item.occasionPrice, props.item.occasionPoints )"><v-icon>edit</v-icon></v-btn>
                                </div>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-tile>
                                    <v-list-tile-content>Price:</v-list-tile-content>
                                    <v-list-tile-content class="align-end pa-3">{{ props.item.occasionPrice }}</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>Points:</v-list-tile-content>
                                    <v-list-tile-content class="align-end pa-3">{{ props.item.occasionPoints }}</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>Created/Edited On:</v-list-tile-content>
                                    <v-list-tile-content class="align-end pa-3">{{ props.item.occasionCreatedTimeStamp.split(',', 1).toLocaleString() }}</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                </template>

                <template v-slot:no-results>

                    <v-alert :value="true" color="error" icon="warning" style="text-align: left">
                        No results for "{{ searchOccByType }}" .
                    </v-alert>

                </template>


            </v-data-iterator>
            <v-divider class="mx-1 ma-3"></v-divider>




        <v-dialog
                persistent
                v-model="occasionDialog"
                width="500"
                scrollable
        >


            <v-card>

                <v-card-title style="background-color: #dcdcdc; ">
                    <span class="headline"><v-icon medium >create </v-icon> Add new Occasion</span>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                            v-model="occasionName"
                            v-validate="'required:true|min:5'"
                            :error-messages="errors.collect('Occasion Name')"
                            label="Occasion Name"
                            placeholder="Weeding"
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
                            v-if="editOccBtn"
                            color="black"
                            flat
                            @click="startEditOcc"
                            :loading="btnLoading"
                            :disabled="btnLoading"
                    >
                        edit
                    </v-btn>
                    <v-btn
                            v-if="saveOccBtn"
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

        <v-dialog
                persistent
                v-model="editMaxPoints"
                width="400"
                scrollable
        >


            <v-card>

                <v-card-title style="background-color: #dcdcdc; ">
                    <span class="headline"><v-icon medium >create </v-icon>Edit Max Points</span>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                            v-model="newPoints"
                            v-validate="'required:true'"
                            :error-messages="errors.collect('new points')"
                            label="New Customer Points"
                            data-vv-name="new points"
                            color="black"
                            required
                            type="number"
                    ></v-text-field>
                    <v-text-field
                            v-model="ownerPoints"
                            v-validate="'required:true'"
                            :error-messages="errors.collect('owner points')"
                            label="Owner Customer Points"
                            data-vv-name="owner points"
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
                            @click="editMaxPoints = false"
                    >
                        cancel
                    </v-btn>

                    <v-btn

                            color="black"
                            flat
                            @click="startEditMaxPoints"
                            :loading="btnLoading"
                            :disabled="btnLoading"
                    >
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
        <promoCodeGeneratorDialog v-model="showGenerator"></promoCodeGeneratorDialog>
    </v-container>
</template>

<script>
    import Navbar from "./Navbar";
    import pagePath from "./pagePath"
    import promoCodeGeneratorDialog from "./promoCodeGeneratorDialog";
    export default {
        name: "pointsPlan",
        $_veeValidate: {
            validator: 'new',

        },
        components: {Navbar, pagePath,promoCodeGeneratorDialog},
        data: ()=>{
            return{
                showGenerator: false,
                pagination:{
                rowsPerPage: 3
            },
                paginationCodes:{
                    rowsPerPage: 2
                },
                rows: [2,3,4],
            dataTabelLoading: true,
                searchOccByType: '',
                viewNoData: false,

                occasionDialog:false,
                occasionName: '',
                occasionPrice: 100,
                occasionPoints: 10,
                occasionIdSelected: '',
                saveOccBtn: false,
                editOccBtn: false,

                btnLoading: false,
                readMaxNew: "loading...",
                readMaxOwner: "loading...",

                editMaxPoints: false,
                newPoints: Number,
                ownerPoints: Number,

                items: [],

                codes: [],
                searchCodeByType: '',
                dataTabelLoadingCodes: true,
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
            getMaxPointsLevel(){
                return this.$store.getters.getMaxPointsLevel;
            },
            getAllPromoCodes(){
                return this.$store.getters.getAllPromoCodes;
            }
        },
        watch: {
            getMaxPointsLevel(max){
              if(max !== null){
                  this.readMaxNew = max.maxNewToAdd;
                  this.readMaxOwner = max.maxOwnerToAdd;
              }
            },
            getAllOccasions(occasionsArray){
                if(occasionsArray !== null){
                    this.items = occasionsArray;

                }else {
                    this.viewNoData = true;
                }
                this.dataTabelLoading = false;
            },
            firebaseSuccessShow(success) {
                if(success !==null) {
                    this.editMaxPoints = false;
                    this.occasionDialog = false;
                    this.btnLoading = false;
                    this.occasionName = "";
                    this.occasionPrice = 100;
                    this.occasionPoints = 10;
                    this.$validator.reset();
                }
            },
            firebaseErrorShow(error){
                if(error !== null) {
                    this.btnLoading = false;
                }
            },
            getAllPromoCodes(codes){
                if(codes !== null){
                    this.codes = codes;
                }
                this.dataTabelLoadingCodes = false;
            }

        },
        methods:{
            editOccasion(id, name, price, points){
                this.occasionName = name;
                this.occasionPrice = price;
                this.occasionPoints =points;
                this.occasionIdSelected = id;
                this.editOccBtn = true;
                this.saveOccBtn = false;
                this.occasionDialog = true;
            },
            startEditOcc(){
                const results = Promise.all([
                    this.$validator.validate('Occasion Name'),
                    this.$validator.validate('Price'),
                    this.$validator.validate('Points')
                ]);

                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.btnLoading = true;
                        this.$store.dispatch('editOccasionType',{
                            occasionName: this.occasionName,
                            occasionPrice: JSON.parse(this.occasionPrice),
                            occasionPoints: JSON.parse(this.occasionPoints),
                            idOfOcc: this.occasionIdSelected,
                        });


                    }
                });
            },
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
                            occasionPrice: JSON.parse(this.occasionPrice),
                            occasionPoints: JSON.parse(this.occasionPoints)
                        });


                    }
                });
            },
            openEditMaxDialog(){
                this.newPoints = this.readMaxNew;
                this.ownerPoints = this.readMaxOwner;
                this.editMaxPoints = true;
            },
            startEditMaxPoints(){
                const results = Promise.all([
                    this.$validator.validate('new points'),
                    this.$validator.validate('owner points'),
                ]);

                this.$validator.validateAll(results).then(() => {
                    if (!this.errors.any()) {
                        this.btnLoading = true;
                        this.$store.dispatch('editMaxPointsLevel',{
                            maxNew: JSON.parse(this.newPoints),
                            maxOwner: JSON.parse(this.ownerPoints),
                        });


                    }
                });
            },
            shareFacebook(code){
                let ShareLink =
                    "https://www.facebook.com/sharer/sharer.php?u="
                    + window.location.origin + "/profile"
                    + "?smartCode=" + code;
                window.open(ShareLink);
            },
            shareWhatsapp(code){
                let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if(isMobile){
                    let shareOnMobile =
                        "whatsapp://send?text="
                        + window.location.origin + "/profile"
                        + "?smartCode=" + code;
                    window.open(shareOnMobile);
                }else{
                    let ShareLink =
                        "https://web.whatsapp.com/send?text="
                        + window.location.origin + "/profile"
                        + "?smartCode=" + code;
                    window.open(ShareLink);
                }
            },
            shareTweeter(code){
                let ShareLink =
                    "https://twitter.com/intent/tweet?url="
                    + window.location.origin + "/profile"
                    + "?smartCode=" + code;
                window.open(ShareLink);
            }
        },
        created() {
            this.$store.dispatch('listenOnAllOccasions');
            this.$store.dispatch('readMaxPointsLevel');
            this.$store.dispatch('listenOnPromoCodes');
        }
    }
</script>

<style>
    .round-card{
        border-radius: 20px;
    }
    @media screen and (max-width: 375px) {
        div.header-text {
            font-size: smaller;
            margin-right: 65px;
        }
    }
</style>