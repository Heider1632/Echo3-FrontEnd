<template>
    <v-container text-xs-center>
      <v-layout row wrap align-center justify-center fill-height>
        <v-flex xs12 sm8 md6 lg4>
            <logo-animado :porcentaje="porcentaje" />
        </v-flex>
        <v-flex xs12>
          <v-layout row align-center justify-center>
            <v-flex xs4 sm3 md2 lg1>
              <v-img
              alt="logo UNFPA"
              :src="logoUNFPA"
              />
            </v-flex>
            <v-flex xs4 sm3 md2 lg1>
              <v-img
              alt="logo Universidad de Córdoba"
              :src="logoUnicor"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import logoUNFPA from '@/assets/unfpa.png'
import logoUnicor from '@/assets/unicor.png'
import LogoAnimado from '@/components/LogoAnimadoCompleto.vue'
import { setInterval } from 'timers'
export default {
  name: 'Animacion',
  data () {
    return {
      orden: 0,
      porcentaje: 0,
      logoUNFPA,
      logoUnicor
    }
  },
  components: {
    LogoAnimado
  },
  watch: {
    orden (valor) {
      var y = 0
      var intporcentaje = setInterval(() => {
        y++
        if (y === 100) {
          clearInterval(intporcentaje)
        }
        this.porcentaje++
      }, 20)
    }
  },
  mounted () {
    var x = 0
    var intervalo = setInterval(() => {
      x++
      if (x === 3) {
        clearInterval(intervalo)
        this.setIntro()
      }
      this.orden++
    }, 1000)
  },
  methods: {
    ...mapMutations(['setIntro'])
  },
  computed: {
    fontSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '100px'
        case 'sm': return '140px'
        case 'md': return '180px'
        case 'lg': return '220px'
        case 'xl': return '260px'
        default: return '260px'
      }
    }
  }
}
</script>

<style>
.gigante {
  font-size: 200px;
}
.animated.rapido {
  -webkit-animation-duration: 200ms;
  animation-duration: 200ms;
}
</style>
