// creamos dos constantes con los iconos que van a colocar los jugadores al hacer click
const jugadorUno = "🔴";
const jugadorDos = "🟢";

// creamos una variable para controlar los turnos del juego
let turnos = "Primero";

// seleccionamos todos los cuadrados
const espacios = document.querySelectorAll(".espacio")

// recorremos todos los cuadrados y le agregamos una funcion al hacer click en ellos
espacios.forEach((espacio, i) => {
    espacio.addEventListener("click", () => {
        if(turnos === "FIN"){
            return
        }
        if(espacio.textContent !== "") return
        // insertamos circulo rojo o verde segun el turno sea Primero o Segundo
        if(turnos === "Primero"){
            espacio.innerText = jugadorUno;
        }else{
            espacio.innerText = jugadorDos;
        }
        const ubicacionGanador = hayGanador();

        if(typeof ubicacionGanador === "object"){
            unGanador(ubicacionGanador);
            return
        }
        if(ubicacionGanador === "empate"){
            mostrarInformacion("EMPATE");
        }
        //cambiamos el turno cada una ronda
        if(turnos === "Primero"){
            turnos = "Segundo";
        }else{
            turnos = "Primero";
        }
    })
})

// verificamos si hay un ganador en el Ta Te Ti
function hayGanador(){
    // convertimos a un array los espacios
    const arrayEspacios =[...espacios].map(espacio => espacio.textContent);

    // lineas horizontales
    for(let i = 0; i < 9; i+= 3){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+1] && arrayEspacios[i] === arrayEspacios[i+2]){
            return ([i, i+1, i+2])
        }
    }

    // lineas verticales
    for(let i = 0; i < 3; i++){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+1] && arrayEspacios[i] === arrayEspacios[i+2]){
            return ([i, i+1, i+6])
        }
    }

    // revisar las dos formas cruzadas
    if(arrayEspacios[0] && arrayEspacios[0] === arrayEspacios[4] && arrayEspacios[0] === arrayEspacios[8]){
        return ([0, 4, 8])
    }
    if(arrayEspacios[2] && arrayEspacios[2] === arrayEspacios[4] && arrayEspacios[2] === arrayEspacios[6]){
        return ([2, 4, 6])
    }

    // revisar empate
    if(arrayEspacios.includes("")) return false;
    return "empate"
}

// esto sucede cuando hay un ganador y nos llegan las posiciones de ese ganador
function unGanador(posicionDelGanador){
    posicionDelGanador.forEach(posicion => {
        espacios[posicion].classList.toggle("posiciones-ganadoras", true);
        espacios[posicion].innerText = "❤";
        if(turnos === "Primero"){
            espacios[posicion].classList.add("color-uno");
            espacios[posicion].classList.remove("color-dos");
        }else{
            espacios[posicion].classList.add("color-dos");
            espacios[posicion].classList.remove("color-uno");
        }
    })
    mostrarInformacion(turnos);
    turnos = "FIN";
}

// mostrar informacion del resultado de juego
const informacion = document.getElementById("contenedor-informacion");
const textoInfo = document.getElementById("info");

function mostrarInformacion(resultado){
    if(turnos === "Primero"){
        info.innerText = "El ganador es el Rojo";
    }
    if(turnos === "Segundo"){
        info.innerText = "El ganador es el Verde";
    }
    if(resultado === "EMPATE"){
        info.innerText = "El juego ha terminado en Empate";
    }

    informacion.style.display = "block"
}

// reinicar juego
document.getElementById("reiniciar").addEventListener("click", () =>{
    espacios.forEach(espacio => {
        espacio.textContent = "";
        espacio.classList.toggle("posiciones-ganadoras", false);
        informacion.style.display = "none";
        turnos = "Primero";
    });
});


