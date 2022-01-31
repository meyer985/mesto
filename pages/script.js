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
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input');
const jobInput = profileForm.querySelector('.form__input_type_profession');
const info = document.querySelector('.info');
const infoName = info.querySelector('.info__name');
const infoProfession = info.querySelector('.info__profession');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = infoName.textContent;
  jobInput.value = infoProfession.textContent;
}

editButton.addEventListener('click', openEditPopup);
closeEditButton.addEventListener('click', () => closePopup(popupEdit));

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

function createCard() { //отдельная функция создания карточки
  const newCard = cardElement.cloneNode(true);
  newCard.querySelector('.element__like').addEventListener('click', toggleLike); //слушатель лайка
  newCard.querySelector('.element__delite').addEventListener('click', deliteCard); //слушатель делита
  newCard.querySelector('.element__image').addEventListener('click', openViewScreen); //слушатель открытия просмотра
  return newCard;
}

function render() {
  initialCards.forEach(renderItem); //ф-ция вызова ф-ции renderItem на изнач массив
}

function renderItem(item) { // ф-ция добавления карточки из массива
  const newCard = createCard();
  newCard.querySelector('.element__text').innerText = item.name;
  newCard.querySelector('.element__image').src = item.link;
  newCard.querySelector('.element__image').alt = item.name;
  elementsList.append(newCard);
}

//Добавление карточек через форму
const popupAddCard = document.querySelector('.popup_type_add-item'); // попап доб карточки
const newCardName = popupAddCard.querySelector('.form__input_add-item');
const newPictureUrl = popupAddCard.querySelector('.form__input_type_url');
const addButton = document.querySelector('.profile__addbutton'); // кнопка добав карточек
const closeAddButton = document.querySelector('.popup__close_type_add');

addButton.addEventListener('click', () => openPopup(popupAddCard));
closeAddButton.addEventListener('click', () => closePopup(popupAddCard));

// добавление карточек
function handleAddCardForm(evt) {
  evt.preventDefault();
  const newCard = createCard();
  newCard.querySelector('.element__text').innerText = newCardName.value;
  newCard.querySelector('.element__image').src = newPictureUrl.value;
  newCard.querySelector('.element__image').alt = newCardName.value;

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
const viewClosing = viewWindow.querySelector('.popup__close'); // кнопка закр

function openViewScreen(event) {
  openPopup(viewWindow);
  viewPicture.src = event.target.src;
  viewPicture.alt = event.target.nextElementSibling.textContent;
  viewCaption.innerText = event.target.nextElementSibling.textContent;
}

viewClosing.addEventListener('click', () => closePopup(viewWindow));

render();

