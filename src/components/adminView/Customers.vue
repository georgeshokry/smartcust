<template>


        <v-container
                fluid grid-list-md
                style="
            padding-bottom: 50px;
            height: auto;"
        >

<page-path></page-path>

            <h1>CUSTOMERS COMPONENT</h1>
        </v-container>



</template>
<script>

    import Navbar from "./Navbar";
    import pagePath from "./pagePath"
    export default {
        name: 'customers',
        components: {Navbar, pagePath}
    }
</script>

<style>

</style>
