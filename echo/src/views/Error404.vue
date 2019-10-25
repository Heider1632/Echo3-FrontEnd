<template>
    <v-container>
        <v-layout column text-xs-center>
            <v-flex xs12 class="mb-3">
                <v-icon color="primary" size="150px">fas fa-exclamation-triangle</v-icon>
            </v-flex>
            <v-flex xs12 class="mb-3">
                <h1 class="display-4">{{$t('error.titulo')}}</h1>
            </v-flex>
            <v-flex xs12 class="mb-3">
                <h2 class="headline">{{$t('error.descripcion')}}</h2>
            </v-flex>
            <v-flex xs12>
                <v-btn large round color="secondary" to="/">{{$t('error.inicio')}}</v-btn>
                <v-btn large round color="secondary" to="/acceso">{{$t('error.acceso')}}</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
