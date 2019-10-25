<template>
  <v-snackbar
    :value="getAlerta"
    top
    color="primary"
    class="white--text"
    :timeout="5000"
    multi-line
  >
    <h3 class="subtitle-1 font-weight-regular">{{ getTextoAlerta }}</h3>
    <v-btn flat @click="cerrar" color="white">Cerrar</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app-alerta',
  computed: {
    ...mapGetters(['getAlerta', 'getTextoAlerta'])
  },
  methods: {
    cerrar () {
      this.$store.commit('setAlerta')
    }
  }
}
</script>
