//codigos do carro:
let xCarros = [600, 600, 600, 0, 0, 0];
let yCarros = [40, 96, 150, 210, 270, 318];
let velCarros = [3.5, 3.8, 4.5, 5.2, 5.6, 4.2];
let cCarros = 50;
let hCarros = 40;


function mostraCarro() {
  for (let i = 0; i < imagemCarros.length; i += 1) {
    image(imagemCarros[i], xCarros[i], yCarros[i], cCarros, hCarros);
  }  
};

function movimentaCarro() {
  for (let i = 0; i < xCarros.length; i += 1) {
  xCarros[i] -= velCarros[i];
  }  
};

function voltaPosicaoInicialCarro() {
  for (let i = 0; i < imagemCarros.length; i += 1) {
    if(passouTela(xCarros[i])) {
      xCarros[i] = 600;
    }
  } 
};

function passouTela(x) {
  return x < -50;
};