import axios from 'axios'
export default {
  state: {
    idParticipante: '',
    respuestasCampos: [],
    respuestasSelects: [],
    respuestasPreguntas: []
  },
  getters: {
    getRespuestasCampos: (state) => {
      return state.respuestasCampos
    },
    getRespuestasSelects: (state) => {
      return state.respuestasSelects
    },
    getRespuestasPreguntas: (state) => {
      return state.respuestasPreguntas
    },
    getIdParticipante: (state) => {
      return state.idParticipante
    }
  },
  mutations: {
    setRespuestasCampos: (state, info) => {
      state.respuestasCampos = info
    },
    setRespuestasSelects: (state, info) => {
      state.respuestasSelects = info
    },
    setRespuestasPreguntas: (state, info) => {
      state.respuestasPreguntas[info.index] = info.respuesta
    },
    setIdParticipante: (state, info) => {
      state.idParticipante = info
    }
  },
  actions: {
    nuevoParticipante: ({ commit }) => {
      axios.post('/', {
        query: `mutation {
                createSurveyed() {
                _id
                incomingMessage {
                    status
                    message
                }
                }
            }`
      })
        .then(respuesta => {
          commit('setAlerta')
          commit('setTextoAlerta', respuesta.data.data.createSurveyed.incomingMessage.message)
          if (respuesta.data.data.createSurveyed.incomingMessage.status === '200') {
            commit('setIdParticipante', respuesta.data.data.createSurveyed._id)
          }
        })
    }
  }
}
