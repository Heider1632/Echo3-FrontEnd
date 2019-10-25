<template>


</template>
<script>
export default {
    name: 'Captura',
    props: {
        pregunta: pregunta
    },
    data: () => ({
        textoBotonAudio: 'Escuchar',
        colorBotonDetener: 'primary',
        colorBotonEditar: 'primary',
        colorBotonLimpiar: 'primary',
        colorBotonFinalizar: 'primary',
        botonAudioDesabilitado: false,
        botonDetenerDesabilitado: true,
        botonEditarDesabilitado: true,
        botonLimpiarDesabilitado: true,
        botonFinalizarDesabilitado: true,
        respuesta: {},
        tamanioIcono: 80,
        altoBarraPorcentaje: 20,
        reconocimiento: null,
        textoAnterior: '',
        textoIntermedio: '',
        textoFinal: '',
        textoEditado: '',
        reconociendo: false,
        ignorarFinal: null,
        dosLineas: `/\n\n/g`,
        unaLinea: `/\n/g`,
        primerLetra: `/\S/`,
        colorBotonAudio: 'red',
        traduccionesPendientes: 0,
        datosDetalleResumen: {},
        ventanas: false,
        hayRespuestas: false,
        textoDeRetorno: '',
        cantidadDeEnvios: 0,
        cadaTantasPalabras: 20,
        autorestart: false,
        lastStartedAt: '',
        timeSinceLastStart: '',
        datos: null,
        editando: false
    }),
    mounted(){
        if (!('SpeechRecognition' in window)) {
            if (!('webkitSpeechRecognition' in window)) {
                // Indique que se require actualizar el navegador
                console.log('No se logró iniciar webkitSpeechRecognition')
                return
            } else {
                /* eslint new-cap: ["error", { "newIsCapExceptions": ["webkitSpeechRecognition"] }] */
                this.reconocimiento = new window.webkitSpeechRecognition()
            }
        } else {
        this.reconocimiento = new window.SpeechRecognition()
        }
        // this.reconocimiento.continuous = true // ideal para computador
        this.reconocimiento.continuous = true
        this.reconocimiento.interimResults = true
        this.reconocimiento.lang = 'es-CO'
        this.reconocimiento.onstart = this.alIniciarReconocimiento
        this.reconocimiento.onerror = this.alErrorEnReconocimiento
        this.reconocimiento.onend = this.alFinalizarReconocimiento
        this.reconocimiento.onresult = this.alResultadoDelReconocimiento
    },
    methods: {
        controlReconocimiento (accion) {
            if (accion === 'iniciar') {
                if (this.textoDeRetorno === '' || this.textoDeRetorno === undefined) {
                this.textoAnterior = ''
                } else {
                this.textoAnterior = this.textoDeRetorno
                }
                // console.log('Iniciar Reconocimiento')
                this.textoBotonAudio = 'Escuchando'
                this.reconocimiento.start()
                this.botonAudioDesabilitado = true
                this.botonDetenerDesabilitado = false
                this.botonLimpiarDesabilitado = true
                this.botonEditarDesabilitado = true

                this.reconociendo = true
            } else if (accion === 'detener') {
                this.reconociendo = false
                this.textoBotonAudio = 'Escuchar'
                this.botonAudioDesabilitado = false
                this.botonDetenerDesabilitado = true
                this.botonLimpiarDesabilitado = false
                this.botonEditarDesabilitado = false
                this.botonFinalizarDesabilitado = false
                this.reconocimiento.stop()
            } else if (accion === 'limpiar') {
                this.limpiarRespuesta()
            } else if(accion === 'editar'){
                console.log(this.editando)

                if(this.editando == false){
                
                this.editando = true;
                this.botonAudioDesabilitado = false
                this.botonDetenerDesabilitado = true
                this.botonLimpiarDesabilitado = true
                this.botonEditarDesabilitado = false
                this.botonFinalizarDesabilitado = true
                this.reconociendo = false
                this.textoBotonAudio = 'Editando'
                this.reconocimiento.stop()
                this.textoEditado = this.textoDeRetorno;

                } else {
                this.botonAudioDesabilitado = false
                this.textoBotonAudio = 'Escuchar'
                this.botonDetenerDesabilitado = true
                this.botonLimpiarDesabilitado = false
                this.botonEditarDesabilitado = true
                this.botonFinalizarDesabilitado = false
                this.remitirACarina(this.textoEditado, this.textoDeRetorno)
                }
                
            }
        },
        capitalizar (s) {
        return s.replace(this.primerLetra, (m) => m.toUpperCase())
        },
        quebrarLinea (s) {
        return s.replace(this.dosLineas, '<p></p>').replace(this.unaLinea, '<br>')
        },
        alResultadoDelReconocimiento (evento) {
        if (typeof (event.results) === 'undefined') { //Something is wrong…
            console.warn('we have an undefined result')
            this.restablecerAudio();
            return;
        }
        this.textoIntermedio = ''
        this.textoFinal = ''
        for (var i = evento.resultIndex; i < evento.results.length; ++i) {
            if (evento.results[i].isFinal) {
            this.textoFinal += event.results[i][0].transcript
            } else {
            this.textoIntermedio += event.results[i][0].transcript
            }
        }
        this.textoDeRetorno = this.quebrarLinea(this.textoIntermedio)
        if (this.textoFinal !== '') {
            this.textoFinal = this.capitalizar(this.textoFinal)
            this.textoFinal = this.quebrarLinea(this.textoFinal)
            this.textoDeRetorno = this.textoFinal
            this.respuestasDisponibles = true
        }
        // console.log('alResultadoDelReconocimiento')
        },
        alIniciarReconocimiento () {
        this.reconociendo = true
        // this.textoDeRetorno = ''
        // console.log('alIniciarReconocimiento')
        },
        restablecerAudio(reason){
        var _this = this;
        console.log('restartListen');
        // play nicely with the browser, and never restart annyang automatically more than once per second
        this.timeSinceLastStart = new Date().getTime() - _this.lastStartedAt;
        _this.autorestartCount += 1;
        if (_this.autorestartCount % 10 === 0) {
            console.warn('Speech Recognition is repeatedly stopping and starting.maybe you have two windows with speech recognition open?');
            if (reason === 'network') {
            alert('A network error occured. Please reconnect and refresh the browser');
            }
        }

        if (timeSinceLastStart < 1000) {
            setTimeout(function () {
            _this.alIniciarReconocimiento();
            }, 1000 - timeSinceLastStart);
        } else {
            _this.alIniciarReconocimiento();
        }
        },
        remitirACarina (textoActual, edited) {
        if(edited !== ''){
            this.datos = {
            datos: {
            ...this.asistente,
            idPregunta: this.idPregunta,
            textoActual: edited
            },
            original: textoActual,
            descripcion: edited
            }
        } else {
            this.datos = {
            datos: {
                ...this.asistente,
                idPregunta: this.idPregunta,
                textoActual: textoActual
            },
            original: null,
            descripcion: textoActual
            }
        }
        },
        alFinalizarReconocimiento () {
        // esta es una alternativa para el registro en el store de los cambios
        this.reconociendo = false
        if (this.ignorarFinal) {
            // console.log('ignorando final, texto intermedio: ', this.textoIntermedio, ' texto final: ', this.textoFinal)
            return
        }
        // activar el boton para iniciar de nuevo
        // presentar botón de agregar, limpiar
        if (!this.textoFinal) {
            console.log('No pude escuchar nada', this.textoFinal)
            return
        }
        this.textoDeRetorno = this.textoAnterior + ' ' + this.textoFinal
        this.remitirACarina(this.textoDeRetorno, this.textoEditado)
        this.textoAnterior = ''
        // console.log('alFinalizarReconocimiento')
        },
        alErrorEnReconocimiento (evento) {
        if (evento.error === 'no-speech') {
            this.mensajeError = 'sinEscuchar'
            this.ignorarFinal = true
            this.restablecerAudio()
        }
        if (evento.error === 'audio-capture') {
            this.mensajeError = 'sinMicrofono'
            this.ignorarFinal = true
        }
        if(evento.error === 'network'){
            this.mensajeError = 'Internet'
            this.ignorarFinal = true
        }
        if (evento.error === 'not-allowed') {
            if (evento.timeStamp - this.tiempoDeInicio < 500) {
            this.mensajeError = 'bloqueado'
            } else {
            this.mensajeError = 'denegado'
            }
            this.ignorarFinal = true
        } 
        // console.log('alErrorEnReconocimiento')
        },
        ejecutarTraduccion (datos) {
        console.log('se envía al servidor: ', this.$store.state.urlServer)
        axios.post(this.$store.state.urlServer, datos)
            .then(this.procesarTraduccion)
            .catch(function (error) {
            console.log(error)
            this.traduccionesPendientes -= 1
            // console.log(this.traduccionesPendientes)
            })
        this.traduccionesPendientes += 1
        // console.log(this.traduccionesPendientes)
        },
        actualizarAnalisisSinResultados (datos) {
        // console.log('actualizarAnalisisSinResultados, inicio: ', datos)
        let respuesta = {
            ...datos.datos,
            respuesta: datos.descripcion,
            pregunta: this.preguntas[datos.datos.idPregunta],
            analisis: {
            evidencias: {},
            resultados: {
                metas: ['meta_0_0'],
                ods: ['ods_0'],
                words: {}
            }
            },
            ods: [
            {
                cantidad: 0,
                metas: ['meta_0_0'],
                nombre: 'ods_0',
                porcentaje: 100
            }
            ],
            cantidad: 0,
            palabras: datos.palabras,
            baseDeDatos: this.baseDeDatos
        }
        this.mensajeError = 'Echo no logra traducir lo escuchado en términos de ODS\'s, ¿podría por favor brindarnos su respuesta en otras palabras?'
        // console.log('actualizarAnalisisSinResultados, final: ', pregunta)
        // console.log('actualizarAnalisis: ', respuesta)
        this.respuesta = respuesta
        this.hayRespuestas = true
        this.traduccionesPendientes -= 1
        this.registrarRespuestasBD(respuesta)
        // console.log('Finalizó actualizarAnalisisSinResultados')
        },
        compararPorPorcentaje (a, b) {
        let numA = parseFloat(a.porcentaje)
        let numB = parseFloat(b.porcentaje)
        return numB - numA
        },
        ordenarOdsPorPorcentaje (ods) {
        let porcentajesOrdenados = []
        let porcentajes = []
        ods.forEach(ods => {
            porcentajes.push({porcentaje: ods.porcentaje, nombre: ods.nombre})
        })
        porcentajes = porcentajes.sort(this.compararPorPorcentaje).slice(0, 5)
        porcentajes.forEach(porcentaje => {
            porcentajesOrdenados.push(ods.find(ods => ods.nombre === porcentaje.nombre))
        })
        return porcentajesOrdenados
        },
        actualizarAnalisis (datos) {
        let respuesta = {
            ...datos.datos,
            respuesta: datos.descripcion,
            original: this.datos.original,
            pregunta: this.preguntas[datos.datos.idPregunta],
            ods: this.agregarPalabrasEnOds(datos.ods, datos.palabras),
            analisis: datos.analisis,
            palabras: datos.palabras
        }
        respuesta.ods = this.ordenarOdsPorPorcentaje(respuesta.ods)
        respuesta.baseDeDatos = this.baseDeDatos
        this.respuesta = respuesta
        // console.log('actualizarAnalisis: ', respuesta)
        this.hayRespuestas = true
        this.traduccionesPendientes -= 1
        this.registrarRespuestasBD(respuesta)
        // console.log('actualizarAnalisis')
        },
        finalizar(){
        if(this.datos !== null){
            console.log(this.datos)
            this.ejecutarTraduccion(this.datos)
        }
        },
        procesarTraduccion (response) {
        // console.log(response)
        if (response) {
            // console.log('Respuesta desde Carina: ', response)
            if (response.data.response.estado.codigo === 200) {
            // console.log('se llama a actualizarAnalisis')
            // console.log(response.data.response, 'pasa a actualizar analisis')
            this.actualizarAnalisis(response.data.response)
            } else {
            // console.log('se llama a actualizarAnalisisSinResultados')
            // console.log(response.data.response)
            this.actualizarAnalisisSinResultados(response.data.response)
            }
        } else {
            console.log('Carina no pudo identificar relación con los ODS')
            // this.traduccionesPendientes -= 1
        }
        },
        agregarPalabrasEnOds (ods, palabras) {
        // console.log('Ods que entra: ', ods)
        let nuevoOds = [...ods]
        palabras.forEach((palabra) => {
            palabra.ods.forEach((odsActual) => {
            nuevoOds.forEach((odsCambiar) => {
                if (odsCambiar.nombre === odsActual.nombre) {
                if (odsCambiar.palabras === undefined) {
                    odsCambiar['palabras'] = []
                }
                odsCambiar.palabras.push(palabra.nombre)
                }
            })
            })
        })
        // console.log('Ods con palabras: ', nuevoOds)
        return nuevoOds
        }
    }
}
</script>

<style>

</style>