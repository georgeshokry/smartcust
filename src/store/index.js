import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import SimpleCrypto from "simple-crypto-js";
import moment from "moment";




Vue.use(Vuex);

const boss = "X0P3ELO7GISMdClcAXAj9jaPE4u1";
export const store = new Vuex.Store({

    state:{
        loadingState:true,
        userStat: null,
        firebaseErrors: null,
        userSession: null,
        firebaseSuccess: null,
        allOffersData: null,
        numOfOffers:null,
        connectionFlag: true,
        signupError: "",
        signupUserId: null,
        profileError: "",
        promoCodeMsg: null,
        promoSuccess: false,
        profileInfoDb: null,
        usersMaxPoints: null,
        numberOfUsersOnline:null,
        allOccasions:null,
        maxPointsLevel:null,
        allCustomers:null,
        numOfCustomers:null,
        allCustomerReservations: null,
        allReservStatus: null,
        allAdminReservations: null,
        customerInfoById:null,
        numOfReservations:null,
        offerById: null,
        allPromoCodes: null,
        adminProfile: null,

////to stop any listener during the app after the user logged out
        stopProfileListener: null,
        stopOffersListener: null,
        stopUsersOnlineListener: null,
        stopOccasionsListener:null,
    },
    mutations:{
        setLoadingState(state, payload){
            state.loadingState = payload;
        },
        setError(state, payload){
            state.firebaseErrors = payload;
        },
        clearError(state){
            state.firebaseErrors = null;
        },
        setUserStat(state, payload){
            state.userStat = payload;
        },
        setUserSession(state, payload){
            state.userSession = payload
        },
        setFirebaseSuccess(state, payload){
            state.firebaseSuccess = payload;
        },
        setAllOffers(state, payload){
            state.allOffersData = payload.offers;
            state.numOfOffers = payload.numOfOffers;
        },
        setConnectionFlag(state, payload){
            state.connectionFlag = payload;
        },
        setSignupError(state, payload){
            state.signupError = payload;
        },
        clearSignupError(state){
            state.signupError = "";
        },
        setSignupUserId(state, payload){
            state.signupUserId = payload;
        },
        setProfileError(state, payload){
            state.profileError = payload;
        },
        setPromoCodeMsg(state, payload){
            state.promoCodeMsg = payload;
        },
        setPromoCodeSuccess(state, payload){
            state.promoSuccess = payload;
        },
        setProfileInfoDb(state, payload){
            state.profileInfoDb = payload;
        },
        setUsersMaxPoints(state, payload){
            state.usersMaxPoints = payload;
        },
        setNoOfUsersOnline(state, payload){
            state.numberOfUsersOnline = payload;
        },
        setAllOccasions(state, payload){
            state.allOccasions = payload;
        },
        setMaxPointsLevel(state, payload){
            state.maxPointsLevel = payload;
        },
        setAllCustomers(state, payload){
            state.allCustomers = payload;
        },
        setNumOfCustomers(state, payload){
            state.numOfCustomers = payload;
        },
        setAllCustomerReservations(state, payload){
          state.allCustomerReservations = payload;
        },
        setAllReservStatus(state, payload){
          state.allReservStatus = payload;
        },
        setAllAdminReservations(state, payload){
            state.allAdminReservations = payload;
        },
        setCustomerInfoById(state, payload){
            state.customerInfoById = payload;
        },
        setNumOfReservations(state, payload){
            state.numOfReservations = payload;
        },
        setOfferById(state, payload){
            state.offerById = payload;
        },
        setAdminProfile(state, payload){
            state.adminProfile = payload;
        },


        setProfileListener(state, paylaod){
            state.stopProfileListener = paylaod;
        },
        setOffersListener(state, payload){
            state.stopOffersListener = payload;
        },
        setUsersOnlineListener(state, payload){
            state.stopUsersOnlineListener = payload;
        },
        setOccasionsListener(state, payload){
            state.stopOccasionsListener = payload;
        },
        setAllPromoCodes(state, payload){
          state.allPromoCodes = payload;
        },



////to stop any listener during the app after the user logged out
        stopPeofileListener(state){
            if(state.stopProfileListener !== null) {
                state.stopProfileListener();
            }
        },
        stopOffersListener(state){
            if(state.stopOffersListener !== null) {
                state.stopOffersListener();
            }
        },
        stopUsersOnlineListener(state){
            if(state.stopUsersOnlineListener !== null && typeof state.stopUsersOnlineListener === "function") {
                state.stopUsersOnlineListener();
            }
        },
        stopOccasionsListener(state){
            if(state.stopOccasionsListener !== null) {
                state.stopOccasionsListener();
            }
        }

    },
    actions:{
        checkConnetion({commit}){

            // window.addEventListener('online', () =>
            // commit('setConnectionFlag', true),
            // );
            // window.addEventListener('offline', () =>
            // commit('setConnectionFlag', false),
            // );
            let count = 0;
            firebase.database().ref(".info/connected").on("value", function(snap) {
                if(count >= 1) {
                    if (snap.val() === true) {
                        commit('setConnectionFlag', true);
                    } else {
                        commit('setConnectionFlag', false);
                    }

                }
                count++;
            });
        },
        loginAdmin({commit}, payload){
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((user) => {
                console.log("ADMIN LOGGED IN");
                commit('setUserStat', user.user.uid);
                if(user.user.uid !== boss){
                    firebase.auth().signOut().then((user) => {

                        commit('setUserStat', null);
                        ////encrypt the un id of user before set in localstorage for future login
                        let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
                        let simpleCrypto = new SimpleCrypto(_secretKey);
                        let chiperUser = simpleCrypto.encrypt("No-Didit");

                        localStorage.setItem('appData', chiperUser);

                        commit('setUserSession', null);
                        commit('setError',  "You'r Not Allowed to login To Dashboard!");
                    });

                }

            }).catch((error) => {

                if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                    commit('setError',  "Wrong email or password, Try again!");

                }else if(error.code === "auth/too-many-requests"){
                    commit('setError', "You have Attempted to login many times, Try again later!")
                }
            });

        },

        loginUser({commit}, payload){
            commit('clearError');
            const db = firebase.firestore();
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((user) => {
                commit('setUserStat', user.user.uid);
                console.log("USER LOGGED IN");
                let loginTimeStamp = new Date();
                if (user.user.uid !== boss) {
                    firebase.database().ref().child('usersessions').child(user.user.uid)
                        .update({userActiveState: "online"});
                }
                // let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                // let string_length = 30;
                // let randomstring = '';
                // for (var i=0; i<string_length; i++) {
                //     var rnum = Math.floor(Math.random() * chars.length);
                //     randomstring += chars.substring(rnum,rnum+1);
                // }
                // let loginTimeStamp = new Date();
                // let userId = user.user.uid;
                //
                // let localStoreSession = {
                //
                //         "sessionid": randomstring,
                //         "logintimestamp": loginTimeStamp.toLocaleString()
                //
                // };
                //
                // ///set the user session in database
                // firebase.database().ref().child('usersessions').child(userId).set(localStoreSession).then(function () {
                //
                //     commit('setUserStat', user.user.uid);
                //     localStorage.setItem('appData', user.user.uid);
                //     commit('setUserSession', randomstring);
                //
                // }).catch(function(error) {
                //     console.log(error);
                //     commit('setError', "Problem in Login! " + error);
                // });



            }).catch((error) => {

                if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                    commit('setError',  "Wrong email or password, Try again!");

                }else if(error.code === "auth/too-many-requests"){
                    commit('setError', "You have Attempted to login many times, Try again later!")
                }else if(error.code === "auth/user-disabled"){
                    commit('setError', "This account have been disabled")
                }
            });
        },
        resetCustomerPassword({commit}, payload){
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            firebase.auth().sendPasswordResetEmail(payload).then(function() {
                commit('setFirebaseSuccess', "Check your email inbox!");
            }).catch(function(error) {
                commit('setError', "Wrong E-mail, Double check and try again!");
            });
        },
        updatePassword({commit}, payload){
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            let userEmail = firebase.auth().currentUser.providerData;
            let credential = firebase.auth.EmailAuthProvider.credential(
                userEmail[0].email,
                payload.oldPassword
            );
            firebase.auth().signInWithEmailAndPassword(userEmail[0].email, payload.oldPassword).then((user) => {
                firebase.auth().currentUser.updatePassword(payload.newPassword).then(function() {
                    commit('setFirebaseSuccess', "Password Updated Successfully!");
                }).catch(function(error) {
                    commit('setError', "Problem in Changing password, try again!");
                });
            }).catch(function(error) {
                commit('setError', "Wrong old password,Double check and try again!");
            });
        },
        signupUser({commit}, payload){
            commit('clearSignupError');
            let errorNow = null;
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(function () {
                let userNow = firebase.auth().currentUser.uid;
                console.log(userNow);
                // commit('setSignupUserId', userNow);
            }).catch(function(error) {
                    console.log(error);

                    let errorCode = error.code;
                    if (errorCode === 'auth/email-already-in-use') {
                        console.log(errorCode);
                        errorNow = "This Email already in use, Try Another one!";
                    }else {
                        errorNow = null;
                    }
                }).then(function () {
                commit('setSignupError', errorNow );
            });
        },
        setupUserProfile({commit}, payload){
            const db = firebase.firestore();
            let signedupUserId = firebase.auth().currentUser.uid;
            let loginTimeStamp = new Date();

            let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            let userName= payload.userFirstName.toLowerCase();
            let userNew = userName.replace(/\s/g, '').substr(0,5);

            let string_length;
            console.log(userNew);
            if(userNew.length <= 5){
                string_length= 5*userNew.length ;

            }
            let randomstring = '';
            for (let i=0; i<string_length; i++) {
                let rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }

            let finalString = userNew.concat(randomstring);
            let finalUserCode = finalString.substring(0,10);


            let profileData = {
                userId: signedupUserId,
                userPoints: 0,
                userFirstName: payload.userFirstName,
                userLastName: payload.userLastName,
                userPhone: payload.userPhone,
                userEmail: payload.userEmail,
                userGender: payload.userGender,
                userLastActive: loginTimeStamp.toLocaleString(),
                userAccountCreated: loginTimeStamp.toLocaleString(),
                userMaritalStatus: payload.userMaritalStatus,
                userCode: finalUserCode,
                userRedeemFirstCreate: false,
                userEmailVerified: false
            };
            db.collection("users").doc(signedupUserId).set(profileData).then(function () {
                db.collection("usersPromo").doc("usersCodes").update({[finalUserCode] : signedupUserId}).then(function () {

                    commit('setProfileError', null);
                });

            }).catch(function (error) {
                commit('setProfileError', "Problem in writing profile data: ", error)
            });
        },
        /////redeem promo code and add its points to user profile
        redeemPromoCode({commit}, payload){
            commit('setPromoCodeSuccess', false);
            commit('setPromoCodeMsg', null);
            const db = firebase.firestore();
            // firebase.auth().currentUser.uid;
            let signedupUserId = firebase.auth().currentUser.uid;
            let pointsRef = db.collection("users").doc(signedupUserId);
            let usersRedemsId = "";
            let dateNow = "";
            let promoExpdb = "";
            db.collection("promoCodes").doc(payload.promoId).get().then(function(doc) {
                ////first check the code the user entered if valid or not
                if (doc.exists){
                    //////check if user used this code before or not
                        usersRedemsId = doc.data().usersRedeem;
                        if(!usersRedemsId.includes(signedupUserId)) {
                            dateNow = new Date().toISOString().split("T", 1);
                            promoExpdb = doc.data().Exp;
                            /////check if the code expired or not
                            if(promoExpdb >= dateNow){

                                console.log(doc.data().pointsToAdd);
                                pointsRef.update("userPoints", firebase.firestore.FieldValue.increment(doc.data().pointsToAdd)).then(function () {
                                    usersRedemsId.push(signedupUserId);
                                    db.collection("promoCodes").doc(payload.promoId).update({
                                        usersRedeem: usersRedemsId
                                    }).then(function (){
                                        commit('setPromoCodeSuccess', true);
                                        commit('setPromoCodeMsg', "Congratulations! You won " + doc.data().pointsToAdd + " Points");
                                    });
                                }).catch(function (error) {
                                    commit('setPromoCodeMsg', "Problem in redeeming code!");
                                });

                            }else if(promoExpdb < dateNow){
                                ///here the code expired

                                commit('setPromoCodeMsg', "<b>&nbspWrong&nbsp</b>or<b>&nbspExpired&nbsp</b>Promo Code!");
                            }

                        }else {
                            commit('setPromoCodeMsg', "You have used this<b>&nbspPromo Code&nbsp</b>before!");
                        }


                } else {
                    // doc.data() will be undefined in this case
                    //then start to find the promo code in users promo code but first find if the user redeemed the first create
                    // code or not
                    let enteredCode = payload.promoId;
                    db.collection("usersPromo").doc("usersCodes").get().then(function(code) {
                        ////first check the code the user entered if valid or not

                        let codeData = code.data();

                        console.log(codeData[enteredCode]);
                        // Check whether documentData contains the user id
                        if (codeData.hasOwnProperty(enteredCode)) {
                            //check if the promo code is for the logged in user itself(DON't Be Smart)
                            if(codeData[enteredCode] !== signedupUserId) {
                                // do something
                                db.collection("usersPromo").doc("maxPointsLevel").get().then(function (points) {
                                    pointsRef.get().then(function (checkFirstRedeem) {

                                    if(checkFirstRedeem.data().userRedeemFirstCreate !== true) {

                                        db.collection('users').doc(signedupUserId)
                                            .update("userPoints", firebase.firestore.FieldValue.increment(points.data().maxNewToAdd),"userRedeemFirstCreate", true)
                                            .then(function () {

                                                db.collection('users').doc(codeData[enteredCode])
                                                    .update("userPoints", firebase.firestore.FieldValue.increment(points.data().maxOwnerToAdd))
                                                    .then(function () {
                                                        commit('setPromoCodeSuccess', true);
                                                        commit('setPromoCodeMsg', "Congratulations!"+"<br>"+"You won" +"<b>&nbsp(" + points.data().maxNewToAdd+ ")&nbsp</b>" + "Points");
                                                    });
                                        });
                                    }else {
                                        commit('setPromoCodeMsg', "You have used your first<b>&nbspSmart Code&nbsp</b>before!");
                                    }
                                    });
                                });
                            }else {
                                commit('setPromoCodeMsg', "<b>&nbspWrong&nbsp</b>or<b>&nbspExpired&nbsp</b>Promo Code!");
                            }
                        }else {
                            commit('setPromoCodeMsg', "<b>&nbspWrong&nbsp</b>or<b>&nbspExpired&nbsp</b>Promo Code!");
                        }
                    });
                }

            });

        },
        checkUserStat({commit}){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    commit('setUserStat', user.uid);
                }
            });

        },
        logoutUser({commit}){

                commit('stopPeofileListener');
                // commit('stopOffersListener');
                commit('stopUsersOnlineListener');
                commit('stopOccasionsListener');
            let signedInUserId = firebase.auth().currentUser.uid;
            firebase.database().ref().child('usersessions').child(signedInUserId).update({userActiveState: "offline"}).then(function () {



                firebase.auth().signOut().then((user) => {


                    commit('setUserStat', null);
                    ////encrypt the un id of user before set in localstorage for future login
                    let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
                    let simpleCrypto = new SimpleCrypto(_secretKey);
                    let chiperUser = simpleCrypto.encrypt("No-Didit");

                    localStorage.setItem('appData', chiperUser);

                    commit('setUserSession', null);
                }).catch(function(error) {

                    commit('setError', error);
                });
            });




        },
        userCheck({commit}) {
            let user = firebase.auth().currentUser;
            console.log(user);
            if (user) {
                commit('setUserStat', user.uid);
            }
        },
        /////change the user last login date every time the user logged in
        changeLastLoginState({commit}){
            const db = firebase.firestore();
            let signedupUserId = firebase.auth().currentUser.uid;
            let loginTimeStamp = new Date().toISOString();
            db.collection("users").doc(signedupUserId).update({
                userLastActive : loginTimeStamp,
            });
            firebase.database().ref().child('usersessions').child(signedupUserId).update({userActiveState: "online"});

        },


        changeUserToOffline({commit}){
            let signedupUserId = firebase.auth().currentUser.uid;
            firebase.database().ref().child('usersessions').child(signedupUserId).onDisconnect().update({userActiveState: "offline"});
        },

        ////////////listen to numbers of users online now
        listenToOnlineUsers({commit}){
            commit("setNoOfUsersOnline", null);
            let database = firebase.database().ref().child('usersessions');
            database.on('value', function (snapshot) {
                    let noOfUsers = 0;
                    snapshot.forEach(function (users) {
                        if(users.child("userActiveState").val() === "online") {
                            noOfUsers++;
                        }
                    });
                    commit("setNoOfUsersOnline", noOfUsers);

            });
            commit("setUsersOnlineListener", database);
        },
        getUserSessionDatabase({commit}){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    let userIdNow = firebase.auth().currentUser;
                    ///get the user session by passing uid

                    let database = firebase.database().ref().child('usersessions').child(userIdNow);
                    database.once('value', function (snapshot) {
                        let userSessionId = snapshot.child("sessionid").val();
                        commit('setUserSession', userSessionId);
                    }).catch(function (error) {
                        commit('setError', "Problem in user Auth.");
                    });
                }
            });
        },

        ////add new offer by offer, title, content, expiration type, offer points
        addNewOffer({commit}, payload){
            const db = firebase.firestore();
            const storage = firebase.storage();

            let offerCreatedTimestamp = new Date().toISOString();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            let dataWithExpType;
            if(payload.offerExpDate !== null && payload.offerExpNum === null) {

                dataWithExpType = [{
                    occasionType: payload.occasionType,
                    offerTitle: payload.offerTitle,
                    offerContent: payload.offerContent,
                    offerPoints: payload.offerPoints,
                    userRedeemId: [],
                    offerImgUrl: null,  ////need to make in future
                    offerStatus: "opened",  ////need to make in future
                    offerExpDate: payload.offerExpDate,
                    offerExpNum: null,
                    offerCreatedTimestamp: offerCreatedTimestamp

                }];
            }else if(payload.offerExpDate === null && payload.offerExpNum !== null){
                dataWithExpType = [{
                    occasionType: payload.occasionType,
                    offerTitle: payload.offerTitle,
                    offerContent: payload.offerContent,
                    offerPoints: payload.offerPoints,
                    userRedeemId: [],
                    offerImgUrl: null,
                    offerStatus: "opened",
                    offerExpNum: payload.offerExpNum,
                    offerExpDate: null,
                    offerCreatedTimestamp: offerCreatedTimestamp.toLocaleString()

                }];
            }
            storage.ref().child("offersPic/" + payload.picName).put(payload.offerPic).then(function (snapshot) {
                    snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log(downloadURL);
                        db.collection("offers").add(dataWithExpType[0]).then(function (docRef) {
                            db.collection("offers").doc(docRef.id).update({idOfOffer: docRef.id, offerPic: downloadURL});
                            commit('setFirebaseSuccess', "Offer Published Successfully, Prepare to get Orders Now!");
                        }).catch(function(error) {
                            commit('setError', "Problem in Saving Offer, Try Again!");
                        });
                    });
            }).catch(function (err) {
                commit('setError', "Problem in Saving Photo, Try Again!");
            });
        },
        readOfferById({commit}, payload){
            commit('setError', null);
            const db = firebase.firestore();
            let offer = '';

            let stopOffersListener = db.collection('offers').doc(''+payload.offerId).get().then(function (doc) {
                offer = doc.data();
                commit("setOfferById", offer);
                console.log(offer);
                });
            commit("setOffersListener", stopOffersListener);
        },
        ////////get all offers realtime to view in offers component/////////////
        getAllOffersDatabase({commit}){

            commit('setError', null);
            const db = firebase.firestore();


            let stopOffersListener = db.collection('offers')
                .orderBy('offerCreatedTimestamp', 'desc')
                .onSnapshot(function (querySnapshot) {
                let offers = [];
                querySnapshot.forEach(function (doc) {
                    offers.push({
                        offerPic: doc.data().offerPic,
                        idOfOffer: doc.data().idOfOffer,
                        offerContent: doc.data().offerContent,
                        offerExpDate: moment(doc.data().offerExpDate).fromNow(false),
                        offerExpDateLocalString: doc.data().offerExpDate,
                        offerExpNum: doc.data().offerExpNum,
                        offerPoints: doc.data().offerPoints,
                        offerStatus: doc.data().offerStatus,
                        userRedeemId: doc.data().userRedeemId,
                        offerCreatedTimestamp: moment(doc.data().offerCreatedTimestamp).fromNow(false),
                        offerTitle: doc.data().offerTitle,
                        occasionType: doc.data().occasionType
                    });
                });

                commit("setAllOffers", {"offers": offers});

                offers = [];
            });
            commit("setOffersListener", stopOffersListener);

        },
        listenNumberOfOffers({commit}){
            commit("setAllOffers", {"numOfOffers": null});
            const db = firebase.firestore();
            let stopOffersListener = db.collection('offers').onSnapshot(function (querySnapshot) {
               let offersNumbers = querySnapshot.size;
                commit("setAllOffers", {"numOfOffers": offersNumbers});
            });
            commit("setOffersListener", stopOffersListener);
        },
        /////start to close or open the offer (show to customer or not)
        changeOfferStatus({commit}, payload){
            const db = firebase.firestore();
            db.collection("offers").doc(payload.offerId).get().then(function (status) {
                let offerStatus = status.data().offerStatus;
                if(offerStatus === "opened"){
                    db.collection("offers").doc(payload.offerId).update({offerStatus: "closed"});
                }else if(offerStatus === "closed"){
                    db.collection("offers").doc(payload.offerId).update({offerStatus: "opened"});
                }
            });
        },
        getCustProfileInfo({commit}){
            commit('setProfileInfoDb', null);
            const db = firebase.firestore();
            let userId= this.state.userStat;

           let profileListener = db.collection("users").doc(userId).onSnapshot(function (querySnapshot) {
               let data = querySnapshot.data();
               commit('setProfileInfoDb', data);

            },function (error) {
            });
            commit('setProfileListener', profileListener);
        },
        editCustProfileInfo({commit}, payload){
            commit('setProfileInfoDb', null);
            commit('setFirebaseSuccess', null);
            commit('setError', null);

            const db = firebase.firestore();
            let userId= this.state.userStat;

           let updated =  db.collection("users").doc(userId);
           updated.update({
                "userFirstName": payload.userFirstName,
                "userLastName": payload.userLastName,
                "userPhone": payload.userPhone,
                "userMaritalStatus": payload.userMaritalStatus
            }).then(function () {
                commit('setFirebaseSuccess', "Profile Updated Successfully!");
                console.log("SUCCESS PROFILE UPDATE");
            }).catch(function (error) {
                commit('setError', "Problem in Editing Profile, Try Again! :");
            });
        },
        getMaxPointsUsersCode({commit}){
            commit("setUsersMaxPoints", null);
            const db = firebase.firestore();
            db.collection("usersPromo").doc("maxPointsLevel").get().then(function(level) {
                commit("setUsersMaxPoints", level.data().maxOwnerToAdd);
            });
        },
        addNewOccasionType({commit}, payload){
            const db = firebase.firestore();

            let typeCreatedTimestamp = new Date().toISOString();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            db.collection('occasionTypes').add({
                occasionName: payload.occasionName,
                occasionPrice: payload.occasionPrice,
                occasionPoints: payload.occasionPoints,
                occasionCreatedTimeStamp: typeCreatedTimestamp
            }).then(function (docRef) {
                db.collection("occasionTypes").doc(docRef.id).update({idOfOccasion: docRef.id}).then(function () {
                    commit('setFirebaseSuccess', "Occasion Added Successfully!");
                });
            }).catch(function (error) {
                commit('setError', "Problem in Saving Occasion, Try Again!");
            });
        },
        editOccasionType({commit}, payload){
            const db = firebase.firestore();

            let typeCreatedTimestamp = new Date().toISOString();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            db.collection('occasionTypes').doc(payload.idOfOcc).update({
                occasionName: payload.occasionName,
                occasionPrice: payload.occasionPrice,
                occasionPoints: payload.occasionPoints,
                occasionCreatedTimeStamp: typeCreatedTimestamp,
            }).then(function () {
                commit('setFirebaseSuccess', "Occasion Edited Successfully!");
            }).catch(function () {
                commit('setError', "Problem in Editing Occasion, Try Again!");
            });
        },
        listenOnAllOccasions({commit}){
            const db = firebase.firestore();

            let data = [];
            let stopOccasionsListener = db.collection('occasionTypes')
                .orderBy('occasionPoints', 'desc')
                .onSnapshot(function (querySnapshot) {
                    data = [];
                querySnapshot.forEach(function (doc) {
                    data.push(doc.data());

                });

                commit("setAllOccasions", data);

                    data = [];
            });
            // commit("setOccasionsListener", stopOccasionsListener);


        },
        readMaxPointsLevel({commit}){
            const db = firebase.firestore();
            commit("setMaxPointsLevel", null);

            let stopMaxPointsLevel = db.collection('usersPromo').doc('maxPointsLevel')
                .onSnapshot(function (querySnapshot) {
                    let max = querySnapshot.data();
                    commit("setMaxPointsLevel", max);

                });
        },
        editMaxPointsLevel({commit}, payload){
            const db = firebase.firestore();
            commit('setError', null);
            commit('setFirebaseSuccess', null);

            db.collection('usersPromo').doc('maxPointsLevel').update({
                maxNewToAdd: payload.maxNew,
                maxOwnerToAdd: payload.maxOwner
            }).then(function () {
                    commit('setFirebaseSuccess', "Max Points Edited Successfully!");

            }).catch(function (error) {
                commit('setError', "Problem in Editing Max Points, Try Again!");
            });
        },
        readAllCustomers({commit}){
            let stopMaxPointsLevel;
            const db = firebase.firestore();
            commit("setAllCustomers", null);

            firebase.database().ref().child('usersessions/').on('value',function (session) {
                let customers = [];
                session.forEach(function (querySnapshot) {
                    console.log(querySnapshot.key);
                    let state = querySnapshot.child('userActiveState').val();
                    db.collection('users').doc(''+querySnapshot.key).get().then(function (doc) {
                        let userData = {
                            userActiveState: state,
                            userFirstName: doc.data().userFirstName,
                            userPhone: doc.data().userPhone,
                            userEmail: doc.data().userEmail,
                            userMaritalStatus: doc.data().userMaritalStatus,
                            userPoints: doc.data().userPoints,
                            userLastActive: moment(doc.data().userLastActive).fromNow(false),
                            userCode: doc.data().userCode,
                            userGender: doc.data().userGender
                        };
                            customers.push(userData);


                        });
                        console.log(customers);
                        commit("setAllCustomers", customers);
                    });


                });

        },
        readNumOfCustomers({commit}){
            commit("setNumOfCustomers", null);
            const db = firebase.firestore();
            let stopOffersListener = db.collection('users').onSnapshot(function (querySnapshot) {
                let number = querySnapshot.size;
                commit("setNumOfCustomers", number);
            });
        },
        setNewOrder({commit}, payload){
            let user = firebase.auth().currentUser.uid;
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            let db = firebase.firestore();
            let date = new Date().toISOString();
            ////check if user coming from offer or reservation
            if(payload.reservOfferId !== null){
                /////////check if user points more than offer points FIRST
                let offerSelected = this.state.allOffersData.find(data => data.idOfOffer === payload.reservOfferId);
                if(offerSelected.offerPoints > this.state.profileInfoDb.userPoints && date > offerSelected.offerExpDate){
                    commit('setError', "Sorry, Offer expired!");
                } else if(offerSelected.offerPoints <= this.state.profileInfoDb.userPoints){
                    let orderData = {
                        customerId: user,
                        reservOfferId: payload.reservOfferId,
                        idOfOccasion: payload.idOfOccasion,
                        reservAddress: payload.reservAddress,
                        reservDate: payload.reservDate,
                        reservTime: payload.reservTime,
                        reservStatusId: "status_1",
                        reservCreatedTimeStamp: date,
                        reservPayment: payload.reservPayment,
                        reservComment: payload.reservComment
                    };
                    db.collection("reservations").add(orderData).then(function () {
                        commit('setFirebaseSuccess', "Reservation Sent Successfully!");
                    }).catch(function(error) {
                        commit('setError', "Problem in sending reservation, Try Again!");
                    });
                }

            } else {
                let orderData = {
                    customerId: user,
                    reservOfferId: payload.reservOfferId,
                    idOfOccasion: payload.idOfOccasion,
                    reservAddress: payload.reservAddress,
                    reservDate: payload.reservDate,
                    reservTime: payload.reservTime,
                    reservStatusId: "status_1",
                    reservCreatedTimeStamp: date,
                    reservPayment: payload.reservPayment
                };
                db.collection("reservations").add(orderData).then(function () {
                    commit('setFirebaseSuccess', "Reservation Sent Successfully!");
                }).catch(function(error) {
                    commit('setError', "Problem in sending reservation, Try Again!");
                });
            }


        },
        readNumOfReservations({commit}){
            commit("setNumOfReservations", null);
            const db = firebase.firestore();
            let stopOffersListener = db.collection('reservations').onSnapshot(function (querySnapshot) {
                let number = querySnapshot.size;
                commit("setNumOfReservations", number);
            });
        },
        listenOnAllCustomerReservations({commit}){
            commit('setAllCustomerReservations', null);

            let user = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            let reservations = [];
            let statusNow = '';
            let stopOffersListener = db.collection('reservations')
                .where('customerId', '==', user)
                    .onSnapshot(function (querySnapshot) {

                        querySnapshot.forEach(function (doc) {
                            let statOfReserv = doc.data().reservStatusId;
                            // db.collection('reservStatus').doc(statOfReserv).get().then(function (statType) {
                            //     statusNow = statType.data().state;
                                reservations.push({
                                    idOfOccasion: doc.data().idOfOccasion.occasionName,
                                    reservAddress: doc.data().reservAddress,
                                    reservDate: doc.data().reservDate,
                                    reservTime: doc.data().reservTime,
                                    reservStatusId: doc.data().reservStatusId,
                                    reservCreatedTimeStamp: doc.data().reservCreatedTimeStamp,
                                    idOfReservation: doc.id,
                                    reservOfferId: doc.data().reservOfferId,
                                    reservPayment: doc.data().reservPayment,
                                });

                            // });

                        });

                        commit('setAllCustomerReservations', reservations);
                        reservations = [];
            });
        },
        editReservationStatusToCanceledByCust({commit}, payload){
            let user = firebase.auth().currentUser.uid;
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            let db = firebase.firestore();
            db.collection('reservations').doc(''+payload.idOfReservation).update({"reservStatusId": "status_50"})
                .then(function () {
                    commit('setFirebaseSuccess', "Reservation Canceled Successfully!");
                }).catch(function (error) {
                    commit('setError', "Problem in canceling reservation, Try Again!");
            })
        },
        readAllReservStatus({commit}){
            commit('setAllReservStatus', null);
            const db = firebase.firestore();
            let stopOffersListener = db.collection('reservStatus').get().then(function (status) {
                let arrayOfStatus = [];
                status.forEach(function (data) {
                    arrayOfStatus.push({name: data.data().state, id: data.id})
                });
                commit('setAllReservStatus', arrayOfStatus);
               arrayOfStatus = [];
            });
        },
        listenOnAllAdminReservations({commit}){
            commit('setAllAdminReservations', null);
            const db = firebase.firestore();
            let reservations = [];
            let statusNow = '';
            let stopOffersListener = db.collection('reservations')
                .orderBy('reservDate', 'asc')
                .onSnapshot(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {
                        // db.collection('reservStatus').doc(statOfReserv).get().then(function (statType) {
                        //     statusNow = statType.data().state;
                        reservations.push({
                            idOfOccasion: doc.data().idOfOccasion.occasionName,
                            reservAddress: doc.data().reservAddress,
                            reservDate: doc.data().reservDate,
                            reservTime: doc.data().reservTime,
                            reservStatusId: doc.data().reservStatusId,
                            reservCreatedTimeStamp: doc.data().reservCreatedTimeStamp,
                            idOfReservation: doc.id,
                            customerId: doc.data().customerId,
                            occasionMap: doc.data().idOfOccasion,
                            reservOfferId: doc.data().reservOfferId
                        });

                        // });

                    });

                    commit('setAllAdminReservations', reservations);
                    reservations = [];
                });
        },
        readCustomerInfoById({commit}, payload){
            commit('setCustomerInfoById', null);
            const db = firebase.firestore();
            db.collection('users').doc(payload).get().then(function (statType) {
                commit('setCustomerInfoById', statType.data());
            });
        },
        //////////////////////////////////////////////////still working>>>> after payment confirmed add points to customer
        editReservationStatusByAdmin({commit}, payload){
            console.log(payload)
            let user = firebase.auth().currentUser.uid;
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            let db = firebase.firestore();
            ///////////here the payment confirmed so we want to transfer the points to customer
            if(payload.status === 'status_3'){
                db.collection('reservations').doc(''+payload.idOfReservation).get().then(function (checkOffer) {
                    let offerId = checkOffer.data().reservOfferId;
                    console.log(checkOffer.data())
                        if (offerId) {
                            console.log("FOund offer id");
                            db.collection('offers').doc('' + offerId).get().then(function (offerData) {
                                let offerPoints = offerData.data().offerPoints;
                                db.collection('reservations').doc('' + payload.idOfReservation).update({"reservStatusId": 'status_3'})
                                    .then(function () {
                                        db.collection('users').doc('' + payload.customerId).update("userPoints", firebase.firestore.FieldValue.increment(-offerPoints))
                                            .then(function () {
                                                db.collection('offers').doc(''+offerId).update({"userRedeemId": [payload.customerId]}).then(function () {
                                                    commit('setFirebaseSuccess', "Reservation Status Changed Successfully & Points Applied!");
                                                }).catch(function (error) {
                                                    commit('setError', "Problem in changing reservation status, Try Again!");
                                            });
                                        });
                                    });
                            });
                        }else {
                            console.log("no offer id");
                            db.collection('reservations').doc(''+payload.idOfReservation).get().then(function (reservData) {
                                let occasionPoints = reservData.data().idOfOccasion.occasionPoints;
                                db.collection('reservations').doc('' + payload.idOfReservation).update({"reservStatusId": 'status_3'})
                                    .then(function () {
                                        db.collection('users').doc('' + payload.customerId).update("userPoints", firebase.firestore.FieldValue.increment(occasionPoints))
                                            .then(function () {
                                                commit('setFirebaseSuccess', "Reservation Status Changed Successfully & Points Applied!");
                                            }).catch(function (error) {
                                            commit('setError', "Problem in changing reservation status, Try Again!");
                                        });
                                    });
                            });
                        }
            });
            } else {
                            db.collection('reservations').doc('' + payload.idOfReservation).update({"reservStatusId": payload.status})
                                .then(function () {

                                    commit('setFirebaseSuccess', "Reservation Status Changed Successfully!");
                                }).catch(function (error) {
                                commit('setError', "Problem in changing reservation status, Try Again!");
                            });
                        }


        },
        ////////////////////////create new promo code
        createNewPromoCode({commit}, payload){
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            let db = firebase.firestore();
            let createdDate = new Date().toISOString();
            db.collection('promoCodes').doc(""+payload.promoCode).set({
                "Exp": payload.Exp,
                "pointsToAdd": payload.pointsToAdd,
                "usersRedeem": [],
                "createdTimeStamp": createdDate
                }).then(function () {

                    commit('setFirebaseSuccess', "Promo Code Saved Successfully!");
                }).catch(function (error) {
                commit('setError', "Problem in saving promo code, Try Again!");
            });
        },
        //////////////////////listen on all promo codes
        listenOnPromoCodes({commit}) {
            commit('setAllPromoCodes', null);
            const db = firebase.firestore();

            let stopOffersListener = db.collection('promoCodes')
                .orderBy('Exp', 'desc')
                .onSnapshot(function (querySnapshot) {
                    let codes = [];
                    querySnapshot.forEach(function (doc) {
                        codes.push({
                            promoCode: doc.id,
                            points: doc.data().pointsToAdd,
                            expDated: moment(doc.data().Exp).fromNow(),
                            numOfUsersUsed: doc.data().usersRedeem.length,
                            createdTimeStamp: moment(doc.data().createdTimeStamp).fromNow(),
                        });
                    });
                    commit('setAllPromoCodes', codes);
                });
        },
        readAdminProfile({commit}){
            commit('setAdminProfile', null);
            const db = firebase.firestore();
            let stopOffersListener = db.collection('admin').doc('adminProfile').get().then(function (profile) {
                commit('setAdminProfile', profile.data());
            });
        },
        editAdminProfile({commit}, payload){
            commit('setFirebaseSuccess', null);
            commit('setError', null);
            const db = firebase.firestore();
            db.collection('admin').doc('adminProfile').update({
                "firstName": payload.firstName,
                "lastName": payload.lastName,
                "phone_1": payload.phone_1,
                "phone_2": payload.phone_2,
                "address": payload.address,
                "facebook": payload.facebook,
                "instagram": payload.instagram,
                "twitter": payload.twitter,
                "companyName": payload.companyName
            }).then(function () {

                commit('setFirebaseSuccess', "Profile Saved Successfully!");
            }).catch(function (error) {
                commit('setError', "Problem in saving profile, Try Again!");
            });
        }

    },
    getters:{
        getLoadingState(state){
            return state.loadingState;
        },
        userStatus(state){
            return state.userStat;
        },
        firebaseError(state){
            return state.firebaseErrors;
        },
        firebaseSuccesses(state){
            return state.firebaseSuccess;
        },
        getAllOffersGetter(state){
            return state.allOffersData;
        },
        getNumOfOffers(state){
            return state.numOfOffers;
        },
        getConnectionFlag(state){
            return state.connectionFlag;
        },
        getSignupError(state){
            return state.signupError;
        },
        getProfileError(state){
            return state.profileError;
        },
        getPromoCodeMsg(state){
            return state.promoCodeMsg;
        },
        getPromoSuccess(state){
            return state.promoSuccess;
        },
        getProfileInfoDb(state){
            return state.profileInfoDb;
        },
        getUsersMaxPoints(state){
            return state.usersMaxPoints;
        },
        getNumberOfusersOnline(state){
            return state.numberOfUsersOnline;
        },
        getAllOccasions(state){
            return state.allOccasions;
        },
        getMaxPointsLevel(state){
            return state.maxPointsLevel;
        },
        getAllCustomers(state){
            return state.allCustomers;
        },
        getNumOfCustomers(state){
            return state.numOfCustomers;
        },
        getAllCustomerReservations(state){
            return state.allCustomerReservations;
        },
        getAllReservStatus(state){
            return state.allReservStatus;
        },
        getAllAdminReservations(state){
            return state.allAdminReservations;
        },
        getCustomerInfoById(state){
            return state.customerInfoById;
        },
        getNumOfReservations(state){
            return state.numOfReservations;
        },
        getOfferById(state){
            return state.offerById;
        },
        getAllPromoCodes(state){
            return state.allPromoCodes;
        },
        getAdminProfile(state){
            return state.adminProfile;
        },



    }
});

