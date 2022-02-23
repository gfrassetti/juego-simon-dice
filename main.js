let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;
let puntos = 0;

document.querySelector("button[type=button]").onclick = empezarJuego;

bloquearInput();
puntaje(puntos);

function empezarJuego() {
  manejarRonda();
}

function manejarRonda() {
  bloquearInput();
  const $nuevoCuadro = obtenerCuadroAleatorio(); //le sumo un cuadro a la secuencia de la maquina
  secuenciaMaquina.push($nuevoCuadro);

  const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

  secuenciaMaquina.forEach(function ($cuadro, index) {
    const RETRASO_MS = (index + 1) * 1000;
    setTimeout(function () {
      resaltarCuadro($cuadro);
    }, RETRASO_MS);
  });

  setTimeout(function () {
    desbloquearInput();
  }, RETRASO_TURNO_JUGADOR);

  secuenciaUsuario = []; //se reinicia la lista
  ronda++;
  puntos++;
}

function bloquearInput() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function desbloquearInput() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = inputUsuario;
  });
}

function inputUsuario(e) {
  const $cuadro = e.target;

  resaltarCuadro($cuadro);
  secuenciaUsuario.push($cuadro);
}

function resaltarCuadro($cuadro) {
  $cuadro.style.opacity = 1;
  setTimeout(function () {
    $cuadro.style.opacity = 0.5;
  }, 500);
}

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro"); //lista de cuadros
  const indice = Math.floor(Math.random() * $cuadros.length); //numero random
  return $cuadros[indice];
}

function puntaje(puntos) {
  document.querySelector("#puntaje").textContent = "Puntaje: " + puntos;
}
