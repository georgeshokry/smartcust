(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c8d49350"],{2501:function(e,t,r){},"324b":function(e,t,r){e.exports=r.p+"img/undraw_done_a34v.97d8a398.svg"},"54d1":function(e,t,r){"use strict";var a=r("6266"),s=r.n(a);s.a},"5fb7":function(e,t,r){e.exports=r.p+"img/caveman.fec61876.gif"},6266:function(e,t,r){},6376:function(e,t,r){e.exports=r.p+"img/undraw_happy_birthday_s72n.6c360894.svg"},"9d8d":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{staticStyle:{"border-radius":"10px"},attrs:{persistent:"","max-width":"700px"},model:{value:e.noInternetIcon,callback:function(t){e.noInternetIcon=t},expression:"noInternetIcon"}},[a("v-card",{staticStyle:{"border-radius":"10px"}},[a("v-card-text",{staticClass:"headline font-weight-bold",staticStyle:{"background-color":"#f0f4f7"}},[a("div",{staticStyle:{color:"red"}},[e._v("You are Offline! :(")]),a("v-responsive",[a("img",{attrs:{width:"300px",src:r("5fb7")}})]),a("div",[e._v("Please check your device connection to continue")])],1),a("v-card-text",{staticClass:"bottom-text"},[a("h3",[e._v("You don't need to refresh the page")])])],1)],1)},s=[],o=r("302f"),i={name:"annoyingNoInternet",mixins:[o["a"]],data:function(){return{}}},n=i,l=(r("ce23"),r("2877")),c=Object(l["a"])(n,a,s,!1,null,null,null);t["a"]=c.exports},a9fc:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",{staticStyle:{"padding-top":"0px","padding-bottom":"75px","text-align":"-webkit-center",height:"100vh"},attrs:{fluid:"","grid-list-md":""}},[a("v-flex",{staticStyle:{"justify-content":"center","margin-left":"0%"},attrs:{"d-flex":"",xs12:"",sm6:"","offset-sm3":""}},[a("v-layout",{staticStyle:{margin:"10%","justify-content":"center"},attrs:{row:"",wrap:""}},[a("v-card",{staticStyle:{"border-radius":"20px"},attrs:{width:"100%",elevation:"20"}},[a("v-responsive",{attrs:{position:"top"}},[a("v-img",{attrs:{src:"https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser1.png?alt=media&token=245212ee-6aa3-49ef-8564-7fe2cbc18513","lazy-src":"https://firebasestorage.googleapis.com/v0/b/smartcustomer-d9202.appspot.com/o/logo-teaser-photos%2Fteaser1.png?alt=media&token=245212ee-6aa3-49ef-8564-7fe2cbc18513","aspect-ratio":"2.55"}})],1),a("v-card-title",{staticStyle:{"justify-content":"center"}},[a("div",[a("h3",{staticClass:"headline mb-0"},[e._v("Sign-in to Profile")])])]),a("v-card-text",{staticStyle:{"max-width":"350px"}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{"error-messages":e.errors.collect("email"),disabled:e.custLoading,"data-vv-name":"email",label:"E-mail",color:"black",required:"",box:"",clearable:"","prepend-inner-icon":"account_box",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.loginNow(t)}},model:{value:e.custEmail,callback:function(t){e.custEmail=t},expression:"custEmail"}}),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("password"),disabled:e.custLoading,label:"Password","data-vv-name":"password","append-icon":e.custshowPassword?"visibility":"visibility_off",type:e.custshowPassword?"text":"password",box:"",color:"black",clearable:"","prepend-inner-icon":"lock",autofocus:""},on:{"click:append":function(t){e.custshowPassword=!e.custshowPassword},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.loginNow(t)}},model:{value:e.custPassword,callback:function(t){e.custPassword=t},expression:"custPassword"}}),a("h4",[a("a",{staticStyle:{color:"black"},on:{click:function(t){t.stopPropagation(),e.signupDialog=!0}}},[e._v("Don't Have Account? Create One Now!")])])],1),a("v-alert",{staticClass:"custom-alert",attrs:{value:e.custAlert,type:"error",color:"red",transition:"scale-transition"}},[e._v("\n                        "+e._s(e.errMsg)+"\n                    ")]),a("v-card-actions",{staticStyle:{"justify-content":"center"}},[e.btnCustShow?a("v-btn",{staticClass:"white--text",attrs:{loading:e.custLoading,disabled:e.custLoading,color:"black"},on:{click:e.loginNow}},[e._v("login")]):e._e()],1)],1)],1)],1),a("v-dialog",{attrs:{persistent:"","max-width":"700px"},model:{value:e.signupDialog,callback:function(t){e.signupDialog=t},expression:"signupDialog"}},[a("v-stepper",{model:{value:e.creatingStepper,callback:function(t){e.creatingStepper=t},expression:"creatingStepper"}},[e.creatingStepper<=1?a("v-btn",{staticStyle:{"margin-left":"88%",padding:"1%"},attrs:{icon:""},on:{click:e.cancelCreatingDialog}},[a("v-icon",[e._v("close")])],1):e._e(),a("v-stepper-header",[a("v-stepper-step",{attrs:{color:"black",complete:e.creatingStepper>1,step:"1"}},[e._v("Account Info")]),a("v-divider"),a("v-stepper-step",{attrs:{color:"black",complete:e.creatingStepper>2,step:"2"}},[e._v("Profile Info")]),a("v-divider"),a("v-stepper-step",{attrs:{color:"black",complete:e.creatingStepper>3,step:"3"}},[e._v("Points Code "),a("small",[e._v("(Optional)")])]),a("v-divider"),a("v-stepper-step",{attrs:{color:"black",step:"4"}},[e._v("Account Created")])],1),a("v-stepper-items",[a("v-stepper-content",{attrs:{step:"1"}},[a("v-card",{attrs:{elevation:"0",height:"auto"}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{"error-messages":e.errors.collect("Email"),label:"E-mail*","data-vv-name":"Email",color:"black",required:"",autofocus:""},model:{value:e.createEmail,callback:function(t){e.createEmail=t},expression:"createEmail"}}),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,regex:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"},expression:"{required:true,regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'}"}],ref:"createPassword",attrs:{"error-messages":e.errors.collect("create Password"),placeholder:"ex: Ex@pass0rd20",hint:"Password must be at least 8 characters & contain (uppercase, lowercase, numbers and symbols)","data-vv-name":"create Password",color:"black",label:"Create Password*",counter:"true","append-icon":e.createShowPass?"visibility":"visibility_off",type:e.createShowPass?"text":"password"},on:{"click:append":function(t){e.createShowPass=!e.createShowPass,e.createShowRePass=!e.createShowRePass}},model:{value:e.createPassword,callback:function(t){e.createPassword=t},expression:"createPassword"}}),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required:true|confirmed:createPassword",expression:"'required:true|confirmed:createPassword'"}],attrs:{"error-messages":e.errors.collect("Re-Enter Password"),"data-vv-name":"Re-Enter Password",color:"black",label:"Re-Enter Password*",type:e.createShowRePass?"text":"password"},model:{value:e.createRePassword,callback:function(t){e.createRePassword=t},expression:"createRePassword"}}),a("h6",{staticStyle:{color:"red"}},[e._v("*required")]),a("v-alert",{attrs:{value:e.signupAlert,type:"error",color:"red",transition:"scale-transition"}},[e._v("\n                                "+e._s(e.signupErrorMsg)+"\n                            ")])],1),a("v-card-actions",{staticStyle:{"justify-content":"flex-end"}},[a("v-btn",{staticClass:"white--text",attrs:{loading:e.signupLoading,disabled:e.signupLoading,color:"black"},on:{click:e.getAccountInfo}},[e._v("\n                            Continue\n                        ")])],1)],1),a("v-stepper-content",{attrs:{step:"2"}},[a("v-card",{attrs:{elevation:"0",height:"auto"}},[a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required:true",expression:"'required:true'"}],attrs:{"error-messages":e.errors.collect("First Name"),label:"First Name*",hint:"This name will also used in you're promo code","data-vv-name":"First Name",color:"black",required:"",autofocus:""},model:{value:e.createFirstName,callback:function(t){e.createFirstName=t},expression:"createFirstName"}}),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required:true",expression:"'required:true'"}],attrs:{"error-messages":e.errors.collect("Last Name"),label:"Last Name*","data-vv-name":"Last Name",color:"black",required:""},model:{value:e.createLastName,callback:function(t){e.createLastName=t},expression:"createLastName"}}),a("v-combobox",{directives:[{name:"validate",rawName:"v-validate",value:"required:true",expression:"'required:true'"}],attrs:{"error-messages":e.errors.collect("Gender"),items:e.genderSelect,label:"Gender*","data-vv-name":"Gender",required:"",color:"black"},model:{value:e.createGender,callback:function(t){e.createGender=t},expression:"createGender"}}),a("v-combobox",{directives:[{name:"validate",rawName:"v-validate",value:"required:true",expression:"'required:true'"}],attrs:{"error-messages":e.errors.collect("Marital Status"),items:e.maritalSelect,label:"Marital Status*","data-vv-name":"Marital Status",required:"",color:"black"},model:{value:e.maritalStatus,callback:function(t){e.maritalStatus=t},expression:"maritalStatus"}}),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required:true|digits:11",expression:"'required:true|digits:11'"}],staticStyle:{"margin-top":"15px"},attrs:{"error-messages":e.errors.collect("Phone"),label:"Mobile Number*","data-vv-name":"Phone",color:"black",required:"",mask:"###-###-###-##",prefix:"(+2)-"},model:{value:e.createPhone,callback:function(t){e.createPhone=t},expression:"createPhone"}}),a("h6",{staticStyle:{color:"red"}},[e._v("*required")]),a("v-alert",{attrs:{value:e.profileAlert,type:"error",color:"red",transition:"scale-transition"}},[e._v("\n                                "+e._s(e.profileErrorMsg)+"\n                            ")])],1),a("v-card-actions",{staticStyle:{"justify-content":"flex-end"}},[a("v-btn",{staticClass:"white--text",attrs:{loading:e.profileLoading,disabled:e.profileLoading,color:"black"},on:{click:e.getUserInfo}},[e._v("\n                            Continue\n                        ")])],1)],1),a("v-stepper-content",{attrs:{step:"3"}},[e.promoCodeRedeemed?a("v-layout",{staticStyle:{"justify-content":"center"},attrs:{row:"",wrap:""}},[a("v-card",{staticStyle:{"text-align":"center"},attrs:{elevation:"0",height:"auto",width:"300px"}},[a("h3",[e._v("Use Promo Code To get Your First Points")]),a("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required:true|max:10",expression:"'required:true|max:10'"}],staticStyle:{"text-align":"center"},attrs:{"error-messages":e.errors.collect("Promo Code"),"data-vv-name":"Promo Code",color:"black",label:"Promo Code","single-line":"",outline:"",clearable:"",autofocus:""},model:{value:e.createPromoCode,callback:function(t){e.createPromoCode=t},expression:"createPromoCode"}}),a("v-btn",{attrs:{loading:e.promoLoading,disabled:e.promoLoading},on:{click:e.startRedeem}},[e._v("\n                                Redeem\n\n                            ")]),a("v-alert",{attrs:{value:e.promoAlert,type:"error",color:"red",transition:"scale-transition",outline:""}},[e._v("\n                                "+e._s(e.promoMsg)+"\n                            ")]),a("h5",{staticStyle:{"margin-top":"20px"}},[e._v("You Can Skip This Step")])],1)],1):e._e(),e.promoCodeSuccess?a("v-layout",{staticStyle:{"justify-content":"center"},attrs:{row:"",wrap:"",transition:"scale-transition",origin:"center center"}},[a("v-card",{attrs:{elevation:"0",height:"300px"}},[a("v-responsive",{staticStyle:{height:"300px"}},[a("v-card-text",{staticStyle:{"font-size":"larger","font-weight":"bold"}},[a("img",{staticStyle:{"max-width":"237px","max-height":"183px"},attrs:{align:"center",src:r("6376")}}),a("h2",[e._v(e._s(e.promoMsg))])])],1)],1)],1):e._e(),a("v-card-actions",{staticStyle:{"justify-content":"flex-end"}},[a("v-btn",{staticClass:"white--text",attrs:{color:"black"},on:{click:function(t){e.creatingStepper=4}}},[e._v("\n                                Continue\n                            ")])],1)],1),a("v-stepper-content",{attrs:{step:"4"}},[a("v-card",{attrs:{elevation:"0",height:"auto"}},[a("v-responsive",{staticStyle:{height:"100%"}},[a("v-card-text",{staticStyle:{"font-size":"larger","font-weight":"bold"}},[e._v("\n                                    Account Created Successfully\n                                    "),a("img",{staticStyle:{"max-width":"237px","max-height":"183px"},attrs:{align:"center",src:r("324b")}})])],1)],1),a("v-card-actions",{staticStyle:{"justify-content":"center"}},[a("v-btn",{staticClass:"white--text",attrs:{color:"black"},on:{click:function(t){return e.startFinalLogin()}}},[e._v("\n                            Login Now\n                        ")])],1)],1)],1)],1)],1),a("annoying-no-internet")],1)],1)},s=[],o=r("795b"),i=r.n(o),n=(r("ac6a"),r("5df3"),r("a481"),r("1c59")),l=r.n(n),c=r("302f"),d=r("9d8d"),u={name:"customerlogin",$_veeValidate:{validator:"new"},mixins:[c["a"]],components:{annoyingNoInternet:d["a"]},data:function(){return{creatingStepper:0,createEmail:"",createPassword:"",createRePassword:"",createShowPass:!1,createShowRePass:!1,signupAlert:!1,signupErrorMsg:"",signupLoading:!1,createFirstName:"",createLastName:"",genderSelect:["Male","Female"],createGender:"",maritalStatus:"",maritalSelect:["Single","Engaged","Married"],createPhone:"",profileLoading:!1,profileAlert:!1,profileErrorMsg:"",createPromoCode:"",promoCodeRedeemed:!0,promoCodeSuccess:!1,promoLoading:!1,promoAlert:!1,promoMsg:"",signupDialog:!1,custEmail:"",custPassword:"",custshowPassword:!1,custLoading:!1,custAlert:!1,btnCustShow:!0,errMsg:""}},computed:{userLoginWatcher:function(){return this.$store.getters.userStatus},firebaseLoginErrorShow:function(){return this.$store.getters.firebaseError},signupError:function(){return this.$store.getters.getSignupError},writingProfileError:function(){return this.$store.getters.getProfileError},readPromoCode:function(){return this.$store.getters.getPromoCodeMsg},getPromoSuccess:function(){return this.$store.getters.getPromoSuccess}},watch:{userLoginWatcher:function(e){console.log(e),null!==e&&!1===this.signupDialog&&this.$router.replace("/home")},firebaseLoginErrorShow:function(e){null!==e&&void 0!==e&&(this.errMsg=e,this.custAlert=!0,this.custLoading=!1),"You have Attempted to login many times, Try again later!"===e&&(this.errMsg=e,this.custAlert=!0,this.btnCustShow=!1)},signupError:function(e){null!==e?(this.creatingStepper=1,this.signupLoading=!1,this.signupErrorMsg=e,this.signupAlert=!0):null===e&&(this.creatingStepper=2,this.signupAlert=!1,this.signupErrorMsg="",this.signupLoading=!1)},writingProfileError:function(e){null!==e?(this.creatingStepper=2,this.profileLoading=!1,this.profileErrorMsg=e,this.profileAlert=!0):null===e&&(this.creatingStepper=3,this.profileAlert=!1,this.profileErrorMsg="",this.profileLoading=!1)},readPromoCode:function(e){null!==e&&(this.promoMsg=e,this.promoLoading=!1,this.promoAlert=!0)},getPromoSuccess:function(e){!0===e&&(this.promoCodeSuccess=!0,this.promoCodeRedeemed=!1)}},methods:{cancelCreatingDialog:function(){this.$validator.reset(),this.signupDialog=!1,this.creatingStepper=1},getAccountInfo:function(){var e=this;this.signupAlert=!1,this.signupErrorMsg="";var t=i.a.all([this.$validator.validate("Email"),this.$validator.validate("create Password"),this.$validator.validate("Re-Enter Password")]);this.$validator.validateAll(t).then(function(){e.errors.any()||(e.signupLoading=!0,e.$store.dispatch("signupUser",{email:e.createEmail,password:e.createRePassword}),e.creatingStepper=2,e.signupLoading=!1)})},getUserInfo:function(){var e=this;this.profileAlert=!1,this.profileErrorMsg="";var t=i.a.all([this.$validator.validate("First Name"),this.$validator.validate("Last Name"),this.$validator.validate("Gender"),this.$validator.validate("Phone")]);this.$validator.validateAll(t).then(function(){e.errors.any()||(e.profileLoading=!0,e.$store.dispatch("setupUserProfile",{userFirstName:e.createFirstName,userLastName:e.createLastName,userEmail:e.createEmail,userGender:e.createGender,userPhone:e.createPhone,userMaritalStatus:e.maritalStatus}))})},startRedeem:function(){var e=this;this.promoMsg="",this.promoAlert=!1;var t=i.a.all([this.$validator.validate("Promo Code")]);this.$validator.validateAll(t).then(function(){e.errors.any()||(e.promoLoading=!0,e.$store.dispatch("redeemPromoCode",{promoId:e.createPromoCode}))})},loginNow:function(){var e=this,t=i.a.all([this.$validator.validate("email"),this.$validator.validate("password")]);this.$validator.validateAll(t).then(function(){e.errors.any()||(e.errMsg="",e.custAlert=!1,e.custLoading=!0,e.$store.dispatch("loginUser",{email:e.custEmail,password:e.custPassword}),console.log("starting login"))})},startFinalLogin:function(){this.custEmail=this.createEmail,this.custPassword=this.createRePassword,this.signupDialog=!1,this.loginNow(),this.$router.replace("/home")}},beforeCreate:function(){var e=localStorage.getItem("appData"),t="set-NuN-Chernobyl-WhoDidIt",r=new l.a(t),a=r.decrypt(e);"No-Didit"!==a&&this.$router.replace("/home"),this.$store.dispatch("checkConnetion")}},p=u,v=(r("54d1"),r("2877")),m=Object(v["a"])(p,a,s,!1,null,null,null);t["default"]=m.exports},ce23:function(e,t,r){"use strict";var a=r("2501"),s=r.n(a);s.a}}]);
//# sourceMappingURL=chunk-c8d49350.bde4efcd.js.map