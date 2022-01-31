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
const cardImage = cardElement.querySelector('.element__image');

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

// добавление карточек
function addCardsHandler(evt) {
  evt.preventDefault();
  const addCard = cardElement.cloneNode(true);
  addCard.querySelector('.element__text').innerText = newCardName.value;
  addCard.querySelector('.element__image').src = newPictureUrl.value;

  addCard.querySelector('.element__like').addEventListener('click', toggleLike); //слушатель лайка
  addCard.querySelector('.element__delite').addEventListener('click', deliteCard); //слушатель делита
  addCard.querySelector('.element__image').addEventListener('click', openViewScreen); //слушатель открытия просмотра

  elementsList.prepend(addCard);

  closeAddPopup();
}

const submitNewCard = popupAdd.querySelector('.form__submit_type_add');
submitNewCard.addEventListener('click', addCardsHandler);

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
  viewWindow.classList.add('popup_opened');
  viewPicture.src = event.target.src;
  viewCaption.innerText = event.target.nextElementSibling.textContent;
}

viewClosing.addEventListener('click', closeViewScreen);

function closeViewScreen() {
  viewWindow.classList.remove('popup_opened');
}

render();

