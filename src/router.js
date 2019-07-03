import Vue from "vue";
import Router from "vue-router";


import SimpleCrypto from "simple-crypto-js";



Vue.use(Router);
const boss = "X0P3ELO7GISMdClcAXAj9jaPE4u1";
let router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
      {
          path: '/404',
          name: 'http404',
          component: () => import("./views/http404"),
          meta:{
              auth: false,
              title: "404 | Smart Customer",
          }
      },
      {
          path: "/customer-login",
          name: "customerlogin",
          component: () => import("./components/customerView/customerLogin"),
          meta: {
              auth: false,
              title: "Smart Customer"

          }
      },
      {
          path: "/",
          name: "custHome",
          redirect: { name: 'customerprofile' },
          component: () => import("./views/custHome.vue"),
          meta: {
              auth: true,
              title: "Home | Smart Customer",
          },
          children: [
              {
                  path: "profile",
                  name: "customerprofile",
                  component: () => import("./components/customerView/customerProfile"),
                  meta: {
                      auth: true,
                      title: "Home | Smart Customer",
                  }
              },
          ],
      },

      {
          path: "/admin-login",
          name: "AdminLogin",
          component: ()=> import("./components/adminView/AdminLogin.vue"),
          meta: {
              title: "Admin Login | Smart Customer",
              auth: false
          }
      },
      {
          path: "/admin",
          name: "home",
          redirect: { name: 'dashboard' },
          component: () => import("./views/adminHome"),
          meta: {
              auth: true,
              title: "Admin Home | Smart Customer",
          },
          children: [

              {
              path: "dashboard",
    name: "dashboard",
    component: () => import("./components/adminView/Dashboard"),
    meta: {
        auth: true,
        title: "Admin Home | Smart Customer",
    }

},
              {

                  path: "customers",
                  name: "customers",
                  component: () => import("./components/adminView/Customers"),
                  meta: {
                      auth: true,
                      title: "Customers | Smart Customer",

                  }
              },
              {
                  path: "offers",
                  name: "offers",
                  component: () => import("./components/adminView/Offers"),
                  meta: {
                      auth: true,
                      title: "Offers | Smart Customer",

                  }
              },
              {
                  path: "reservations",
                  name: "reservations",
                  component: () => import("./components/adminView/reservations"),
                  meta: {
                      auth: true,
                      title: "Reservations | Smart Customer",

                  }
              },
              {
                  path: "pointsplan",
                  name: "pointsPlan",
                  component: () => import("./components/adminView/pointsPlan"),
                  meta: {
                      auth: true,
                      title: "Points Plan | Smart Customer",

                  }

              },
          ],
      },
      // {
      //     path: '/',
      //     name: "landing",
      //     component: () => import("@/views/landing"),
      //     meta: {
      //         auth: false,
      //         title: "Smart Customer",
      //     }
      // },


  ]
});
// router.replace({ path: '/profile', redirect: 'customerprofile' });

router.beforeEach((to, from, next) => {

    let localSession = localStorage.getItem('appData');
    let _secretKey = "set-NuN-Chernobyl-WhoDidIt";
    let simpleCrypto = new SimpleCrypto(_secretKey);
    let decipherUser = simpleCrypto.decrypt(localSession);


    if (to.matched.length) {
        next();
    } else {
        next({
            path: '/404'
        });
    }
    if(
        to.path === "/admin" ||
        to.path === "/admin/dashboard" ||
        to.path === "/admin/offers" ||
        to.path === "/admin/customers" ||
        to.path === "/admin/reservations" ||
        to.path === "/admin/pointsplan" ||
        to.path === "/admin-login"
    ) {

        // "X0P3ELO7GISMdClcAXAj9jaPE4u1"
        if (to.meta.auth && decipherUser !== boss) {
                document.title = to.meta.title;
                next({
                    path: '/admin-login'
                });
        }else {
            document.title = to.meta.title;
                next();

        }


    }
    if(to.path === "/" || to.path === "/profile" ||to.path === "/customer-login"){

            if (to.meta.auth && decipherUser === "No-Didit") {
                if (to.meta.auth && decipherUser === boss) {
                    document.title = to.meta.title;
                    next({
                        path: '/admin-login'
                    });
                }else {
                    document.title = to.meta.title;
                    next({
                        path: '/customer-login'
                    });
                }
            } else {
                document.title = to.meta.title;
                next();

            }
            if(to.meta.auth && decipherUser === boss) {
                document.title = to.meta.title;
                next({
                    path: '/admin'
                });
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
