const valida = document.querySelector('.trybewarts-login');
const validaLogin = valida[0];
const validaSenha = valida[1];
const validaBotao = document.querySelector('#login-button');

function login() {
  const login2 = validaLogin.value === 'tryber@teste.com';
  const senha = validaSenha.value === '123456';

  if (login2 && senha) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

validaBotao.addEventListener('click', login);

const buttonForm = document.querySelector('#submit-btn');
function buttonEnable(event) {
  if (event.target.checked) {
    buttonForm.disabled = false;
  } else {
    buttonForm.disabled = true;
  }
}

const infoLabel = document.querySelector('#agreement');
infoLabel.addEventListener('change', buttonEnable);

const textArea = document.getElementById('textarea');
const counter = document.getElementById('counter');

function contador(e) {
  const limit = 500;
  const evento = e.target;
  const rest = limit - evento.value.length;
  counter.innerText = rest;
}

textArea.addEventListener('keyup', contador);

const harryPotter = {
  optionContent() {
    const materias = document.querySelectorAll('input[class=subject]:checked');
    const values = [];
    for (let i = 0; i < materias.length; i += 1) {
      values.push(materias[i].value);
    }
    return values.join(', ');
  },

  callObject() {
    const casa = document.querySelector('#house');
    const objeto = {
      nome: document.querySelector('#input-name').value,
      sNome: document.querySelector('#input-lastname').value,
      email: document.querySelector('#input-email').value,
      casaSelected: casa.options[casa.selectedIndex].value,
      familia: document.querySelector('input[name=family]:checked').value,
      conteudo: harryPotter.optionContent(),
      avaliacao: document.querySelector('input[name=rate]:checked').value,
      comment: document.querySelector('#textarea').value,
    };
    return objeto;
  },

  init(event) {
    event.preventDefault();
    const uOrdened = document.querySelector('#ul-container');
    const formContent = document.querySelector('#form-container');
    const titlePag = document.querySelector('#evaluation-form h1');
    titlePag.style.display = 'none';
    formContent.style.display = 'none';
    uOrdened.innerHTML = '';
    uOrdened.style.display = 'flex';
    const objeto = harryPotter.callObject();
    uOrdened.innerHTML = `
    <li>Nome: ${objeto.nome} ${objeto.sNome}</li>
    <li>Email: ${objeto.email}</li>
    <li>Casa: ${objeto.casaSelected}</li>
    <li>Família: ${objeto.familia}</li>
    <li>Matérias: ${objeto.conteudo}</li>
    <li>Avaliação: ${objeto.avaliacao}</li>
    <li>Observações: ${objeto.comment}</li>
    `;
  },
};

buttonForm.addEventListener('click', harryPotter.init);

/* REFERENCIAS:
1. 'https://github.com/tryber/sd-018-b-project-trybewarts/pull/37/'
2. 'https://pt.stackoverflow.com/questions/113089/contador-de-caracteres-digitados-em-um-textarea'
3. 'https://trello.com/b/A3S4ImnP/projeto-trybewarts-bloco-6' */
