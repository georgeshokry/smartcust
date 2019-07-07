<template>
    <v-layout row justify-center align-center  style="min-height: 263px" transition="scale-transition">
        <v-progress-circular
                indeterminate
                color="black"
        ></v-progress-circular>
    </v-layout>
</template>

<script>
    export default {
        name: "loadingDataProgress"
    }
</script>

