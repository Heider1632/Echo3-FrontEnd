<template>
  <div>
    <v-container class="ma-0 pa-0">
      <v-layout row>
        <video class="video" autoplay muted loop height="auto" width="auto">
      <source
        src="https://firebasestorage.googleapis.com/v0/b/gau-colombia.appspot.com/o/utilidades%2Ffondo-inicio.mp4?alt=media&token=a18de15f-0254-4a28-9806-a951a82cc926"
        type="video/mp4"
      />
    </video>
    <v-flex xs10 sm6 md4 style="z-index: 3;" class="sidebar-background pa-4 mt-4 ml-4 mb-5">
      <h1 class="mb-3">{{$t('inicio.titulo')}}</h1>
      <p class="subheading">{{$t('inicio.descripcion')}}</p>
    </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Inicio',
  data () {
    return {
      email: 'andresfgiraldom@gmail.com',
      password: 'AGFM10101001',
      name: 'Andrés Giraldo',
      phone: '3106531923',
      country: 'Colombia',
      department: 'Antioquia',
      city: 'Medellín',
      role: 'Administrador',
      token: null,
      expiresToken: null
    }
  },
  computed: {
    ...mapGetters(['getIdioma'])
  },
  methods: {
    ...mapMutations(['setIdioma'])
  }
}
</script>

<style>
.video {
  background: #fff;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: -webkit-fill-available;
  transform: translateX(-50%) translateY(-50%);
  object-fit: fill;
}
</style>
