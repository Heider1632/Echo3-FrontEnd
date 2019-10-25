import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Inicio from './views/Inicio.vue'
import AcercaDe from './views/AcercaDe.vue'
import Acceso from './views/Acceso.vue'
import Entrevista from './views/Entrevista.vue'
import Administracion from './views/Administracion.vue'
import CrearEntrevista from './views/CrearEntrevista.vue'
import CrearEvento from './views/CrearEvento.vue'
import Evento from './views/Evento.vue'
import Resultado from './views/Resultado.vue'
import Eventos from './views/Eventos.vue'
import Perfil from './views/Perfil.vue'
import Coordinar from './views/Coordinar.vue'
import error404 from './views/Error404.vue'
import i18n from '@/main'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      meta: { Auth: false }
    },
    {
      path: '/acerca',
      name: 'acercade',
      alias: '/about',
      component: AcercaDe,
      meta: { Auth: false }
    },
    {
      path: '/acceso',
      name: 'acceso',
      alias: '/login',
      component: Acceso,
      meta: { Auth: false }
    },
    {
      path: '/administracion',
      name: 'administracion',
      alias: '/administration',
      component: Administracion,
      meta: { Auth: true, rol: ['administrador'] }
    },
    {
      path: '/entrevista/:idEntrevista',
      name: 'entrevista',
      alias: '/interview/:idEntrevista',
      component: Entrevista,
      meta: { Auth: true, rol: ['administrador', 'coordinador', 'encuestador'] }
    },
    {
      path: '/resultado/:idEntrevista',
      name: 'resultado',
      alias: '/result/:idEntrevista',
      component: Resultado,
      meta: { Auth: true, rol: ['administrador', 'coordinador'] }
    },
    {
      path: '/crearentrevista/:idEvento',
      name: 'crearEntrevista',
      alias: '/createinterview/:idEvento',
      component: CrearEntrevista,
      meta: { Auth: true, rol: ['administrador'] }
    },
    {
      path: '/crearevento',
      name: 'crearEvento',
      alias: '/createevent',
      component: CrearEvento,
      meta: { Auth: true, rol: ['administrador'] }
    },
    {
      path: '/evento/:idEvento',
      name: 'evento',
      alias: '/event/:idEvento',
      component: Evento,
      meta: { Auth: true, rol: ['administrador', 'coordinador', 'encuestador', 'operador'] }
    },
    {
      path: '/eventos',
      name: 'eventos',
      alias: '/events',
      component: Eventos,
      meta: { Auth: true, rol: ['administrador', 'coordinador', 'encuestador', 'operador'] }
    },
    {
      path: '/perfil',
      name: 'perfil',
      alias: '/profile',
      component: Perfil,
      meta: { Auth: true, rol: ['administrador', 'coordinador', 'encuestador', 'operador'] }
    },
    {
      path: '/coordinar',
      name: 'coordinar',
      alias: '/coordinate',
      component: Coordinar,
      meta: { Auth: true, rol: ['coordinador'] }
    },
    {
      path: '*',
      name: 'error404',
      component: error404,
      meta: { Auth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'Echo - ' + i18n.t('menu.' + to.name)
  if (to.meta.Auth && store.state.usuariosModulo.usuario.role === 'invitado') {
    next({ path: '/acceso' })
  } else {
    if (to.meta.rol) {
      var contador = to.meta.rol.length
      for (let i = 0; i < to.meta.rol.length; i++) {
        if (to.meta.rol[i] === store.state.usuariosModulo.usuario.role) {
          next()
          return
        }
        contador = contador - 1
        if (contador === 0) {
          next({ path: '/acceso' })
        }
      }
    } else {
      next()
    }
  }
})
export default router
