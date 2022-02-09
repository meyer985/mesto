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

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: '.form__error-message_',
    errorClass: 'form__input_type_error'
  });
}

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__cross')) {
      closePopup(popup);
    }
  })
})

function closePopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove('popup_opened');
}

function openEditPopup() {
  openPopup(popupEdit);
}

editButton.addEventListener('click', openEditPopup);

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

render();
