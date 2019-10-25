<template>
    <v-container fluid>
      <v-layout row wrap justify-center>
        <v-flex xs10 sm7 class="ma-3">
          <v-card v-if="login" name="Iniciar Sesion" elevation="8" class="py-5 text-xs-center flexcard" style="border: 1px solid #fff">
            <v-card-title>
              <v-flex xs12 class="mb-3">
                <v-icon size="70px" color="black">far fa-user</v-icon>
              </v-flex>
              <v-flex xs12 class="margen">
                <h1 class="display-1 mb-3">{{$t('acceso.iniciarSesion')}}</h1>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 class="margen">
                <v-text-field v-model="correoe" solo :label="$t('acceso.correoe')" class="rounded"/>
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="contrasena" solo :label="$t('acceso.contrasena')" class="rounded" v-on:keyup.enter="iniciarSesion"/>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-flex xs12 class="margen">
              <v-btn large round block color="primary" @click="iniciarSesion">{{$t('acceso.iniciarSesion')}}</v-btn>
            </v-flex>
            </v-card-actions>
          </v-card>
          <v-card v-else name="Registro" elevation="8" class="py-5 text-xs-center flexcard" style="border: 1px solid #fff">
            <v-card-title>
              <v-flex xs12 class="mb-3">
                <v-icon size="70px" color="black">fas fa-user-edit</v-icon>
              </v-flex>
              <v-flex xs12 class="margen">
                <h1 class="display-1 mb-3">{{$t('acceso.registro')}}</h1>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 class="margen">
                <v-text-field v-model="nombre" solo :label="$t('acceso.nombre')" class="rounded" />
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="celular" solo :label="$t('acceso.celular')" class="rounded" />
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="correoe" solo :label="$t('acceso.correoe')" class="rounded"/>
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="contrasena" solo :label="$t('acceso.contrasena')" class="rounded" />
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="pais" solo :label="$t('acceso.pais')" class="rounded" />
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="departamento" solo :label="$t('acceso.departamento')" class="rounded" />
              </v-flex>
              <v-flex xs12 class="margen">
                <v-text-field v-model="ciudad" solo :label="$t('acceso.ciudad')" class="rounded" />
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-flex xs12 class="margen">
                <v-btn large round block color="primary" @click="registrarse">{{$t('acceso.registro')}}</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs10 sm3 class="ma-3">
          <v-card v-if="login" name="Iniciar Sesion Sidebar" elevation="8" class="py-5 text-xs-center flexcard" style="border: 1px solid #fff">
            <v-card-title>
              <v-flex xs12 class="mb-3">
                <v-icon size="70px" color="black">fas fa-walking</v-icon>
              </v-flex>
              <v-flex xs12 class="margen2">
                <h1 class="display-1 mb-3">{{$t('acceso.nuevo')}}</h1>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 class="margen2">
                <h3 class="subheading mb-3">{{$t('acceso.textoNuevo')}}</h3>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-flex xs12 class="margen2">
                <v-btn @click="login = false" round color="primary">{{$t('acceso.registro')}}</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
          <v-card v-else name="Registro Sidebar" elevation="8" class="py-5 text-xs-center flexcard" style="border: 1px solid #fff">
            <v-card-title>
              <v-flex xs12 class="mb-3">
                <v-icon size="70px" color="black">fas fa-user-astronaut</v-icon>
              </v-flex>
              <v-flex xs12 class="margen2">
                <h1 class="display-1 mb-3">{{$t('acceso.miembro')}}</h1>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 class="margen2">
                <h3 class="subheading mb-3">{{$t('acceso.textoMiembro')}}</h3>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-flex xs12 class="margen2">
                <v-btn @click="login = true" round color="primary">{{$t('acceso.iniciarSesion')}}</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import decode from 'jwt-decode'
export default {
  name: 'Acceso',
  data () {
    return {
      login: true,
      nombre: null,
      celular: null,
      correoe: null,
      contrasena: null,
      pais: null,
      departamento: null,
      ciudad: null,
      rol: 'encuestador',
      paises: ['Colombia'],
      departamentos: ['Antioquia'],
      ciudades: ['Medellín']
    }
  },
  methods: {
    iniciarSesion () {
      axios.post('/', {
        query: `query {
          login(
            email:"${this.correoe}", 
            password:"${this.contrasena}"
            ){
              token
              incomingMessage {
                message
                status
              }
            }
        }`
      }).then(respuesta => {
        localStorage.setItem('token', respuesta.data.data.login.token)
        this.$store.commit('setToken', respuesta.data.data.login.token)
        this.$store.commit('setUsuario', decode(respuesta.data.data.login.token))
        this.$store.commit('setAlerta')
        this.$store.commit('setTextoAlerta', respuesta.data.data.login.incomingMessage.message)
        const menu = `${this.$i18n.t('alias.eventos')}`
        this.$router.push(menu)
      })
    },
    registrarse () {
      axios.post('/', {
        query: `mutation {
          createUser(user: {
            email:"${this.correoe}", 
            password:"${this.contrasena}",
            phone:"${this.celular}",
            name:"${this.nombre}", 
            role:"${this.rol}",
            country:"${this.pais}",
            department:"${this.departamento}",
            city:"${this.ciudad}"
          }) {
            token
            incomingMessage {
              status
              message
            }
          }
        }`
      }).then(respuesta => {
        this.$store.commit('setAlerta')
        this.$store.commit('setTextoAlerta', respuesta.data.data.createUser.incomingMessage.message)
        if (respuesta.data.data.createUser.incomingMessage.status === '200') {
          this.$store.commit('setToken', respuesta.data.data.createUser.token)
          var usuario = {
            email: this.correoe,
            name: this.nombre,
            phone: this.celular,
            country: this.pais,
            department: this.departamento,
            city: this.ciudad,
            role: this.rol
          }
          this.$store.commit('setUsuario', usuario)
          const menu = `${this.$i18n.t('alias.eventos')}`
          this.$router.push(menu)
        }
      })
    }
  }
}
</script>

<style>
.rounded .v-input__slot {
  border-radius: 100px !important;
}
.margen {
  margin: 0 25% !important;
}
.margen2 {
  margin: 0 10% !important;
}
</style>
