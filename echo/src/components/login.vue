<template>
  <div class="columns">
    <div class="column is-5">
      <div class="section">
        <div class="box">
          <h3 style="text-align:center" class="title is-4">Iniciar sesión</h3>
          <hr>
          <div>
            <label class="label">Id Usuario</label>
            <input
              style="text-align:center"
              class="input"
              type="text"
              v-model="idUsuario"
              name="idUsuario"
              id="idUsuario"
            >
            <br>
            <br>
            <button class="button is-primary" @click="login()">Get token</button>
          </div>
          <hr>
          <div style="text-align:center">
            <span>Id client: {{ idClient }}</span>
            <div class="gorm-group pb-3">
              <textarea v-model="message" rows="2" cols="40"></textarea>
            </div>
            <button class="button is-primary" @click="sendMessage()">Send message</button>
          </div>
          <hr>
          <div style="text-align:center">
            <form>
              <div class="gorm-group pb-3">
                <textarea v-model="words" rows="7" cols="40"></textarea>
              </div>
              <span>
                Grammatical category:
                <br>
                {{ cg }}
              </span>
              <br>
              <button class="button is-primary" @click="input()">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'

export default {
  name: 'login',
  mounted () {
    this.socket = io('http://localhost:3000')
    this.socket.on('clientConnect', data => {
      this.idClient = data.idClient
    })
    this.socket.on('inputResponse', data => {
      this.cg = data
    })
    this.socket.on('user/auth', data => {
      this.cg = data
    })
  },
  data () {
    return {
      password: '',
      idUsuario: '',
      url: 'http://localhost:3000', // cambiar a url base o dominio que este usando.
      user: '',
      message: '',
      messages: [],
      // socket: io('localhost:3000'),
      token: '',
      idClient: '',
      cg: '',
      words: ''
    }
  },
  methods: {
    // cambiar las rutas actuales (/linguisticServices/prueba/)
    // a las rutas correspondientes a las que se van a enviar los datos
    sendMessage () {
      this.socket.emit('sendMessage', {
        user: this.user,
        message: this.message
      })
    },
    login () {
      let idUsuario = { idUsuario: this.idUsuario }
      axios
        .post(`${this.url}/user/auth`, idUsuario)
        .then(response => {
          localStorage.token = `${response.data.token}`
          // this.token = response.data.token
          // axios.defaults.headers.common['Authorization'] = `${response.data.token}`
          console.log(axios.defaults.headers.common)
        })
        .catch(err => console.log(err))
    },
    input () {
      axios.defaults.headers.common['Authorization'] = localStorage.token
      axios
        .post(`${this.url}/c/postCognitiveModel`, {
          w: this.words,
          idClient: this.idClient
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    },
    loadFile (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = this.loadHandler
    },
    loadHandler (event) {
      let arr = event.target.result.split(/\r?\n/)
      let file = { array: arr }
      axios
        .post(`${this.url}/linguisticServices/prueba/`, file)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
