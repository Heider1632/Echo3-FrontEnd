<template>
    <v-container>
        <v-layout row wrap text-xs-center v-if="usuario">
            <v-flex xs12 class="ma-3">
                <v-avatar size="120">
                    <img :src="avatar" alt="Avatar usuario">
                </v-avatar>
            </v-flex>
            <v-flex xs12 class="pa-3">
                <h3>{{$t('perfil.rol')}}</h3>
                <h2>{{usuario.role.toUpperCase()}}</h2>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.nombre')}}</h3>
                <v-text-field solo v-model="usuario.user.name"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.email')}}</h3>
                <v-text-field solo v-model="usuario.user.email"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.celular')}}</h3>
                <v-text-field solo v-model="usuario.user.phone"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.pais')}}</h3>
                <v-text-field solo v-model="usuario.user.country"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.departamento')}}</h3>
                <v-text-field solo v-model="usuario.user.department"></v-text-field>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <h3>{{$t('perfil.ciudad')}}</h3>
                <v-text-field solo v-model="usuario.user.city"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-btn round block color="primary" @click="actualizarInfo">{{$t('perfil.actualizar')}}</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '@/assets/avatar.png'
export default {
  name: 'perfil',
  data () {
    return {
      usuario: null,
      avatar
    }
  },
  mounted () {
    this.usuario = this.getUsuario
  },
  methods: {
    actualizarInfo () {

    }
  },
  computed: {
    ...mapGetters(['getUsuario'])
  }
}
</script>
