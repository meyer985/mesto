import "./index.css";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  initialCards,
  config,
  editButton,
  addButton,
  elementsList,
} from "./utils/constants.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = new Card(element, ".template-card", () => {
        const preview = new PopupWithImage(".popup_type_picture", {
          link: element.link,
          name: element.name,
        });

        preview.open();
      }).createCard();
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
//объект попапа редактирования
const editPopup = new PopupWithForm(".popup_type_edit", (evt) => {
  evt.preventDefault();
  const formInputs = editPopup._getInputValues();
  const infoUpdate = new UserInfo({
    name: ".info__name",
    about: ".info__profession",
  });
  infoUpdate.setUserInfo(formInputs[0].value, formInputs[1].value);

  editPopup.close();
});

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

addButton.addEventListener("click", () => {
  popupAddCard.open();
  editAddCardValidator.resetValidation();
});

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, () => {
    const preview = new PopupWithImage(".popup_type_picture", {
      link: data.link,
      name: data.name,
    });

    preview.open();
  });
  return card.createCard();
}
