<template>
<v-card
        :tile="true"
        :elevation="10"
        max-width="250px"
        id="rounded-card"

>
    <div class="btn-add-corner">
        <v-tooltip left color="black">
            <template v-slot:activator="{ on }">
                <v-btn flat icon color="black " style="margin: 0" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
            <span>Create New Order</span>
        </v-tooltip>


    </div>
    <!--                        starting of orders header-->



    <v-card-title
            primary-title
            id="orders-title"
    >
        <div>
            <v-icon size="50px" color="black">forum</v-icon>
            <h3>Orders</h3>
<!--            <v-divider class="profile-divider"></v-divider>-->
        </div>
    </v-card-title>

    <!--some of user data show here-->
    <v-content style="text-align: left; padding-left: 16px; padding-bottom: 16px">
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>
        <div>
            email:  <span> example@comp.com</span>
        </div>
        <div>
            phone:  <span>0156123156</span>
        </div>

    </v-content>
</v-card>
</template>
<script>

    export default {
        name: 'ordersprofile',
        components: {},
        data: () => {
            return{

            }
        },

        methods:{

        }
    }
</script>

<style>
    #rounded-card{
        border-radius: 20px;
    }
    .avatar{

    }
    #orders-title{
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
    }
    .profile-divider{
        margin-top: 0px;
        margin-bottom: 5px;
    }
    .btn-add-corner{
        background-color: #b7b7b7;
        border-bottom-left-radius: 230px;
        margin-left: 208px;
        text-align: right;
        padding-bottom: 7px;

    }


</style>