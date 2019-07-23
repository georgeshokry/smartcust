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
    right: 0px;
    bottom: 0px;
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
                    <v-icon >loyalty</v-icon>
                </v-btn>
        <v-btn

                color="white--text"
                dark
                fab
                small
                @click.stop="showGenerator=true"
        >
            <v-icon >star</v-icon>
        </v-btn>



    </v-speed-dial>
        <new-offer-dialog v-model="showForm"></new-offer-dialog>
        <promoCodeGeneratorDialog v-model="showGenerator"></promoCodeGeneratorDialog>
    </div>
</template>
<script>
import newOfferDialog from"./newOfferDialog";
import promoCodeGeneratorDialog from "./promoCodeGeneratorDialog"
    export default {
        name: 'createSpeedDial',
        components: {newOfferDialog, promoCodeGeneratorDialog},
        data:()=>{
            return{
                fab: false,
                showForm: false,
                showGenerator: false,

            }
        }
    }

</script>

<style>

</style>
