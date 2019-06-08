<template>


        <v-container
                fluid grid-list-md
                style="
            padding-top: 70px;
            padding-bottom: 50px;
            height: auto;"
        >
            <navbar></navbar>
            <newOfferDialog></newOfferDialog>
            <h1>CUSTOMERS COMPONENT</h1>
        </v-container>



</template>
<script>

    import Navbar from "./Navbar";
    import NewOfferDialog from "./newOfferDialog";
    export default {
        name: 'customers',
        components: {Navbar, NewOfferDialog}
    }
</script>

<style>

</style>
