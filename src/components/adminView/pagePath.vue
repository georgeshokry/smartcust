<template>
    <div style="text-align: start;   ">
        <v-layout column wrap>
        <h2 class="headline" style="text-transform: capitalize;">

            <div v-if="$route.path !== '/admin/pointsplan'">

                <v-btn icon v-if="$route.path.substr(1, $route.path.length) !== 'dashboard' && $route.path !== '/admin/dashboard'" to="/admin">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                {{$route.path.split("/", $route.path.length)[2] ? $route.path.split("/", $route.path.length)[2]: "dashboard"}}
            </div>

            <div v-if="$route.path === '/admin/pointsplan'">
                <v-btn icon v-if="$route.path.substr(1, $route.path.length) !== 'dashboard'" to="/admin">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                Points Plan
            </div>

            <v-divider style="filter: opacity(0);" class="mx-2 ma-3"></v-divider>
        </h2>
        </v-layout>
    </div>

</template>