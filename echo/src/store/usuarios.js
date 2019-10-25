export default {
  state: {
    usuario: {
      role: 'invitado'
    }
  },
  getters: {
    getRol: (state) => {
      return state.usuario.role
    },
    getUsuario: (state) => {
      return state.usuario
    },
    getId: (state) => {
      return state.usuario.id
    }
  },
  mutations: {
    setRol: (state, rol) => {
      state.usuario.role = rol
    },
    setUsuario: (state, usuario) => {
      state.usuario = usuario
    }
  },
  actions: {
  }
}
