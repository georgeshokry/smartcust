import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import SimpleCrypto from "simple-crypto-js";




Vue.use(Vuex);

const boss = "X0P3ELO7GISMdClcAXAj9jaPE4u1";
export const store = new Vuex.Store({

    state:{
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

////to stop any listener during the app after the user logged out
        stopProfileListener: null,
        stopOffersListener: null,
        stopUsersOnlineListener: null,
        stopOccasionsListener:null,
    },
    mutations:{
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
                firebase.database().ref().child('usersessions').child(user.user.uid)
                    .update({userActiveState: "online"});

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
                            dateNow = new Date().toLocaleString().split(",", 1);
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

                                commit('setPromoCodeMsg', "Expired Promo Code!");
                            }

                        }else {
                            commit('setPromoCodeMsg', "You have used this promo code before!");
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
                commit('stopOffersListener');
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
            let loginTimeStamp = new Date();
            db.collection("users").doc(signedupUserId).update({
                userLastActive : loginTimeStamp.toLocaleString(),
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

            let offerCreatedTimestamp = new Date();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            let dataWithExpType;
            if(payload.offerExpDate !== null && payload.offerExpNum === null) {

                dataWithExpType = [{
                    offerTitle: payload.offerTitle,
                    offerContent: payload.offerContent,
                    offerPoints: payload.offerPoints,
                    userIdRedeem: null,
                    offerImgUrl: null,  ////need to make in future
                    offerStatus: "opened",  ////need to make in future
                    offerExpDate: payload.offerExpDate,
                    offerExpNum: null,
                    offerCreatedTimestamp: offerCreatedTimestamp.toLocaleString()

                }];
            }else if(payload.offerExpDate === null && payload.offerExpNum !== null){
                dataWithExpType = [{
                    offerTitle: payload.offerTitle,
                    offerContent: payload.offerContent,
                    offerPoints: payload.offerPoints,
                    userIdRedeem: null,
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

        ////////get all offers realtime to view in offers component/////////////  (((((STILL WORKING ON IT)))))
        getAllOffersDatabase({commit}){

            commit('setError', null);
            const db = firebase.firestore();

            let offerCreatedTimestamp = new Date();

            let stopOffersListener = db.collection('offers')
                .orderBy('offerCreatedTimestamp', 'desc')
                .onSnapshot(function (querySnapshot) {
                let offers = [];
                querySnapshot.forEach(function (doc) {
                    offers.push(doc.data());
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
               commit('setProfileInfoDb', querySnapshot.data());

            },function (error) {
                commit('setError', "Problem in User Profile!");
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

            let typeCreatedTimestamp = new Date();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            db.collection('occasionTypes').add({
                occasionName: payload.occasionName,
                occasionPrice: payload.occasionPrice,
                occasionPoints: payload.occasionPoints,
                occasionCreatedTimeStamp: typeCreatedTimestamp.toLocaleString(),
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

            let typeCreatedTimestamp = new Date();
            commit('setError', null);
            commit('setFirebaseSuccess', null);
            db.collection('occasionTypes').doc(payload.idOfOcc).update({
                occasionName: payload.occasionName,
                occasionPrice: payload.occasionPrice,
                occasionPoints: payload.occasionPoints,
                occasionCreatedTimeStamp: typeCreatedTimestamp.toLocaleString(),
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

                            customers.push({
                                userActiveState: state,
                                userFirstName: doc.data().userFirstName,
                                userPhone: doc.data().userPhone,
                                userEmail: doc.data().userEmail,
                                userMaritalStatus: doc.data().userMaritalStatus,
                                userPoints: doc.data().userPoints,
                                userLastActive: doc.data().userLastActive,
                                userCode: doc.data().userCode,
                                userGender: doc.data().userGender
                            });


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
            let date = new Date();
            let orderData = {
                customerId: user,
                reservOfferId: null,
                idOfOccasion: payload.idOfOccasion,
                reservAddress: payload.reservAddress,
                reservDate: payload.reservDate,
                reservTime: payload.reservTime,
                reservStatusId: "status_1",
                reservCreatedTimeStamp: date
            };
            db.collection("reservations").add(orderData).then(function () {
                commit('setFirebaseSuccess', "Reservation Sent Successfully!");
            }).catch(function(error) {
                commit('setError', "Problem in sending reservation, Try Again!");
            });

        },
        listenOnAllCustomerReservations({commit}){
            commit('setAllCustomerReservations', null);

            let user = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            let reservations = [];
            let statusNow = '';
            let stopOffersListener = db.collection('reservations').where('customerId', '==', user)
                    .onSnapshot(function (querySnapshot) {
                        reservations = [];
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
                                });
                            // });

                        });
                        commit('setAllCustomerReservations', reservations);

            });
        },
        readAllReservStatus({commit}){
            commit('setAllReservStatus', null);
            const db = firebase.firestore();
            let stopOffersListener = db.collection('reservStatus').get().then(function (status) {
                let arrayOfStatus = []
                status.forEach(function (data) {
                    arrayOfStatus.push({name: data.data().state, id: data.id})
                });
                commit('setAllReservStatus', arrayOfStatus);
            });
        }

    },
    getters:{
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
        }


    }
});

