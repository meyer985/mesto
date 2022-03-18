import { FormValidator } from "./components/FormValidator.js";
// import { Card } from "./components/Card.js";
// import { openPopup, closePopup } from "./utils/utils.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithForm } from "./components/Popup.js";
import { UserInfo } from "./components/UserInfo.js";

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

//ОТРИСОВКА МАССИВА КАРТОЧЕК
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

//ВАЛИДАЦИЯ
//валидаци формы профиля пользователя
const editProfileValidator = new FormValidator(config, ".form"); // объект
editProfileValidator.enableValidation(); // вызываем метод

//валидация формы добавления карточки

const editAddCardValidator = new FormValidator(config, ".form_type_add-card"); //объект из класса
editAddCardValidator.enableValidation(); // вызвали метод

//ПОПАПЫ
//попап редактирования данных пользователя
const editPopup = new PopupWithForm(
  ".popup_type_edit", //объект попапа редактирования
  (evt) => {
    evt.preventDefault();
    const formInputs = editPopup._getInputValues();
    const infoUpdate = new UserInfo({
      name: ".info__name",
      about: ".info__profession",
    });
    infoUpdate.setUserInfo(formInputs[0].value, formInputs[1].value);

    editPopup.close();
  }
);

editButton.addEventListener("click", openEditPopup);

function openEditPopup() {
  editPopup.open();
}

//Попап добавления карточки

const popupAddCard = new PopupWithForm(".popup_type_add-item", (evt) => {
  evt.preventDefault();
  const formInputs = popupAddCard._getInputValues();

  const newElement = createCard(
    { name: `${formInputs[0].value}`, link: `${formInputs[1].value}` },
    ".template-card"
  );
  elementsList.prepend(newElement);

  formInputs[0].value = "";
  formInputs[1].value = "";
  popupAddCard.close();
});

const addButton = document.querySelector(".profile__addbutton"); // кнопка добав карточек

addButton.addEventListener("click", () => {
  popupAddCard.open();
  editAddCardValidator.resetValidation();
});

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card.createCard();
}
