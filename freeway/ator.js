//codigos do ator

let xAtor = 100;
let yAtor = 366; 
let meusPontos = 0;

let colisao = false;

function mostraAtor() {
  image(imagemDoAtor, xAtor, yAtor, 30, 30);
};

function movimentaAtor() {
  if (keyIsDown(UP_ARROW)) {
    yAtor -= 3;
  } if (keyIsDown(DOWN_ARROW)) {
    yAtor += 3;
  } if (keyIsDown(LEFT_ARROW)) {
    xAtor -= 3;
  } if (keyIsDown(RIGHT_ARROW)) {
    xAtor += 3;
  }
};

function verificaColisao() {
  for (let i = 0; i < imagemCarros.length; i += 1){
   colisao = collideRectCircle(xCarros[i], yCarros[i], cCarros, hCarros, xAtor, yAtor, 15);
    if (colisao) { 
       yAtor = 366;
      somDaColisao.play()
    }
  }
};

function pontos() {
  textSize(25);
  textAlign(CENTER);
  fill(color(255,240,60))
  text(meusPontos, 30, 27);
  contador();
};

function contador(){
  if (yAtor <= 20){
    meusPontos += 1;
    somDoPonto.play();
    yAtor = 366;
  } if (colisao) {
    yAtor = 366;
    if (meusPontos > 0){
      meusPontos -= 1;  
    }
  }
};