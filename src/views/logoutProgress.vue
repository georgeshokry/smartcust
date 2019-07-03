<template>
    <v-dialog
            persistent
            v-model="exitLoading"
            width="fit-content"
            content-class="custom-progress-dialog"
    >

        <v-progress-circular
                indeterminate
                color="white"
                :size="70"
                :width="7"
                style="overflow: hidden"
        ></v-progress-circular>

    </v-dialog>
</template>

<script>
    export default {
        name: "logoutProgress",
        data:()=>{
            return{

            }
        },
        computed:{
            exitLoading:{
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>