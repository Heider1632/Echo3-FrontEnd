<template>
    <v-container fill-height fluid>
      <v-layout row wrap align-center justify-center fill-height>
        <v-flex xs12 md5 class="mb-5">
          <logo-animado :porcentaje="porcentaje" style="margin: 0 20%;"/>
        </v-flex>
        <v-flex xs12 md7>
          <v-layout column>
            <v-flex xs12 class="mx-5">
              <h1>{{$t('info.acercade')}}</h1>
              <br>
              <p class="subheading">{{$t('info.quees')}}</p>
            </v-flex>
            <!-- <v-flex xs12>
              <h1>{{$t('info.comofunciona')}}</h1>
              <br>
              {{$t('info.funcionamiento')}}
            </v-flex> -->
            <v-flex xs12>
              <v-layout row>
                <v-flex xs4>
                  <a href="https://colombia.unfpa.org/es" target="_blank">
                    <v-img :src="logoUNFPA"
                    alt="UNFPA"
                    contain
                    max-height="100px"
                    class="ma-3"
                    />
                  </a>
                </v-flex>
                <v-flex xs4>
                  <a href="https://www.unicordoba.edu.co" target="_blank">
                  <v-img :src="logoCICC"
                  alt="CICC"
                  contain
                  max-height="100px"
                  class="ma-3"
                  />
                  </a>
                </v-flex>
                <v-flex xs4>
                  <a href="https://leidyechavarria.com" target="_blank">
                  <v-img :src="logoAgencia"
                  alt="Agencia Leidy Echavarría"
                  contain
                  max-height="100px"
                  class="ma-3"
                  />
                  </a>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import logoUNFPA from '@/assets/unfpa.png'
import logoAgencia from '@/assets/agencia.png'
import logoCICC from '@/assets/cicc.png'
import logoEcho from '@/assets/logo.svg'
import LogoAnimado from '@/components/LogoAnimadoCompleto.vue'
import { setInterval } from 'timers'
export default {
  name: 'acerca',
  data () {
    return {
      logoUNFPA,
      logoAgencia,
      logoCICC,
      logoEcho,
      porcentaje: 0
    }
  },
  components: {
    LogoAnimado
  },
  mounted () {
    setInterval(() => {
      if (this.porcentaje < 100) {
        this.porcentaje++
      } else {
        this.porcentaje = 0
      }
    }, 20)
  }
}
</script>

<style>

</style>
