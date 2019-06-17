import Vue from "vue";
import Router from "vue-router";


import SimpleCrypto from "simple-crypto-js";



Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [



      {
          path: "/home",
          name: "customerprofile",
          component: () => import("@/components/customerView/customerProfile"),
          meta: {
              auth: true,
              title: "Home | Smart Customer",
          }
      },

      {
          path: "/customerlogin",
          name: "customerlogin",
          component: () => import("@/components/customerView/customerLogin"),
          meta: {
              auth: false,
              title: "Smart Customer"

          }
      },

      {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/components/adminView/Dashboard"),
          meta: {
              auth: true,
              title: "Admin Home | Smart Customer",
              breadcrumb: [
                  {
                      name: "dashboard"
                  }
              ]
          }
      },

      {
          path: "/adminlogin",
          name: "adminlogin",
          component: () => import("@/views/AdminLogin"),
          meta:{
              title: "Admin Login | Smart Customer",
              auth: false
          }
      },
    {

      path: "/customers",
      name: "customers",
        component: () => import("@/components/adminView/Customers"),
        meta: {
            auth: true,
            title: "Customers | Smart Customer",
            breadcrumb: [
                {
                    name: "customers"
                }
            ]
        }
    },
      {
          path: "/offers",
          name: "offers",
          component: () => import("@/components/adminView/Offers"),
          meta: {
              auth: true,
              title: "Offers | Smart Customer",
              breadcrumb: [
                  {
                      name: "offers"
                  }
              ]
          }
      },

      {
          path: '*',
          name: 'http404',
          component: () => import("@/views/http404"),
          meta:{
              title: "404 | Smart Customer",
          }
      },




  ]
});
// router.replace({ path: '/', redirect: 'dashboard' });

router.beforeEach((to, from, next) => {

    let localSession = localStorage.getItem('appData');
    let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
    let simpleCrypto = new SimpleCrypto(_secretKey);
    let decipherUser = simpleCrypto.decrypt(localSession);
    console.log("DECREPTED  __" , decipherUser);

    console.log("From >> " + to.path + " To >>>" + from.path);


    if(to.path === "/" ||
        to.path === "/dashboard" ||
        to.path === "/adminlogin" ||
        to.path === "/offers" ||
        to.path === "/customers" ||
        to.path === "/orders"
    ) {
        // "X0P3ELO7GISMdClcAXAj9jaPE4u1"
        if (to.meta.auth && decipherUser !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
                document.title = to.meta.title;
                next({
                    path: '/adminlogin'
                });
        }else {
            document.title = to.meta.title;
                next();

        }


    }
    if(to.path === "/" || to.path === "/home" || to.path === "/customerlogin"){
        if (to.meta.auth && decipherUser === "No-Didit") {
            document.title = to.meta.title;
            next({
                path: '/customerlogin'
            });
        }else {
            document.title = to.meta.title;
            next();

        }
    }
});

// router.beforeEach((to, from, next) => {
//
//
//     console.log('localSession' , localSession);
//     // console.log('FirebaseUserId',store.state.userStat);
//
//     console.log("YOU ARE IN >>> ", to.path);
//     if(to.path === "/" ||
//         to.path === "/dashboard" ||
//         to.path === "/adminlogin" ||
//         to.path === "/offers" ||
//         to.path === "/customers" ||
//         to.path === "/orders"
//     ) {
//
//         if (to.matched.some(record => record.meta.authRequired)) {
//
//                 if (store.state.userStat !== "X0P3ELO7GISMdClcAXAj9jaPE4u1") {
//                     document.title = to.meta.title;
//                     next({
//                         path: '/adminlogin'
//                     });
//                 }else {
//                     if(store.state.userSession !== localSession){
//                         document.title = to.meta.title;
//                         next();
//                     }
//                     document.title = to.meta.title;
//                     next();
//                 }
//
//         } else {
//             document.title = to.meta.title;
//             next();
//         }
//     }else if(to.path === "/" || to.path === "/home" || to.path === "/customerlogin"){
//         if (to.matched.some(record => record.meta.authRequired)) {
//             if (store.getters.userStat === null) {
//                 next({
//                     path: '/customerlogin'
//                 });
//             }else {
//                 document.title = to.meta.title;
//                 next();
//             }
//         } else {
//             document.title = to.meta.title;
//             next();
//         }
//     }
// });

// router.beforeEach((to, from, next) => {
// let currentUser = store.getters.userStat;
// console.log(currentUser);
// if (currentUser !== null && currentUser !== undefined) next('/');
// else next('/adminlogin');
// next();
// });

export default router;
