<template>
    <v-container class="pa-0 ma-0 containerNavegacion" fluid fixed>
    <v-layout column>
      <v-toolbar style="z-index:3">
        <v-img
        alt="Logotipo"
        :src="logo"
        contain
        max-height="80%"
        position="left"
        class="ml-5"
        />
        <v-spacer />
        <v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer" />
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat v-for="item in menu" :key="item.titulo" :to="$t('alias.'+item.titulo)">{{ $t('menu.'+item.titulo)}}</v-btn>
            <v-btn flat @click="salir()">Salir</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-navigation-drawer right temporary absolute v-model="drawer" syle="z-index:5">
      <v-list class="pt-0 dense">
        <v-divider />
        <v-list-tile v-for="item in menu" :key="item.titulo" @click="$router.push($t('alias.'+item.titulo))">
          <v-list-tile-action>
            <v-icon>{{item.icono}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t('menu.'+item.titulo)}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="salir()">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Salir
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile @click="toggleDrawer">
          <v-list-tile-action>
            <v-icon>fas fa-caret-left</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cerrar Menú</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    </v-layout>
    </v-container>
</template>

<script>
import logo from '@/assets/logo.svg'
export default {
  name: 'coordinador-navigation',
  data () {
    return {
      drawer: false,
      logo,
      menu: [
        { titulo: 'inicio', icono: 'fas fa-home' },
        { titulo: 'acercade', icono: 'fas fa-sign-in-alt' },
        { titulo: 'coordinar', icono: 'far fa-compass' },
        { titulo: 'eventos', icono: 'far fa-calendar-alt' },
        { titulo: 'perfil', icono: 'far fa-user' }
      ]
    }
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    salir () {
      this.$store.dispatch('salir')
    }
  }
}
</script>
