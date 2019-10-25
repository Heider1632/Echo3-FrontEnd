import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueI18n from 'vue-i18n'
import es from './translate/es'
import en from './translate/en'
// import AOS from 'aos'
import 'aos/dist/aos.css'
import Animacion from './components/Animacion.vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://tbe.echo.carinalab.co/graphql'
axios.defaults.baseURL = 'http://localhost:3015/graphql'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token
// axios.defaults.headers.common['Token'] = store.state.token

Vue.component('animacion', Animacion)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(Vuetify, {
  iconfont: 'fa'
})
// MULTI-LENGUAJE
const i18n = new VueI18n({
  locale: 'es',
  messages: {
    es,
    en
  }
})
export default i18n

new Vue({
  router,
  store,
  i18n,
  mounted () {
    // AOS.init()
    store.dispatch('actualizarEventos')
  },
  render: h => h(App)
}).$mount('#app')
