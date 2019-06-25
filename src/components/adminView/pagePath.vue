<template>


    <div style="text-align: start;   ">
        <v-layout column wrap>
        <h2 class="headline" style="text-transform: capitalize; margin-top: 15px">

            <div v-if="$route.path !== '/pointsplan'">
                <v-btn icon v-if="$route.path.substr(1, $route.path.length) !== 'dashboard'" to="/dashboard">
                    <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
                {{$route.path.substr(1, $route.path.length) }}
            </div>

            <div v-if="$route.path === '/pointsplan'">
                <v-btn icon v-if="$route.path.substr(1, $route.path.length) !== 'dashboard'" to="/dashboard">
                    <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
                Points Plan
            </div>

            <v-divider dark class="mx-2 ma-3"></v-divider>
        </h2>
        </v-layout>
    </div>

</template>

<script>
    export default {
        name: "pagePath",
        data: () => {
            return{

            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>