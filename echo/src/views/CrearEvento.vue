<template>
    <v-container>
        <v-layout column>
            <v-flex xs12 class="mb-3">
                <v-text-field solo v-model="title" :label="$t('crearEvento.titulo')" />
            </v-flex>
            <v-flex xs12 class="mb-3">
                <v-textarea solo v-model="description" :label="$t('crearEvento.descripcion')" />
            </v-flex>
            <v-layout row wrap>
            <v-flex xs12 lg6 class="mb-3">
                <h3 class="headline">{{$t('crearEvento.fechaInicio')}}</h3>
                <v-date-picker v-model="startDate" landscape reactive color="primary"/>
            </v-flex>
            <v-flex xs12 lg6 class="mb-3">
                <h3 class="headline">{{$t('crearEvento.fechaFinalizacion')}}</h3>
                <v-date-picker v-model="endDate" landscape reactive color="primary"/>
            </v-flex>
            </v-layout>
            <v-flex xs12 class="mb-3">
                <v-autocomplete solo :items="getPaises" item-text="name" item-value="id" v-model="country" :label="$t('crearEvento.pais')" :hint="$t('crearEvento.pais')" />
            </v-flex>
            <v-flex xs12 class="mb-3" v-if="country">
                <v-autocomplete solo :items="Object.keys(getPaises[country - 1].states)" v-model="departament" :label="$t('crearEvento.departamento')" :hint="$t('crearEvento.departamento')" />
            </v-flex>
            <v-flex xs12 class="mb-3" v-if="departament">
                <v-autocomplete solo :items="getPaises[country - 1].states[departament]" v-model="city" :label="$t('crearEvento.ciudad')" :hint="$t('crearEvento.ciudad')" />
            </v-flex>
            <v-flex xs12 class="mb-3">
                <v-text-field solo v-model="place" :label="$t('crearEvento.lugar')"/>
            </v-flex>
            <v-flex xs12 class="mb-3">
                <v-btn block @click="crearEvento" color="primary" large round :loading="getCargando">{{$t('crearEvento.crearEvento')}}</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'crearEvento',
  data () {
    return {
      title: null,
      description: null,
      startDate: null,
      endDate: null,
      country: null,
      departament: null,
      city: null,
      place: null
    }
  },
  methods: {
    ...mapMutations(['setAlerta', 'setTextoAlerta', 'setCargando', 'pushEvento']),
    crearEvento () {
      this.setCargando(true)
      axios.post('/', {
        query: `mutation {
          createEvent(event: {
            title:"${this.title}", 
            description:"${this.description}",
            startDate:"${this.startDate}",
            endDate:"${this.endDate}",
            country:"${this.getPaises[this.country - 1].name}",
            departament:"${this.departament}",
            city:"${this.city}",
            place:"${this.place}",
          }) {
            _id
          }
        }`
      })
        .then(respuesta => {
          this.setAlerta()
          this.setTextoAlerta('Evento Publicado Correctamente')
          const evento = {
            _id: respuesta.data.data.createEvent._id,
            title: this.title,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            country: this.getPaises[this.country - 1].name,
            departament: this.departament,
            city: this.city,
            place: this.place
          }
          this.pushEvento(evento)
          this.$router.push('/evento/' + respuesta.data.data.createEvent._id)
          this.title = null
          this.description = null
          this.startDate = null
          this.endDate = null
          this.country = null
          this.departament = null
          this.city = null
          this.place = null
        })
        .catch(error => {
          this.setAlerta()
          this.setTextoAlerta(error)
        })
    }
  },
  computed: {
    ...mapGetters(['getPaises', 'getCargando'])
  }
}
</script>
