import axios from 'axios'
export default {
  state: {
    usuario: {
      role: 'invitado'
    },
    usuarios: []
  },
  getters: {
    getRol: (state) => {
      return state.usuario.role
    },
    getUsuario: (state) => {
      return state.usuario
    },
    getUsuarios: (state) => {
      return state.usuarios
    }
  },
  mutations: {
    setRol: (state, rol) => {
      state.usuario.role = rol
    },
    setUsuario: (state, usuario) => {
      state.usuario = usuario
    },
    setUsuarios: (state, usuarios) => {
      state.usuarios = usuarios
    }
  },
  actions: {
    actualizarUsuarios ({ commit }) {
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
        commit('setUsuarios', respuesta.data.data.users)
      }).catch(error => {
        commit('setAlerta')
        commit('setTextoAlerta', error)
      })
    }
  }
}
