import { FormValidator } from "./components/FormValidator.js";
// import { Card } from "./components/Card.js";
import { openPopup, closePopup } from "./utils/utils.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: ".form__error-message_",
  errorClass: "form__input_type_error",
};

const editButton = document.querySelector(".info__edit");
const popupEdit = document.querySelector(".popup_type_edit");
const profileForm = document.querySelector(".form"); //форма пользователя
const nameInput = profileForm.querySelector(".form__input");
const jobInput = profileForm.querySelector(".form__input_type_profession");
const info = document.querySelector(".info");
const infoName = info.querySelector(".info__name");
const infoProfession = info.querySelector(".info__profession");

const editProfileValidator = new FormValidator(config, profileForm); // объект из класса
editProfileValidator.enableValidation(); // вызываем метод

const popups = Array.from(document.querySelectorAll(".popup"));

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup__cross")
    ) {
      closePopup(popup);
    }
  });
});

function openEditPopup() {
  openPopup(popupEdit);
}

editButton.addEventListener("click", openEditPopup);

//Обработчик сабмита формы редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const editName = nameInput.value;
  const editProfession = jobInput.value;
  infoName.textContent = editName;
  infoProfession.textContent = editProfession;
  closePopup(popupEdit);
}

profileForm.addEventListener("submit", handleProfileFormSubmit); //слушатель сабмита

const elementsList = document.querySelector(".elements__list"); //контейнер д карточек

const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = new Card(element, ".template-card").createCard();
      cardList.addItem(newCard);
    },
  },
  elementsList
);
cardList.cardRenderer();

//Добавление карточек через форму
const popupAddCard = document.querySelector(".popup_type_add-item"); // попап доб карточки
const newCardName = popupAddCard.querySelector(".form__input_add-item");
const newPictureUrl = popupAddCard.querySelector(".form__input_type_url");

const addButton = document.querySelector(".profile__addbutton"); // кнопка добав карточек

addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  editAddCardValidator.resetValidation();
});

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card.createCard();
}

//добавление карточек
function handleAddCardForm(evt) {
  evt.preventDefault();

  const newElement = createCard(
    { name: `${newCardName.value}`, link: `${newPictureUrl.value}` },
    ".template-card"
  );
  elementsList.prepend(newElement);

  newCardName.value = "";
  newPictureUrl.value = "";
  closePopup(popupAddCard);
}

const newCardSubmitForm = popupAddCard.querySelector(".form_type_add-card"); // форма
newCardSubmitForm.addEventListener("submit", handleAddCardForm);

const editAddCardValidator = new FormValidator(config, newCardSubmitForm); //объект из класса
editAddCardValidator.enableValidation(); // вызвали метод
