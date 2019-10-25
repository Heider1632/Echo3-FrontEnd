import Vue from 'vue'
import Vuex from 'vuex'
import usuariosModulo from '@/store/usuarios'
import entrevistasModulo from '@/store/entrevistas'
import respuestasModulo from '@/store/respuestas'
import i18n from '@/main'
import paises from '@/store/paises.json'
import decode from 'jwt-decode'
import router from '../router'
// import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuariosModulo,
    entrevistasModulo,
    respuestasModulo
  },
  state: {
    idioma: 'es',
    intro: true,
    token: null,
    alerta: false,
    textoAlerta: '',
    cargando: false,
    paises
  },
  getters: {
    getPaises: (state) => {
      return state.paises
    },
    getIdioma: (state) => {
      return state.idioma
    },
    getIntro: (state) => {
      return state.intro
    },
    getToken: (state) => {
      return state.token
    },
    getAlerta (state) {
      return state.alerta
    },
    getTextoAlerta (state) {
      return state.textoAlerta
    },
    getCargando: (state) => {
      return state.cargando
    }
  },
  mutations: {
    setIdioma: (state, idioma) => {
      state.idioma = idioma
      i18n.locale = idioma
    },
    setIntro: (state) => {
      state.intro = !state.intro
    },
    setToken: (state, token) => {
      state.token = token
    },
    setAlerta: (state) => {
      state.alerta = !state.alerta
    },
    setTextoAlerta: (state, textoAlerta) => {
      state.textoAlerta = textoAlerta
    },
    setCargando: (state, estado) => {
      state.cargando = estado
    }
  },
  actions: {
    autoLogin ({ commit }) {
      let token = localStorage.getItem('token')
      if (token) {
        commit('setToken', token)
        commit('setUsuario', decode(token))
        router.push('/')
      }
      
    },
    salir({ commit }) {
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.go({ path: '/acceso'});
    }
  }
})
