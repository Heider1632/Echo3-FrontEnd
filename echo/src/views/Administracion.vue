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
            :items="eventos"
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
                    <v-btn icon class="mx-0" @click="eliminarEvento(props.item._id)">
                      <v-icon color="grey">fas fa-trash-alt</v-icon>
                    </v-btn>
                  </td>
              </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12 name="usuarios" text-xs-center class="mt-3">
          <v-divider />
          <h2 class="my-3">{{$t('administracion.usuarios')}}</h2>
        </v-flex>
        <v-flex xs12 name="dataUsuarios">
          <v-data-table
            :headers="encabezadoUsuarios"
            :items="usuarios"
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
        <v-dialog v-if="editarUsuarioDialog" v-model="editarUsuarioDialog">
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
      usuarios: []
    }
  },
  mounted () {
    axios.post('/', {
      query: `query {
          users{
            _id
            name
            email
            phone
            country
            department
            city
            role
          }
        }`
    }).then(respuesta => {
      this.usuarios = respuesta.data.data.users
    }).catch(error => {
      this.$store.commit('setAlerta')
      this.$store.commit('setTextoAlerta', error)
    })
  },
  methods: {
    ...mapMutations(['setAlerta', 'setTextoAlerta']),
    ...mapActions(['actualizarEventos']),
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
    eliminarEvento (id) {
      axios.post('/', {
        query: `mutation {
          deleteEvent(
            _id:"${id}"
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
    }
  },
  computed: {
    ...mapGetters(['getEventos', 'getEntrevistas']),
    eventos () {
      var eventos = []
      if (this.getEventos) {
        eventos = JSON.parse(JSON.stringify(this.getEventos))
        var entrevistas = JSON.parse(JSON.stringify(this.getEntrevistas))
        if (this.getEntrevistas) {
          var listadoEntrevistas = []
          for (let o = 0; o < entrevistas.length; o++) {
            listadoEntrevistas.push({
              idEntrevista: entrevistas[o].idEntrevista,
              idEvento: entrevistas[o].idEvento,
              titulo: entrevistas[o].titulo,
              idEncuestadores: entrevistas[0].idEncuestadores
            })
          }
          eventos.forEach(evento => {
            listadoEntrevistas.forEach(entrevista => {
              if (entrevista.idEvento === evento.id) {
                if (evento.entrevistas === undefined) {
                  evento['entrevistas'] = []
                  evento.entrevistas.push(entrevista)
                } else {
                  if (evento.entrevistas.find(e => e.idEntrevista === entrevista.idEntrevista) === undefined) {
                    evento.entrevistas.push(entrevista)
                  }
                }
              }
            })
          })
        }
      }
      return eventos
    }
  }
}
</script>

<style>

</style>
