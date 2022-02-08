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
const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input');
const jobInput = profileForm.querySelector('.form__input_type_profession');
const info = document.querySelector('.info');
const infoName = info.querySelector('.info__name');
const infoProfession = info.querySelector('.info__profession');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setListener = function (evt) {
    closePopupHandler(evt, popup);
  });
}


function closePopupHandler(evt, popup) {
   if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__cross') || evt.target.classList.contains('popup') || evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setListener);
  }

function openEditPopup() {
  openPopup(popupEdit);
  }

editButton.addEventListener('click', openEditPopup);
popupEdit.addEventListener('click', (evt) => closePopupHandler(evt, popupEdit));

//Обработчик сабмита формы редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const editName = nameInput.value;
  const editProfession = jobInput.value;
  infoName.textContent = editName;
  infoProfession.textContent = editProfession;
  closePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit); //слушатель сабмита

//Добавление карточек из массива
const elementsList = document.querySelector('.elements__list'); //контейнер д карточек
const cardElement = document.querySelector('.template-card').content // темплейт li

function createCard(name, link) { //отдельная функция создания карточки
  const newCard = cardElement.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  newCard.querySelector('.element__like').addEventListener('click', toggleLike); //слушатель лайка
  newCard.querySelector('.element__delite').addEventListener('click', deliteCard); //слушатель делита
  cardImage.addEventListener('click', openViewScreen); //слушатель открытия просмотра
  newCard.querySelector('.element__text').innerText = name;
  cardImage.src = link;
  cardImage.alt = name;
  return newCard;
}

function render() {
  initialCards.forEach(renderItem); //ф-ция вызова ф-ции renderItem на изнач массив
}

function renderItem(item) { // ф-ция добавления карточки из массива
  const newCard = createCard(item.name, item.link);
  elementsList.append(newCard);
}

//Добавление карточек через форму
const popupAddCard = document.querySelector('.popup_type_add-item'); // попап доб карточки
const newCardName = popupAddCard.querySelector('.form__input_add-item');
const newPictureUrl = popupAddCard.querySelector('.form__input_type_url');
const addButton = document.querySelector('.profile__addbutton'); // кнопка добав карточек

addButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCard.addEventListener('click', (evt) => closePopupHandler(evt, popupAddCard));

// добавление карточек
function handleAddCardForm(evt) {
  evt.preventDefault();
  const newCard = createCard(newCardName.value, newPictureUrl.value);
  elementsList.prepend(newCard);
  newCardName.value = '';
  newPictureUrl.value = '';
  closePopup(popupAddCard);
}

const newCardSubmitForm = popupAddCard.querySelector('.form_type_add-card');
newCardSubmitForm.addEventListener('submit', handleAddCardForm);

//Функция лайк
function toggleLike(event) {
  event.target.classList.toggle('element__like_active');
}

// Функция DELETE
function deliteCard(event) {
  event.target.closest('.element').remove();
}

// Поп-ап просмотра картинок
const viewWindow = document.querySelector('.popup_type_picture'); //окно просмотра картинок
const viewPicture = viewWindow.querySelector('.popup__picture'); //картинка
const viewCaption = viewWindow.querySelector('.popup__caption'); //подпись

function openViewScreen(event) {
  openPopup(viewWindow);
  viewPicture.src = event.target.src;
  viewPicture.alt = event.target.alt;
  viewCaption.innerText = event.target.alt;
}

viewWindow.addEventListener('click', (evt) => closePopupHandler(evt, viewWindow));

render();

