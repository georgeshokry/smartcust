import Vue from "vue"
import App from "./App.vue"
///for app routing
import router from "./router"
///for Vuex
import  { store } from "./store";
////for inputs validation
import VeeValidate from 'vee-validate'
////for firabase Database
import firebase from 'firebase/app'
import 'firebase/firestore'
///for vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import SimpleCrypto from "simple-crypto-js";


Vue.use(Vuetify);
Vue.use(VeeValidate);



////initalizing firebase app
firebase.initializeApp({
    apiKey: "AIzaSyBYocbbQuz3fyp8YCu2LYya-qyycfbg67Y",
    authDomain: "smartcustomer-d9202.firebaseapp.com",
    databaseURL: "https://smartcustomer-d9202.firebaseio.com",
    projectId: "smartcustomer-d9202",
    storageBucket: "smartcustomer-d9202.appspot.com",
    messagingSenderId: "61073239071"
});


Vue.config.productionTip = false;
let app;

const initialize = () => {
    if(!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
};

firebase.auth().onAuthStateChanged(user =>{

   if(user){
       let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
       let simpleCrypto = new SimpleCrypto(_secretKey);
       let chiperUser = simpleCrypto.encrypt(user.uid);

       store.commit('setUserStat', user.uid);
       localStorage.setItem('appData', chiperUser);
   } else{
       let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
       let simpleCrypto = new SimpleCrypto(_secretKey);
       let chiperUser = simpleCrypto.encrypt("No-Didit");

       localStorage.setItem('appData', chiperUser);
       store.commit('setUserStat', null);
   }
   initialize();
});
// new Vue({
//   router,
//     store,
//   render: h => h(App),
//     created(){
//       ////to check the user is logged in or not to prevent unlogged user to route to our app pages
//       this.$store.dispatch('checkUserStat');
//
//     }
// }).$mount("#app");
