<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 class="mb-3">
        <h1 class="text-xs-center">{{$t('menu.crearEntrevista')}}</h1>
        <h2>ID Evento: {{this.$route.params.idEvento}}</h2>
      </v-flex>
      <v-flex xs12 class="my-3" name="Titulo">
        <v-text-field
          solo
          v-model="titulo"
          :label="$t('crearEntrevista.titulo')"
          :hint="$t('crearEntrevista.tituloEjemplo')"
        />
      </v-flex>
      <v-flex xs12 class="mb-3" name="Meta">
        <v-text-field solo v-model="meta" type="number" :label="$t('crearEntrevista.meta')"/>
      </v-flex>
      <v-flex xs12 class="my-3" name="Base de Preguntas">
        <v-divider />
        <h2 class="text-xs-center my-3">{{$t('crearEntrevista.basePreguntas')}}</h2>
        <v-select
        solo
        v-model="preguntasSeleccionadas"
        multiple
        :items="preguntas"
        item-text="text"
        return-object
        :label="$t('crearEntrevista.seleccionaPregunta')"/>
      </v-flex>
      <v-flex xs12 class="my-3" name="Nueva Pregunta">
        <v-divider />
        <h2 class="text-xs-center my-3">{{$t('crearEntrevista.nuevaPregunta')}}</h2>
        <v-text-field
        v-model="texto"
        solo
        :label="$t('crearEntrevista.pregunta')"
        :hint="$t('crearEntrevista.preguntaEjemplo')"
        />
        <v-select v-model="tipoPregunta" :items="tiposDePregunta" item-text="title" item-value="id" solo :label="$t('crearEntrevista.tipoDePregunta')"/>
        <v-layout row>
          <v-flex xs6 align="center">
            <v-checkbox v-model="requerido" :label="$t('crearEntrevista.requerido')" color="primary"/>
          </v-flex>
          <v-flex xs6>
            <v-checkbox v-model="seleccion" :label="$t('crearEntrevista.seleccion')" color="primary"/>
          </v-flex>
        </v-layout>
        <v-combobox
        v-if="seleccion"
        v-model="respuestas"
        :label="$t('crearEntrevista.respuestas')"
        solo
        multiple
        chips
        deletable-chips
        append-icon
        :search-input.sync="previo"
        @keyup.tab="updateTags"
        @paste="updateTags"/>
        <v-btn block color="primary" @click="nuevaPregunta">{{ $t('crearEntrevista.nuevaPregunta')}}</v-btn>
      </v-flex>
      <v-flex xs12 class="mb-3" name="Listado Preguntas">
        <v-data-table
          :headers="encabezado"
          :items="preguntasSeleccionadas"
          class="elevation-1"
          no-data-text="No hay preguntas, aún."
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">
              <v-icon v-if="props.item.required">fas fa-check</v-icon>
              <v-icon v-else>fas fa-times</v-icon>
            </td>
            <td class="text-xs-center">
              <span v-for="i in props.item.options" :key="i"><v-chip>{{i}}</v-chip></span>
            </td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="eliminarPregunta(props.item)">
                <v-icon color="grey">fas fa-trash-alt</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 name="Finalizar">
        <v-btn
          @click="crearEntrevista"
          block
          round
          large
          color="primary"
        >{{$t('crearEntrevista.crearEntrevista')}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'crearEntrevista',
  data () {
    return {
      titulo: null,
      meta: null,
      publico: null,
      preguntas: [],
      encabezado: [
        { text: this.$i18n.t('crearEntrevista.pregunta'), value: this.$i18n.t('crearEntrevista.pregunta'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.requerido'), value: this.$i18n.t('crearEntrevista.requerido'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.respuestas'), value: this.$i18n.t('crearEntrevista.respuestas'), align: 'center' },
        { text: this.$i18n.t('crearEntrevista.acciones'), value: this.$i18n.t('crearEntrevista.acciones'), align: 'center', sortable: false }
      ],
      preguntasSeleccionadas: [],
      idPreguntas: [],
      texto: '',
      requerido: false,
      seleccion: false,
      tipoPregunta: null,
      respuestas: [],
      previo: '',
      tiposDePregunta: [
        { id: 'demographic', title: 'Demográfico' },
        { id: 'opinion', title: 'Opinión' }
      ]
    }
  },
  watch:{
    preguntasSeleccionadas(val){
      if(val.length !== 0){
        this.preguntasSeleccionadas.map(pregunta => {
          let found = this.idPreguntas.find(item => item == pregunta._id)
          if(!found){
             this.idPreguntas.push(pregunta._id)
          }
        })
      }
    }
  },
  methods: {
    ...mapMutations(['setEntrevista', 'setAlerta', 'setTextoAlerta']),
    crearEntrevista () {
      var entrevista = {
        name: this.titulo,
        Event: this.$route.params.idEvento,
        Question: this.idPreguntas,
        goalInterview: parseInt(this.meta),
        //kind: this.publico
      }

      console.log(entrevista)
      axios.post('/', {
        query: `mutation {
          createInterview(
            interview: {
              name: "${entrevista.name}"
              Event: "${entrevista.Event}"
              Question: "${entrevista.Question}"
              goalInterview: ${entrevista.goalInterview}
            }
          ){
            _id
          }
        }`
      })
        .then(respuesta => {
          console.log(respuesta)
          this.setAlerta()
          this.setTextoAlerta('Entrevista Publicado Correctamente con el ID: ' + respuesta.data.data.createInterview._id)
        })
        .catch(error => {
          this.setAlerta()
          this.setTextoAlerta(error)
        })
    },
    eliminarPregunta (pregunta) {
      for (let i = 0; i < this.preguntasSeleccionadas.length; i++) {
        if (this.preguntasSeleccionadas[i]._id === pregunta._id) {
          this.preguntasSeleccionadas.splice(i, 1)
        }
      }

      for (let i = 0; i < this.idPreguntas.length; i++) {
        if (this.idPreguntas[i] === pregunta._id) {
          this.idPreguntas.splice(i, 1)
        }
      }
    },
    nuevaPregunta () {
      if (this.texto === null || this.tipoPregunta === null) {
        this.setAlerta()
        this.setTextoAlerta('Completa todos los campos primero')
      } else {
        var pregunta = null
        if (!this.seleccion) {
          pregunta = {
            text: this.texto,
            topic: this.tipoPregunta,
            scope: 'open',
            options: [],
            required: this.requerido
          }
        } else {
          pregunta = {
            text: this.texto,
            topic: this.tipoPregunta,
            scope: 'choice',
            options: this.respuestas,
            required: this.requerido
          }
        }
        axios.post('/', {
          query: `mutation {
            createQuestion(
              question: {
                text: "${pregunta.text}"
                topic: "${pregunta.topic}"
                scope: "${pregunta.scope}"
                options: "${pregunta.options}"
                required: ${pregunta.required}
              }) {
                _id
              }
          }`
        })
          .then(respuesta => {
            this.setAlerta()
            this.setTextoAlerta('Pregunta Añadida Correctamente')
            this.preguntasSeleccionadas.push(respuesta.data.data.createQuestion)
            this.idPreguntas.push(respuesta.data.data.createQuestion._id)
            this.texto = null
            this.tipoDePregunta = null
            this.respuestas = []
            this.requerido = false
            this.seleccion = false
          })
          .catch(error => {
            console.log(error)
            this.setAlerta()
            this.setTextoAlerta(error)
          })
      }
    },
    updateTags () {
      this.$nextTick(() => {
        this.respuestas.push(this.previo)
        this.$nextTick(() => {
          this.previo = ''
        })
      })
    }
  },
  mounted () {
    axios.post('/', {
      query: `{
          questions{
            _id
            topic
            text
            scope
            options
          }
        }`
    })
      .then(respuesta => {
        this.preguntas = respuesta.data.data.questions
      })
      .catch(error => {
        this.setAlerta()
        this.setTextoAlerta(error)
      })
  }
}
</script>
