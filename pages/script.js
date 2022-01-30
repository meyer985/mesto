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

const editButton = document.querySelector('.info__edit');
const closeEditButton = document.querySelector('.popup__close_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input');
const jobInput = formElement.querySelector('.form__input_type_profession');
const info = document.querySelector('.info');
const infoName = info.querySelector('.info__name');
const infoProfession = info.querySelector('.info__profession');

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
  newCard.querySelector('.element__like').addEventListener('click', likeActive); //слушатель лайка
  newCard.querySelector('.element__delite').addEventListener('click', deliteCard); //слушатель делита
  newCard.querySelector('.element__image').addEventListener('click', openViewScreen); //слушатель открытия просмотра

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

function addCardsHandler(evt) {
  evt.preventDefault();
  const newCard = cardElement.cloneNode(true);
  newCard.querySelector('.element__text').innerText = newCardName.value;
  newCard.querySelector('.element__image').src = newPictureUrl.value;

  newCard.querySelector('.element__like').addEventListener('click', likeActive); //слушатель лайка
  newCard.querySelector('.element__delite').addEventListener('click', deliteCard); //слушатель делита
  newCard.querySelector('.element__image').addEventListener('click', openViewScreen); //слушатель открытия просмотра

  elementsList.prepend(newCard);

  closeAddPopup();
}

const submitNewCard = popupAdd.querySelector('.form__submit_type_add');
submitNewCard.addEventListener('click', addCardsHandler);

//Функция лайк

function likeActive(event) {
  //console.log(event.target);
  event.target.classList.toggle('element__like_active');
}

// Функция DELETE

function deliteCard(event) {
  event.target.closest('.element').remove();
}

// Попап просмотра картинок

const viewWindow = document.querySelector('.popup_type_picture'); //окно просмотра картинок
const viewPicture = viewWindow.querySelector('.popup__picture'); //картинка
const viewCaption = viewWindow.querySelector('.popup__caption'); //подпись
const viewClosing = viewWindow.querySelector('.popup__close'); // кнопка закр

function openViewScreen(event) {
  viewWindow.classList.add('popup_opened');
  viewPicture.src = event.target.src;
  viewCaption.innerText = event.target.nextElementSibling.textContent;
}

viewClosing.addEventListener('click', closeViewScreen);

function closeViewScreen() {
  viewWindow.classList.remove('popup_opened');
}

render();

