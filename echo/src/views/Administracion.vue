<template>
    <v-container>
      <v-layout column>
        <v-flex xs12 text-xs-center class="mb-3" name="eventos">
          <h2>{{$t('administracion.eventos')}}</h2>
        </v-flex>
        <v-flex xs12 class="mb-2" name="crear Evento">
          <v-btn block round color="secondary" @click="crearEvento">{{$t('administracion.crearEvento')}}</v-btn>
        </v-flex>
        <v-flex xs12 class="mb-4" name="dataEventos">
          <v-data-table
            :headers="encabezadoEventos"
            :items="getEventos"
            class="elevation-1"
            no-data-text="No hay eventos, aún.">
              <template slot="items" slot-scope="props">
                  <td class="text-xs-center">{{ props.item.title }}</td>
                  <td class="text-xs-center">{{props.item.country}} - {{props.item.departament}} - {{props.item.city}} - {{ props.item.place }}</td>
                  <td class="text-xs-center"><span v-for="i in props.item.entrevistas" :key="i.titulo">{{i.titulo}}, </span></td>
                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="irEvento(props.item._id)">
                      <v-icon color="primary">far fa-eye</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="preEliminarEvento(props.item)">
                      <v-icon color="grey">fas fa-trash-alt</v-icon>
                    </v-btn>
                  </td>
              </template>
            </v-data-table>
        </v-flex>
        <v-dialog v-model="dialogEliminarEvento">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <h1 align="center">Eliminar Evento</h1>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <p align="center">Esta acción es permanente y borrará TODA la información relacionada con el evento <b>{{eventoEliminar.title}}</b></p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialogEliminarEvento = false" block>Cerrar</v-btn>
              <v-btn color="red" class="white--text" block @click="eliminarEvento()">Eliminar el Evento</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex xs12 name="usuarios" text-xs-center class="mt-3">
          <v-divider />
          <h2 class="my-3">{{$t('administracion.usuarios')}}</h2>
        </v-flex>
        <v-flex xs12 name="dataUsuarios">
          <v-data-table
            :headers="encabezadoUsuarios"
            :items="getUsuarios"
            class="elevation-1"
            no-data-text="No hay usuarios, aún.">
              <template slot="items" slot-scope="props">
                  <td class="text-xs-center">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.email }}</td>
                  <td class="text-xs-center">{{ props.item.phone }}</td>
                  <td class="text-xs-center">{{ props.item.country }} - {{ props.item.department }} - {{ props.item.city }}</td>
                  <td class="text-xs-center">{{ props.item.role }}</td>
                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="editarUsuario(props.item)">
                      <v-icon color="primary">fas fa-wrench</v-icon>
                    </v-btn>
                  </td>
              </template>
            </v-data-table>
        </v-flex>
        <v-dialog name="DialogEditarUsuario" v-if="editarUsuarioDialog" v-model="editarUsuarioDialog">
            <v-container style="background-color: white;" fluid>
              <v-layout column align-center>
                <v-flex xs12 class="mb-2">
                  <h2>{{usuarioEditar.name}}</h2>
                </v-flex>
                <v-flex xs12>
                  <h3>{{$t('administracion.lugar').toUpperCase()}}</h3>
                </v-flex>
                <v-flex xs12 class="mb-3">
                  <h4>{{usuarioEditar.country}} - {{usuarioEditar.department}} - {{usuarioEditar.city}}</h4>
                  <v-divider />
                </v-flex>
                <v-flex xs12>
                  <h3>{{$t('administracion.correo').toUpperCase()}}</h3>
                </v-flex>
                <v-flex xs12 class="mb-3">
                  <h4>{{usuarioEditar.email}}</h4>
                  <v-divider />
                </v-flex>
                <v-flex xs12>
                  <h3>{{$t('administracion.celular').toUpperCase()}}</h3>
                </v-flex>
                <v-flex xs12 class="mb-3">
                  <h4>{{usuarioEditar.phone}}</h4>
                  <v-divider />
                </v-flex>
                <v-flex xs12>
                  <h3>{{$t('administracion.rolActual').toUpperCase()}}</h3>
                </v-flex>
                <v-flex xs12 class="mb-3">
                  <h4>{{usuarioEditar.role}}</h4>
                  <v-divider />
                </v-flex>
                <v-flex xs12>
                  <v-select solo v-model="nuevoRol" :items="roles" :label="$t('administracion.asignarRol')"/>
                </v-flex>
                <v-flex xs12>
                  <v-btn @click="editarUsuarioDialog = false" round color="secondary">{{$t('administracion.cerrar')}}</v-btn>
                  <v-btn @click="actualizarRol" round color="primary" :disabled="!nuevoRol">{{$t('administracion.actualizarRol')}}</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
        </v-dialog>
        <v-flex xs12 name="Preguntas" text-xs-center class="mt-3">
          <v-divider />
          <h2 class="my-3">{{$t('administracion.preguntas')}}</h2>
        </v-flex>
        <v-flex xs12 class="mb-3" name="Listado Preguntas">
          <v-data-table
            :headers="encabezado"
            :items="getPreguntas"
            class="elevation-1"
            no-data-text="No hay preguntas, aún."
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">
              <v-icon v-if="props.item.required">fas fa-check</v-icon>
              <v-icon v-else>fas fa-times</v-icon>
            </td>
            <td class="text-xs-center">
              <span v-for="i in props.item.options" :key="i"><v-chip>{{i}}</v-chip></span>
            </td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="editarPregunta(props.item)">
                <v-icon color="grey">far fa-edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="eliminarPregunta(props.item)">
                <v-icon color="grey">fas fa-trash-alt</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <v-dialog v-model="dialogEditarPregunta">
          <v-container v-if="preguntaEditar" style="background-color: white;" fluid>
            <v-layout column align-center>
              <v-flex xs12 class="mb-2">
                <h1>Editar Pregunta</h1>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-text-field
                v-model="preguntaEditar.text"
                solo
                :label="$t('crearEntrevista.pregunta')"
                readonly/>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-text-field v-model="preguntaEditar.topic" solo readonly :label="$t('crearEntrevista.tipoDePregunta')"/>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-checkbox v-model="preguntaEditar.required" :label="$t('crearEntrevista.requerido')" color="primary"/>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-combobox
                v-if="preguntaEditar.scope === 'choice'"
                v-model="preguntaEditar.options"
                :label="$t('crearEntrevista.respuestas')"
                solo
                multiple
                chips
                deletable-chips
                append-icon
                :search-input.sync="previo"
                @keyup.tab="updateTags"
                @paste="updateTags"/>
              </v-flex>
              <v-flex xs12 class="mb-2">
                <v-btn @click="dialogEditarPregunta = false">Cerrar</v-btn>
                <v-btn @click="actualizarPregunta" color="primary">Actualizar Pregunta</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'eventos',
  data () {
    return {
      editarUsuarioDialog: false,
      usuarioEditar: null,
      nuevoRol: null,
      roles: ['administrador', 'coordinador', 'encuestador', 'operador', 'invitado'],
      encabezadoEventos: [
        { text: this.$i18n.t('administracion.titulo'), value: this.$i18n.t('administracion.titulo'), align: 'center' },
        { text: this.$i18n.t('administracion.lugar'), value: this.$i18n.t('administracion.lugar'), align: 'center' },
        { text: this.$i18n.t('administracion.entrevistas'), value: this.$i18n.t('administracion.entrevistas'), align: 'center' },
        { text: this.$i18n.t('administracion.acciones'), value: this.$i18n.t('administracion.acciones'), align: 'center', sortable: false }
      ],
      encabezadoUsuarios: [
        { text: this.$i18n.t('administracion.nombre'), value: this.$i18n.t('administracion.nombre'), align: 'center' },
        { text: this.$i18n.t('administracion.correo'), value: this.$i18n.t('administracion.correo'), align: 'center' },
        { text: this.$i18n.t('administracion.celular'), value: this.$i18n.t('administracion.celular'), align: 'center' },
        { text: this.$i18n.t('administracion.lugar'), value: this.$i18n.t('administracion.lugar'), align: 'center' },
        { text: this.$i18n.t('administracion.rol'), value: this.$i18n.t('administracion.rol'), align: 'center' },
        { text: this.$i18n.t('administracion.acciones'), value: this.$i18n.t('administracion.acciones'), align: 'center', sortable: false }
      ],
      dialogEliminarEvento: false,
      eventoEliminar: '',
      encabezado: [
        { text: this.$i18n.t('crearEntrevista.pregunta'), value: this.$i18n.t('crearEntrevista.pregunta'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.requerido'), value: this.$i18n.t('crearEntrevista.requerido'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.respuestas'), value: this.$i18n.t('crearEntrevista.respuestas'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.acciones'), value: this.$i18n.t('crearEntrevista.acciones'), align: 'center', sortable: false }
      ],
      preguntaEditar: null,
      dialogEditarPregunta: false,
      previo: ''
    }
  },
  mounted () {
    this.actualizarUsuarios()
    this.actualizarPreguntas()
    this.actualizarEventos()
  },
  methods: {
    ...mapMutations(['setAlerta', 'setTextoAlerta']),
    ...mapActions(['actualizarEventos', 'actualizarPreguntas', 'actualizarUsuarios']),
    irEvento (evento) {
      const menu = `${this.$i18n.t('alias.evento')}/${evento}`
      this.$router.push(menu)
    },
    crearEvento () {
      const menu = `${this.$i18n.t('alias.crearEvento')}/`
      this.$router.push(menu)
    },
    editarUsuario (usuario) {
      this.usuarioEditar = usuario
      this.editarUsuarioDialog = true
    },
    actualizarRol () {
      var usuario = this.usuarioEditar
      var rol = this.nuevoRol
      const mensaje = this.$i18n.t('administracion.mismoRol')
      const mensajeActualizado = this.$i18n.t('administracion.rolActualizado')
      if (usuario.rol === rol) {
        this.setAlerta()
        this.setTextoAlerta(mensaje)
        this.nuevoRol = null
      } else {
        axios.post('/', {
          query: `mutation {
          updateRole(
            _id:"${this.usuarioEditar._id}", 
            role:"${this.nuevoRol}"
            ){
              status
              message
            }
        }`
        }).then(respuesta => {
          if (respuesta.data.data.updateRole.status === '200') {
            this.setAlerta()
            this.setTextoAlerta(mensajeActualizado)
          } else {
            this.setAlerta()
            this.setTextoAlerta(respuesta.data.data.updateRole.message)
          }

          this.editarUsuarioDialog = false
        }).catch(error => {
          this.$store.commit('setAlerta')
          this.$store.commit('setTextoAlerta', error)
        })
      }
    },
    preEliminarEvento (evento) {
      this.eventoEliminar = evento
      this.dialogEliminarEvento = true
    },
    eliminarEvento () {
      axios.post('/', {
        query: `mutation {
          deleteEvent(
            _id:"${this.eventoEliminar._id}"
            ){
              status
              message
            }
        }`
      }).then(respuesta => {
        if (respuesta.data.data.deleteEvent.status === '200') {
          this.setAlerta()
          this.setTextoAlerta('Evento Eliminado correctamente')
          this.actualizarEventos()
        } else {
          this.setAlerta()
          this.setTextoAlerta(respuesta.data.data.deleteEvent.message)
        }
      }).catch(error => {
        console.log(error)
        this.$store.commit('setAlerta')
        this.$store.commit('setTextoAlerta', error)
      })
    },
    eliminarPregunta (pregunta) {
      axios.post('/', {
        query: `mutation {
                deleteQuestion(_id: "${pregunta._id}") {
                status
                message
                }
            }`
      })
        .then(respuesta => {
          this.setAlerta()
          this.setTextoAlerta(respuesta.data.data.deleteQuestion.message)
          this.actualizarPreguntas()
        })
        .catch(error => {
          this.setAlerta()
          this.setTextoAlerta(error)
        })
    },
    editarPregunta (pregunta) {
      this.preguntaEditar = pregunta
      this.dialogEditarPregunta = true
    },
    actualizarPregunta () {

    },
    updateTags () {
      this.$nextTick(() => {
        this.preguntaEditar.options.push(this.previo)
        this.$nextTick(() => {
          this.previo = ''
        })
      })
    }
  },
  computed: {
    ...mapGetters(['getEventos', 'getPreguntas', 'getUsuarios'])
  }
}
</script>

<style>

</style>
