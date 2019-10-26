<template>
  <v-app style="overflow:hidden">
    <animacion v-if="getIntro"/>
    <!-- SITIO WEB -->
    <template v-else>
      <administrador-navigation v-if="getRol === 'administrador'" app/>
      <coordinador-navigation v-else-if="getRol === 'coordinador'" app/>
      <encuestador-navigation v-else-if="getRol === 'encuestador'" app/>
      <operador-navigation v-else-if="getRol === 'operador'" app/>
      <invitado-navigation v-else-if="getRol === 'invitado'" app/>
        <v-container name="Tablet/PC" class="pa-0 ma-0" fluid fill-height>
          <v-layout row>
            <v-flex xs1 class="sidebar-background py-5 hidden-xs-only" style="z-index:2" height="initial">
              <v-flex xs12 class="idiomas pa-3 my-5">
                <v-btn flat small @click="setIdioma('es')" class="textoIdiomas">{{ $t('idioma.espanol')}}</v-btn>
              </v-flex>
              <v-flex xs12 class="idiomas pa-3 my-5">
                <v-btn flat small @click="setIdioma('en')" class="textoIdiomas">{{ $t('idioma.ingles')}}</v-btn>
              </v-flex>
              <v-flex xs12 class="text-xs-center mt-5 mb-2">
              <v-btn icon>
                <v-icon>fab fa-facebook</v-icon>
              </v-btn>
              </v-flex>
              <v-flex xs12 class="text-xs-center mb-2">
                <v-btn icon>
                  <v-icon>fab fa-instagram</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <v-btn icon>
                  <v-icon>fab fa-twitter</v-icon>
                </v-btn>
              </v-flex>
            </v-flex>
            <app-alerta />
            <router-view/>
          </v-layout>
        </v-container>
        <v-footer style="z-index: 1; min-height:auto!important; padding: 20px 0;" height="auto">
          <v-layout column fill-height>
            <v-flex xs12 name="idiomas" hidden-sm-and-up>
              <v-layout column class="text-xs-center">
                <v-flex xs12>
                  <v-btn flat small @click="setIdioma('es')" class="textoIdiomas">{{ $t('idioma.espanol')}}</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat small @click="setIdioma('en')" class="textoIdiomas">{{ $t('idioma.ingles')}}</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 name="redes" hidden-sm-and-up>
              <v-layout row justify-center>
                <v-flex xs4 class="text-xs-center">
                  <v-btn icon>
                    <v-icon>fab fa-facebook</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                  <v-btn icon>
                    <v-icon>fab fa-instagram</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                  <v-btn icon>
                    <v-icon>fab fa-twitter</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 name="Principal">
              <v-layout row wrap justify-center align-center>
                <v-flex xs6 md2 v-for="item in principal" :key="item.alt">
                  <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-img
                    v-on="on"
                    :alt="item.alt"
                    :src="item.src"
                    contain
                    class="logos"
                    max-height="100px"
                    />
                  </template>
                  <span>{{item.alt}}</span>
                </v-tooltip>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-footer>
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AdministradorNavigation from '@/navigations/Administrador'
import CoordinadorNavigation from '@/navigations/Coordinador'
import EncuestadorNavigation from '@/navigations/Encuestador'
import OperadorNavigation from '@/navigations/Operador'
import InvitadoNavigation from '@/navigations/Invitado'
import logoUNFPA from '@/assets/unfpa.png'
import logoUnicor from '@/assets/unicor.png'
import logoPersoneria from '@/assets/personeria.png'
import logoHablamed from '@/assets/hablamed.png'
import logoGobernacion from '@/assets/gobernacion.png'
import logoEpm from '@/assets/epm.png'
import logoMetro from '@/assets/metro.png'
import logoAreaMetropolitana from '@/assets/areametropolitana.png'
import logoPolicia from '@/assets/policia.png'
import logoInder from '@/assets/inder.png'
import logoAlcaldia from '@/assets/alcaldia.png'
import logoTeleantioquia from '@/assets/teleantioquia.png'
import logoTelemedellin from '@/assets/telemedellin.png'
import appAlerta from './components/Alerta.vue'
export default {
  name: 'App',
  components: {
    AdministradorNavigation,
    CoordinadorNavigation,
    EncuestadorNavigation,
    OperadorNavigation,
    InvitadoNavigation,
    appAlerta
  },
  data () {
    return {
      logoUNFPA,
      logoUnicor,
      logoPersoneria,
      logoHablamed,
      logoGobernacion,
      logoEpm,
      logoMetro,
      logoAreaMetropolitana,
      logoPolicia,
      logoInder,
      logoAlcaldia,
      logoTeleantioquia,
      logoTelemedellin,
      principal: [
        { alt: 'HablameD', src: logoHablamed },
        { alt: 'UNFPA', src: logoUNFPA },
        { alt: 'Personería de Medellín', src: logoPersoneria },
        { alt: 'Universidad de Córdoba', src: logoUnicor }
      ],
      apoyan: [
        { alt: 'Gobernación de Antioquia', src: logoGobernacion },
        { alt: 'EPM', src: logoEpm },
        { alt: 'Metro de Medellín', src: logoMetro },
        { alt: 'Área Metropolitana', src: logoAreaMetropolitana },
        { alt: 'Policía Nacional', src: logoPolicia },
        { alt: 'Inder', src: logoInder },
        { alt: 'Alcaldía de Medellín', src: logoAlcaldia },
        { alt: 'TeleAntioquia', src: logoTeleantioquia },
        { alt: 'TeleMedellín', src: logoTelemedellin }
      ]
    }
  },
  computed: {
    ...mapGetters(['getIdioma', 'getIntro', 'getRol'])
  },
  methods: {
    ...mapMutations(['setIdioma']),
    ...mapActions(['autoLogin'])
  },
  mounted () {
    this.autoLogin()
  }
}
</script>

<style>
.containerNavegacion {
  max-height:64px;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 10px !important;
}
.flexcard {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
}
.margen-linea {
  margin: 0 20% !important;
}
.v-btn--small {
  padding: 0 !important;
}
.footer {
  background-color: #f5f5f5 !important;
}
.contenedor {
  padding: 32px !important;
}
@media only screen and (max-width: 959px) {
  .contenedor {
    padding: 24px !important;
  }
}
.sidebar-background {
  background: rgba(245, 245, 245, 0.9);
}
.layout-menu {
  height: -webkit-fill-available;
  padding: 0;
}
.idiomas {
  transform: rotate(-90deg);
}
.textoIdiomas {
  font-size: 15px !important;
}
.logos {
  margin: 0 20% !important;
}
table.v-table thead th, table.v-table tbody td, .v-datatable__actions {
  font-size: 15px !important;
}
</style>
