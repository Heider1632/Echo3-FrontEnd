<template>
    <v-container fluid>
      <v-layout justify-center row wrap>
        <v-flex xs12 md6 lg4 v-for="(i, index) in getEventos" :key="i.id" class="pa-3 text-xs-center">
          <v-card class="pa-2 flexcard" hover @click="irEvento(index)" height="100%">
          <v-card-title>
            <v-flex xs12 class="mb-2">
              <h2 class="primary--text">{{i.title}}</h2>
            </v-flex>
          </v-card-title>
          <v-card-text class="grow">
            <v-layout column>
              <v-flex xs12>
                <p style="font-size:16px;margin-bottom:4px;">{{i.country}} - {{i.departament}} - {{i.city}}</p>
              </v-flex>
              <v-flex xs12>
                <p style="font-size:16px;margin-bottom:4px;">{{$t('eventos.lugar')}}: {{i.place}}</p>
              </v-flex>
              <v-flex xs12 class="mb-3">
                <p style="font-size:16px;margin-bottom:4px;">{{$t('eventos.del')}} {{i.startDate}} {{$t('eventos.al')}} {{i.endDate}}</p>
              </v-flex>
              <v-divider />
              <v-flex xs12 class="mt-3">
                <p style="font-size:15px;">{{i.description}}</p>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
              <v-flex xs12 class="text-xs-center">
                <v-btn class="mx-3 mb-3" round color="secondary" v-for="e in i.Interview" :key="e._id" @click="verEntrevista(e._id)">{{e.name}}</v-btn>
              </v-flex>
          </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'eventos',
  methods: {
    verEntrevista (idEntrevista) {
      const menu = `${this.$i18n.t('alias.entrevista')}/${idEntrevista}`
      this.$router.push(menu)
    },
    irEvento (index) {
      const menu = `${this.$i18n.t('alias.evento')}/${this.getEventos[index]._id}`
      this.$router.push(menu)
    }
  },
  computed: {
    ...mapGetters(['getEventos'])
    // eventos () {
    //   var eventos = []
    //   if (this.getEventos) {
    //     eventos = JSON.parse(JSON.stringify(this.getEventos))
    //     var entrevistas = JSON.parse(JSON.stringify(this.getEntrevistas))
    //     if (this.getEntrevistas) {
    //       var listadoEntrevistas = []
    //       for (let o = 0; o < entrevistas.length; o++) {
    //         listadoEntrevistas.push({
    //           idEntrevista: entrevistas[o].idEntrevista,
    //           idEvento: entrevistas[o].idEvento,
    //           titulo: entrevistas[o].titulo,
    //           idEncuestadores: entrevistas[0].idEncuestadores
    //         })
    //       }
    //       eventos.forEach(evento => {
    //         listadoEntrevistas.forEach(entrevista => {
    //           if (entrevista.idEvento === evento.id) {
    //             if (evento.entrevistas === undefined) {
    //               evento['entrevistas'] = []
    //               evento.entrevistas.push(entrevista)
    //             } else {
    //               if (evento.entrevistas.find(e => e.idEntrevista === entrevista.idEntrevista) === undefined) {
    //                 evento.entrevistas.push(entrevista)
    //               }
    //             }
    //           }
    //         })
    //       })
    //     }
    //   }
    //   return eventos
    // }
  }
}
</script>

<style scoped>
.v-card__actions .v-btn + .v-btn {
  margin-left: 0px !important;
}
</style>
