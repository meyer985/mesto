const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let editButton = document.querySelector('.info__edit');
let closeEditButton = document.querySelector('.popup__close_type_edit');
let popupEdit = document.querySelector('.popup_type_edit');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input');
let jobInput = formElement.querySelector('.form__input_type_profession');
let info = document.querySelector('.info');
let infoName = info.querySelector('.info__name');
let infoProfession = info.querySelector('.info__profession');

const elementsList = document.querySelector('.elements__list'); //контейнер д карточек
const cardElement = document.querySelector('.template-card').content // темплейт li

function openPopup() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = infoName.textContent;
  jobInput.value = infoProfession.textContent;
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeEditButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();

  const editName = nameInput.value;
  const editProfession = jobInput.value;

  infoName.textContent = editName;
  infoProfession.textContent = editProfession;

  popupEdit.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

function render() {
  initialCards.forEach(renderItem); //ф-ция вызова ф-ции renderItem на изнач массив
}

function renderItem(item) { // ф-ция добавления карточки
  const newCard = cardElement.cloneNode(true);
  newCard.querySelector('.element__text').innerText = item.name;
  newCard.querySelector('.element__image').src = item.link;
  elementsList.append(newCard);
}

const popupAdd = document.querySelector('.popup_type_add-item'); // попап доб карточки
const newCardName = popupAdd.querySelector('.form__input_add-item');
const newPictureUrl = popupAdd.querySelector('.form__input_type_url');
const addButton = document.querySelector('.profile__addbutton'); // кнопка добав карточек
const closeAddButton = document.querySelector('.popup__close_type_add');

function openAddPopup() {
  popupAdd.classList.add('popup_opened');
  newCardName.value = '';
  newPictureUrl.value = '';
}

addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {
  popupAdd.classList.remove('popup_opened');
}

closeAddButton.addEventListener('click', closeAddPopup);

render();
