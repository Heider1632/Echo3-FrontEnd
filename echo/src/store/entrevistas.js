import axios from 'axios'
export default {
  state: {
    eventos: [],
    entrevistas: []
  },
  getters: {
    getEntrevistas: (state) => {
      return state.entrevistas
    },
    getEventos: (state) => {
      return state.eventos
    }
  },
  mutations: {
    setEntrevista: (state, entrevista) => {
      state.entrevistas.push(entrevista)
    },
    setEventos: (state, eventos) => {
      state.eventos = eventos
    },
    pushEvento: (state, evento) => {
      state.eventos.push(evento)
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
    actualizarEntrevistas({ commit }) {
      axios.post('/', {
        query: `query {
          {
            interviews{
              _id
              name
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
        commit('setEntrevistas', respuesta.data.data.interviews)
      }).catch(error => {
        commit('setAlerta')
        commit('setTextoAlerta', error)
      })
    }
  }
}
