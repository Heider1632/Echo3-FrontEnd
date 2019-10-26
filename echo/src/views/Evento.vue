<template>
    <v-container>
        <v-layout column>
            <v-flex x12>
              <v-card>
                <v-card-title>
                  <v-layout column>
                    <v-layout row wrap>
                      <v-flex xs12 md9 class="mb-2">
                        <h1>{{evento.title}}</h1>
                        <h2 class="primary--text">{{evento.tema}}</h2>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12 class="mb-2">
                      <h3>{{evento.country}} - {{evento.departament}} - {{evento.city}}</h3>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                      <h3 style="font-weight:400;">{{$t('evento.lugar')}}: {{evento.place}}</h3>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                      <h3>{{$t('evento.del')}} {{ evento.startDate }} {{$t('evento.al')}} {{evento.endDate }}</h3>
                    </v-flex>
                    <v-divider />
                  </v-layout>
                </v-card-title>
                <v-card-text>
                  <v-flex x12>
                    <p style="font-size:18px;">{{evento.description}}</p>
                  </v-flex>
                </v-card-text>
                <v-card-actions>
                  <v-container>
                    <v-layout row wrap class="mb-5">
                      <v-flex xs12 md6 class="text-xs-center px-3">
                        <h2 class="mb-3">{{$t('evento.entrevistas')}}</h2>
                        <v-btn class="ma-2" round color="secondary" v-for="i in evento.Interview" :key="i.name" :disabled="i.disabled" @click="verEntrevista(i._id)">{{i.name}}</v-btn>
                      </v-flex>
                      <v-flex xs12 md6 class="text-xs-center px-3">
                        <h2 class="text-xs-center mb-3">{{$t('evento.resultados')}}</h2>
                        <v-btn class="ma-2" round color="secondary" v-for="i in evento.Interview" :key="i.titulo" :disabled="i.disabled" @click="verResultadoEntrevista(i._id)">{{i.name}}</v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap justify-center v-if="getRol === 'administrador'">
                      <v-flex xs12>
                        <v-divider />
                        <h2 class="text-xs-center my-3">{{$t('evento.administrador')}}</h2>
                      </v-flex>
                      <v-flex xs12 md4 class="text-xs-center my-2">
                        <v-btn round color="primary" @click="nuevoEncuestador">{{$t('evento.anadirEncuestador')}}</v-btn>
                      </v-flex>
                      <v-flex xs12 md4 class="text-xs-center my-2">
                        <v-btn round color="primary" @click="nuevoCoordinador">{{$t('evento.anadirCoordinador')}}</v-btn>
                      </v-flex>
                      <v-flex xs12 md4 class="text-xs-center my-2">
                        <v-btn round color="primary" @click="anadirEntrevista">{{$t('evento.anadirEntrevista')}}</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog">
          <v-container style="background-color: white;" fluid>
            <v-layout column align-center>
              <v-flex xs12 class="mb-2">
                <h1>Nuevo {{tipo}}</h1>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-autocomplete
                v-model="usuariosSeleccionados"
                :items="usuarios" 
                item-text="name" 
                item-value="_id" 
                multiple 
                chips 
                solo
                deletable-chips
                no-data-text="No existen usuarios con el rol solicitado" />
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-btn @click="actualizarAutorizaciones" block color="primary">Actualizar Autorizaciones</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Evento',
  data () {
    return {
      evento: [],
      dialog: false,
      tipo: '',
      usuarios: [],
      usuariosSeleccionados: []
    }
  },
  mounted () {
    var eventos = this.getEventos
    for (let i = 0; i < eventos.length; i++) {
      if (eventos[i]._id === this.$route.params.idEvento) {
        this.evento = eventos[i]
      }
    }
    if (this.getRol === 'administrador' || 'coordinador') {
      if (!this.getUsuarios[0]) {
        this.actualizarUsuarios()
      }
    }
  },
  methods: {
    ...mapActions(['actualizarUsuarios']),
    anadirEntrevista () {
      const menu = `${this.$i18n.t('alias.crearEntrevista')}/${this.$route.params.idEvento}`
      this.$router.push(menu)
    },
    nuevoEncuestador () {
      this.usuarios = []
      this.dialog = true
      this.tipo = 'encuestador'
      if (!this.getUsuarios[0]) {
        this.actualizarUsuarios()
      }
      var usuarios = this.getUsuarios
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].role === 'encuestador') {
          this.usuarios.push(usuarios[i])
        }
      }
    },
    nuevoCoordinador () {
      this.usuarios = []
      this.dialog = true
      this.tipo = 'coordinador'
      if (!this.getUsuarios[0]) {
        this.actualizarUsuarios()
      }
      var usuarios = this.getUsuarios
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].role === 'coordinador') {
          this.usuarios.push(usuarios[i])
        }
      }
    },
    actualizarAutorizaciones() {
      console.log(this.usuariosSeleccionados)
    },
    verEntrevista (entrevista) {
      const menu = `${this.$i18n.t('alias.entrevista')}/${entrevista}`
      this.$router.push(menu)
    },
    verResultadoEntrevista (entrevista) {
      const menu = `${this.$i18n.t('alias.resultado')}/${entrevista}`
      this.$router.push(menu)
    }
  },
  computed: {
    ...mapGetters(['getEventos', 'getRol', 'getUsuarios'])
  }
}
</script>
