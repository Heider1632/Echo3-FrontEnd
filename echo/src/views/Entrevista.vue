<template>
    <v-container fill-height v-if="entrevista">
        <v-layout column>
            <v-flex xs12>
              <h1 align="center">{{entrevista.name}}</h1>
              <h3 align="center">Meta: {{entrevista.goalInterview}}</h3>
            </v-flex>
            <v-flex xs12>
                <v-stepper v-model="pasos">
                    <v-stepper-header>
                    <v-stepper-step :complete="pasos > 1" step="1">
                        {{$t('entrevista.basico')}}
                    </v-stepper-step>
                    <v-divider />
                    <v-stepper-step :complete="pasos > 2" step="2">
                        {{$t('entrevista.preguntas')}}
                    </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <v-layout column>
                                        <v-flex xs12 v-for="(i, index) in demographic" :key="i.text">
                                            <v-text-field
                                            v-if="i.scope === 'open'"
                                            :label="i.text"
                                            v-model="demographicAnswers[index]"
                                            :required="i.required"
                                            solo/>
                                            <v-select
                                            v-else
                                            :items="i.options"
                                            :label="i.text"
                                            :required="i.required"
                                            v-model="demographicAnswers[index]"
                                            solo/>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <v-btn @click="siguiente" class="mt-3">{{$t('entrevista.siguiente')}}</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <v-layout column>
                                        <v-flex xs12 class="mb-5" v-for="(i, index) in entrevista.preguntas" :key="i.pregunta">
                                            <h2 class="mb-2">{{i.pregunta}}</h2>
                                            <v-textarea solo v-model="respuestasPreguntas[index]"/>

                                            <v-divider class="mt-3"/>
                                            <!-- ODS -->
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <v-btn @click="finalizar" class="mt-3">{{$t('entrevista.finalizar')}}</v-btn>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'entrevista',
  data () {
    return {
      entrevista: null,
      demographic: [],
      opinion: [],
      demographicAnswers: [],
      opinionAnswers: [],
      pasos: 1
    }
  },
  computed: {
    ...mapGetters(['getEventos', 'getUsuario'])
  },
  mounted () {
    var eventos = this.getEventos
    for (let i = 0; i < eventos.length; i++) {
      for (let e = 0; e < eventos[i].Interview.length; e++) {
        if (eventos[i].Interview[e]._id === this.$route.params.idEntrevista) {
          this.entrevista = eventos[i].Interview[e]
        }
      }
    }
    for (let i = 0; i < this.entrevista.Question.length; i++) {
      if (this.entrevista.Question[i].topic === 'demographic') {
        this.demographic.push(this.entrevista.Question[i])
      } else {
        this.opinion.push(this.entrevista.Question[i])
      }
    }
  },
  methods: {
    siguiente () {
      var respuestas = []
      for (let i = 0; i < this.demographic.length; i++) {
        respuestas.push({
          label: this.demographic[i].text
        })
      }
      for (let i = 0; i < this.demographicAnswers.length; i++) {
        respuestas[i].value = this.demographicAnswers[i]
      }
      const encuestadorId = this.getUsuario._id
      axios.post('/', {
        query: `mutation {
                createSurveyed(
                  surveyed: {
                    user: "${encuestadorId}"
                    data: ${respuestas}
                  }
                ) {
                _id
                incomingMessage {
                    status
                    message
                }
                }
            }`
      })
        .then(respuesta => {
          console.log(respuesta)
          this.setAlerta()
          this.setTextoAlerta(respuesta.data.data.createSurveyed.incomingMessage.message)
          if (respuesta.data.data.createSurveyed.incomingMessage.status === '200') {
            console.log(respuesta.data.data.createSurveyed._id)
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.pasos = 2
    },
    finalizar () {
      alert('finalizo')
    }
  }
}
</script>

<style>

</style>
