<template>
    <div>
    <v-speed-dial
      v-model="fab"
      top:false
      bottom:true
      right:true
      direction:top

      transition="slide-y-reverse-transition"
      style="
      position: fixed;
    right: -5px;
    bottom: 35px;
"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="white--text"
          dark
          fab
        >
          <v-icon>edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>



                <v-btn

                        color="white--text"
                        dark
                        fab
                        small
                        @click.stop="showForm=true"
                >
<!--                    <v-tooltip left color="black" >-->
<!--                        <template v-slot:activator="{ on }">-->

                            <v-icon >loyalty</v-icon>

<!--                        </template>-->
<!--                        <span >Create New Offer</span>-->
<!--                    </v-tooltip>-->
                </v-btn>




    </v-speed-dial>
    <new-offer-dialog v-model="showForm"></new-offer-dialog>
    </div>
</template>
<script>
import newOfferDialog from"./newOfferDialog";
    export default {
        name: 'createSpeedDial',
        components: {newOfferDialog},
        data:()=>{
            return{
                fab: false,
                showForm: false

            }
        }
    }

</script>

<style>

</style>
