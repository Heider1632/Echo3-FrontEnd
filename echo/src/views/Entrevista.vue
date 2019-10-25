<template>
    <v-container fill-height>
        <v-layout column>
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
                                        <v-flex xs12 v-for="(i, index) in entrevista.campos" :key="i.pregunta">
                                            <v-text-field
                                            :label="i.pregunta"
                                            v-model="respuestasCampos[index]"
                                            :required="i.requerido"
                                            solo
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 v-for="(i, index) in entrevista.selects" :key="i.pregunta">
                                            <v-select
                                            :items="i.respuestas"
                                            :label="i.pregunta"
                                            :required="i.requerido"
                                            v-model="respuestasSelects[index]"
                                            solo
                                            ></v-select>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'entrevista',
  data () {
    return {
      entrevista: {
        campos: [],
        selects: [],
        respuestasCampos: [],
        respuestasSelects: []
      },
      pasos: 1
    }
  },
  computed: {
    ...mapGetters(['getEntrevistas', 'getRespuestasCampos', 'getRespuestasSelects', 'getRespuestasPreguntas'])
  },
  mounted () {
    var entrevistas = this.getEntrevistas
    for (let i = 0; i < entrevistas.length; i++) {
      if (entrevistas[i].idEntrevista === this.$route.params.idEntrevista) {
        this.entrevista = entrevistas[i]
      }
    }
  },
  methods: {
    ...mapMutations(['setRespuestasCampos', 'setRespuestasSelects']),
    ...mapActions(['nuevoParticipante']),
    siguiente () {
      this.setRespuestasCampos(this.respuestasCampos)
      this.setRespuestasSelects(this.respuestasSelects)
      this.nuevoParticipante()
      this.pasos = 2
    },
    finalizar(){
      alert('finalizo')
    }
  }
}
</script>

<style>

</style>
