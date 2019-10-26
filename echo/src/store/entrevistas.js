import axios from 'axios'
export default {
  state: {
    eventos: [],
    preguntas: []
  },
  getters: {
    getEventos: (state) => {
      return state.eventos
    },
    getPreguntas: (state) => {
      return state.preguntas
    }
  },
  mutations: {
    setEventos: (state, eventos) => {
      state.eventos = eventos
    },
    setPreguntas: (state, preguntas) => {
      state.preguntas = preguntas
    }
  },
  actions: {
    actualizarEventos: ({ commit }) => {
      axios.post('/', {
        query: `query {
          events{
            _id
            title
            description
            startDate
            endDate
            country
            departament
            city
            Interview{
              _id
              name
              goalInterview
              Question{
                _id
                text
                required
                options
                topic
                scope
              }
            }
          }
        }`
      }).then(respuesta => {
        commit('setEventos', respuesta.data.data.events)
      }).catch(error => {
        commit('setAlerta')
        commit('setTextoAlerta', error)
      })
    },
    actualizarPreguntas ({ commit }) {
      axios.post('/', {
        query: `{
            questions{
              _id
              topic
              text
              scope
              options
            }
          }`
      })
        .then(respuesta => {
          commit('setPreguntas', respuesta.data.data.questions)
        })
        .catch(error => {
          commit('setAlerta')
          commit('setTextoAlerta', error)
        })
    }
  }
}
