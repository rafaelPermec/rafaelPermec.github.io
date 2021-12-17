/* Função do Botão 'Limpar' */
/* Requisito 2 */
const classColor = document.getElementById('color-palette').children;

for (let i = 0; i < 4; i += 1) {
  classColor[i].className = 'color';
}

/* Requisito 4 */
const grid = document.getElementById('pixel-board');

for (let a = 0; a < 5; a += 1) {
  for (let b = 0; b < 5; b += 1) {
    const createDiv = document.createElement('div');
    grid.appendChild(createDiv);
    createDiv.className = 'pixel';
  }
}

/* Requisito 7 */
/* Função para atribuir classe selected */
function classSelected(event) {
  const vetor = document.getElementsByClassName('color');
  for (let i = 0; i < vetor.length; i += 1) {
    if (event.target === vetor[i]) {
      vetor[i].classList.add('selected');
    } else {
      vetor[i].classList.remove('selected');
    }
  }
}

const vetorColor = document.getElementsByClassName('color');
for (let i = 0; i < vetorColor.length; i += 1) {
  vetorColor[i].addEventListener('click', classSelected);
}

vetorColor[0].className = 'color selected';

/* Requisito 8 */
const vetorPixel = document.getElementsByClassName('pixel');

function pintaPixel(event) {
  const vetorSelected = document.querySelector('.selected');
  const capturaBackground = window.getComputedStyle(vetorSelected).backgroundColor;
  for (let i = 0; i < vetorPixel.length; i += 1) {
    if (event.target === vetorPixel[i]) {
      vetorPixel[i].style.backgroundColor = capturaBackground;
    }
  }
}
function voltaPixel(event) {
  const vetorSelected = document.querySelector('.selected');
  for (let i = 0; i < vetorPixel.length; i += 1) {
    if (event.target === vetorPixel[i]) {
      vetorPixel[i].classList.remove('selected');
    }
  }
}
function paintPixel() {
  for (let i = 0; i < vetorPixel.length; i += 1) {
    vetorPixel[i].addEventListener('click', pintaPixel);
    vetorPixel[i].addEventListener('dblclick', voltaPixel);
  }
}
paintPixel();

/* Requisito 9 */
/* Função do Botão 'Limpar' */
function limpar() {
  const divPixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < divPixel.length; i += 1) {
    divPixel[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}
document.getElementById('button-container').addEventListener('click', limpar);

/* Requisito 10 e 11 */

function gridCss() {
  const event = document.getElementById('board-size');
  if (event.value < 5) {
    alert('Board inválido!');
    event.value = 5;
  } if (event.value > 50) {
    alert('Board inválido!');
    event.value = 50;
  }
}

/* Função Algoritmo BubbleSort */
function createGrid() {
  const deleteGrid = document.querySelectorAll('.pixel');
  gridCss();
  for (let i = 0; i < deleteGrid.length; i += 1) {
    grid.removeChild(deleteGrid[i]);
  }
  const event = document.getElementById('board-size');
  const mudaGridCss = document.querySelector('#pixel-board');
  for (let a = 0; a < event.value; a += 1) {
    for (let b = 0; b < event.value; b += 1) {
      const createDiv = document.createElement('div');
      grid.appendChild(createDiv);
      createDiv.className = 'pixel';
      mudaGridCss.style.gridTemplateColumns = `repeat(${event.value}, 40px)`;
      paintPixel();
    }
  }
}

document.getElementById('generate-board').addEventListener('click', createGrid);

/* Requisito 12 */
const boxCor = document.getElementsByClassName('color');

const randomCor1 = `rgb( ${(Math.round(Math.random() * 255 + 1))} , 
${(Math.round(Math.random() * 255 + 1))} , 
${(Math.round(Math.random() * 255 + 1))} )`;

const randomCor2 = `rgb( ${(Math.round(Math.random() * 255 + 1))} , 
${(Math.round(Math.random() * 255 + 1))} , 
{(Math.round(Math.random() * 255 + 1))} )`;

const randomCor3 = `rgb( ${(Math.round(Math.random() * 255 + 1))} , 
${(Math.round(Math.random() * 255 + 1))} , 
${(Math.round(Math.random() * 255 + 1))} )`;

boxCor[1].style.backgroundColor = randomCor1;
boxCor[2].style.backgroundColor = randomCor2;
boxCor[3].style.backgroundColor = randomCor3;
