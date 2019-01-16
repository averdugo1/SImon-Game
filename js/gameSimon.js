/*
Autor: Ariel Verdugo
URL Autor: Proximamente
Tema de la clase: Juego html
Descripción: juego html de un Simon Dice que recopila los fundamentos de js
URL código: github.com/averdugo1
*/

/*PROTOCOLO DE VERIFICACIÓN DE FUNCIONAMIENTO
==================================*/
//Imprimiendo algo en la consola
console.log("inicializando archivo");


/*VARIABLE CONSTANTE CON ELEMENTOS OBTENIDOS POR ID
=====================================================*/
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
const puntuacion = 0

//swal('hola');


/*DECLARACIÓN DE CLASES PROTOTIPALES
==================================*/
class Juego {
    constructor() {
        //ahora el this esta atado al this de la clase prototipo juego
        this.inicializar = this.inicializar.bind(this)
        /*Ejecutando mis metodos*/
        this.inicializar()
        this.generarSecuencia()
        /*Esperando 0.5 segundos antes de ejecutar this.siguienteNivel */
        setTimeout(this.siguienteNivel, 500)
    }


    //Metodo que se ejecuta cuando empieza el juego
    inicializar() {
        /*LISTA DE BIND s 
        ===================*/
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        //toggle es como un switch ON, OFF
        this.toggleBtnEmpezar()
        //btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.puntuacion = 0
        this.colores = {
            celeste, // celeste: celeste
            violeta,
            naranja,
            verde
        }
    }

    //toggle es como un switch ON, OFF
    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        //Creamos un nuevo objeto Array con 10 casillas
        //rellenamos cada casilla con 0
        // Math random * 4 entrega un valor entre 0 y 3

        //map() solo funciona si el elemento del array tiene un valor asi sea 

        /*
        Ejemplo de secuencia , secuencia = [0,0,2,1]
        */
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        //this.nombreAtributo = 'valor'
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroColor(numero) {
        //Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
        switch (numero) {
            case 0:
                return 'celeste'
                //el break no hace falta porque el return hace que no se ejecute
                break;
            case 1:
                return 'violeta'
                break;
            case 2:
                return 'naranja'
                break;
            case 3:
                return 'verde'
                break;

            default:
                break;
        }
    }

    transformarColorANumero(color) {
        //Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
        switch (color) {
            case 'celeste':
                return 0
                //el break no hace falta porque el return hace que no se ejecute
                break;
            case 'violeta':
                return 1
                break;
            case 'naranja':
                return 2
                break;
            case 'verde':
                return 3
                break;

            default:
                break;
        }
    }

    iluminarSecuencia() {
        /*aplicamos i < this.nivel porque el numero del nivel 
		corresponde al numero de elementos que el usuario 
		modificara y tendra que seguir */
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroColor(this.secuencia[i])
            // Ej: const color = "verde" 
            console.log(color);
            setTimeout(() => this.iluminarColor(color), 1000 * i)
            //colocar x * i nos permite acumular tiempo en función del for
        }
    }

    iluminarColor(color) {
        //Colocando la clase que ilumina el color
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)

    }

    apagarColor(color) {
        //Quitando la clase que ilumina el color
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        //agregando un manejador de eventos
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    //los metodos que se llaman en el event listener suelen tener en la funcion un parametro uv


    eliminarEventosClick() {
        //agregando un manejador de eventos
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    //los metodos que se llaman en el event listener suelen tener en la funcion un parametro uv

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor)
        /* ¿Que resultado quiero?
		Quiero que se verifique cuando el uusuario haga click en un boton,

		y si es igual felicitarme 

		y pasar al siguiente nivel, si toque todos los de la secuencia de este nivel

		// sino seguir el nivel hasta tocar el siguiente //
		sino toco bien que me diga que perdi y acabe el juego */
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            this.puntuacion++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    // Gano!
                    this.ganoElJuego()
                } else {
                    swal('Bien!!', `Puntuacion: ${this.puntuacion} puntos \n Siguiente nivel: ${this.nivel}`, 'success')
                        .then(() => setTimeout(this.siguienteNivel, 1500))
                        //recuerda que el this fue modificado para apuntar a Juego
                }
            }
        } else {
            // perdio
            this.perdioElJuego()
        }
    }



    /*METODOS DE TIPO RENDER EN PANTALLA 
	======================================*/
    ganoElJuego() {
        //este swal es una promesa
        swal('Simon Dice', `Felicitaciones, ganaste el juego! \n Puntuacion Final: ${this.puntuacion}`, 'success')
            .then(() => {
                this.inicializar()
            })
    }

    perdioElJuego() {
        swal('Simon Dice', `Lo Lamentamos, perdiste :( \n Puntuacion Final: ${this.puntuacion}`, 'error')
            .then(() => {
                this.eliminarEventosClick()
                //agrego este metodo para que el juego arranque de nuevo
                this.inicializar()
            })
    }
}


/*DECLARACIÓN DE FUNCIONES
========================================================*/
function empezarJuego() {
    window.juego = new Juego()
}