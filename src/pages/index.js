import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  config,
  editButton,
  addButton,
  elementsList,
} from "../utils/constants.js";

//функция создания новой карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, () => {
    preview.open(data);
  });
  return card.createCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = createCard(element, ".template-card");
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

const infoUpdate = new UserInfo({
  //информация о пользователе
  name: ".info__name",
  about: ".info__profession",
});

//ПОПАПЫ
//попап редактирования данных пользователя
//объект попапа редактирования
const editPopup = new PopupWithForm(".popup_type_edit", (dataFromInputs) => {
  infoUpdate.setUserInfo(dataFromInputs);
  editPopup.close();
});
editPopup.setEventListeners();

editButton.addEventListener("click", openEditPopup);

function openEditPopup() {
  editPopup.open();
  const userInfo = infoUpdate.getUserInfo();
  editPopup.listOfInputs[0].value = userInfo.name;
  editPopup.listOfInputs[1].value = userInfo.about;
}

//Попап добавления карточки
const popupAddCard = new PopupWithForm(".popup_type_add-item", (formData) => {
  const newCard = createCard(formData, ".template-card");
  cardList.addItem(newCard);
  popupAddCard.close();
});

popupAddCard.setEventListeners();

addButton.addEventListener("click", () => {
  popupAddCard.open();
  editAddCardValidator.resetValidation();
});

const preview = new PopupWithImage(".popup_type_picture"); //объект просмотра
preview.setEventListeners();
