//        Variaveis Globais
const listItems = document.getElementsByClassName('cart__item');
const olListItem = document.querySelector('.cart__items');

//        Funções

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const addSaveCartItem = () => {
  const items = olListItem.childNodes;
  const stringItems = Array.from(items).map((element) =>
  element.innerHTML);
  const exit = JSON.stringify(stringItems);
  return saveCartItems(exit);
};

const priceCounter = async () => {
  const eachPrice = olListItem.childNodes;
  const pricePerItem = Array.from(eachPrice).map((element) =>
  element.innerText.split('$')[1]);
  const counter = pricePerItem
  .map((element) => parseFloat(element))
  .reduce((acc, cur) => acc + cur, 0);
  const result = document.querySelector('.total-price'); 
  result.innerText = await counter.toFixed(2).replace('.', ',');
  addSaveCartItem();
};

function deleteCartItems(event) {
    olListItem.removeChild(event.target);
    priceCounter();
  }

  function createCartItemElement({ sku, name, salePrice, image }) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    olListItem.appendChild(li);
    const div = document.createElement('div');
    div.className = 'cart__itemDIV';
    li.appendChild(div);
    div.appendChild(createCustomElement('p', 'cart__itemID', `ID: ${sku}`));
    div.appendChild(createCustomElement('p', 'cart__itemNAME', name));
    div.appendChild(createCustomElement('p', 'cart__itemPRICE', 
    `R$${salePrice}`));
    const img = createCustomElement('img', 'cart__itemIMG', '');
    img.src = image;
    li.appendChild(img);
    li.addEventListener('click', deleteCartItems);

    priceCounter();
    return li;
}

const savedCartItemsOnStage = () => {
  // const input = JSON.parse(getSavedCartItems());
  // const arrayStorage = input.forEach((element) => {

  //   const split1 = element.split(':');
  //   const splitID = split1[1].split('<');
  //   const splitNAME = splitID[2].split('>');
  //   const splitPRICE = splitID[4].split('>');
  //   const price = splitPRICE[1].split('$');
  //   const splitIMG = split1[2].split('//');
  //   const img = splitIMG[1].split('.jpg');

  //   const obj = {
  //         sku: splitID[0].trim(),
  //         name: splitNAME[1].trim(),
  //         salePrice: price[1], 
  //         image: `${img}.jpg`,
  //   };

  //   return obj;

  // });
  // const exit = arrayStorage.forEach((event) => createCartItemElement(event));
  // return exit;
};

const cartItemClickListener = async (sku) => {
  const data = await fetchItem(sku);
  const obj = { 
    sku: data.id, 
    name: data.title, 
    salePrice: data.price, 
    image: data.secure_thumbnail,
   };
   createCartItemElement(obj);
   return obj;
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', () => { 
    cartItemClickListener(sku);
  });
  section.appendChild(botao);
  
  return section;
}

const displayLoading = () => {
  const div = document.createElement('div');
  div.className = 'loading__container';
  
  div.appendChild(createCustomElement('div', 'loading__img', ''));
  div.appendChild(createCustomElement('div', 'loading', 'carregando...'));
  return document.querySelector('.items').appendChild(div);
};

function hideLoading() {
  const items = document.querySelector('.items');
  const domLoading = document.querySelector('.loading__container');
  return items.removeChild(domLoading);
}

const clearShoppingCart = () => {
  Array.from(listItems).forEach((element) => element.remove());
  priceCounter();
};
const showLogo = () => {
  const logo = document.querySelector('.container__logo');
  const displayLogo = logo.classList.add('display');
  return displayLogo;
};
const hideLogo = () => {
  const logo = document.querySelector('.container__logo');
  const displayLogo = logo.classList.remove('display');
  return displayLogo;
};

const elementFetchProduct = async () => {
  hideLogo();
  displayLoading();
  const input = document.querySelector('.search').value;
  const data = await fetchProducts(input);
  const results = await data.results
  .map((i) => {
    const obj = { sku: i.id, name: i.title, image: i.thumbnail };
    return obj;
  });
  
  const exit = results.forEach((element) => {
    const elementProduct = createProductItemElement(element);
    return document.querySelector('.items').appendChild(elementProduct);
  });
  await hideLoading();
  return exit;
};

const inputSearchValue = async () => {
  const items = document.querySelector('.items');
  const existingItems = document.querySelectorAll('.item');
  if (!items.hasChildNodes()) {
    elementFetchProduct();
  }
  existingItems.forEach((element) => element.remove());
  elementFetchProduct();
};

//      EventListeners
window.onload = async () => { 
  await elementFetchProduct();
  showLogo();
  savedCartItemsOnStage();
};
document.querySelector('.empty-cart').addEventListener('click', clearShoppingCart);
document.getElementById('search__button').addEventListener('click', inputSearchValue);
document.querySelector('.search').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') { 
    inputSearchValue();
  }
});
document.querySelector('.title').addEventListener('click', () => { 
  window.location.reload(); 
});

/* Referencias:
1. https://jestjs.io/pt-BR/docs/expect;
2. https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m;
3. https://www.w3schools.com/jsref/jsref_from.asp;
4. https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp;
5. https://www.javascripttutorial.net/es6/javascript-array-from/;
6. Monitoria com André Horman (FENOMENAL!);
7. https://www.blogson.com.br/carrinho-de-compras-com-localstorage-do-html-5/#:~:text=Para%20gravar%20dados%20na%20localStorage,posi%C3%A7%C3%A3o%20do%20produto%20no%20carrinho;
8. https://javascript.info/import-export;
9. https://www.w3schools.com/jsref/jsref_trim_string.asp;
10. Em contribuição mutua (com direito a horas maravilhosas de desespero em conjunto) com Graciela Rocha, Kamila Hydalgo, Tabata Souto e Carol Só! =)
*/
