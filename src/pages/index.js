import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  config,
  editButton,
  addButton,
  elementsList,
} from "../utils/constants.js";
import { api } from "../components/Api.js";

//функция создания новой карточки

function createCard(data, templateSelector) {
  const card = new Card(
    data,
    templateSelector,
    () => {
      preview.open();
    },
    (data) => {
      removeConfirmationPopup.open();
      removeConfirmationPopup.updateSubmitHandler(() => {
        api.deleteCard(data).then(() => {
          card.deliteCard();
          removeConfirmationPopup.close();
        });
      });
    },
    infoUpdate.getUserInfo()
  );

  return card.createCard();
}

const removeConfirmationPopup = new PopupWithForm(".popup_type_remove");
removeConfirmationPopup.setEventListeners();

const cardList = new Section(elementsList);

api.getCards().then((res) => {
  cardList.cardRenderer({
    items: res,
    renderer: (item) => {
      const newCard = createCard(item, ".template-card");
      cardList.addItem(newCard);
    },
  });
});

//ВАЛИДАЦИЯ

//валидаци формы профиля пользователя
const editProfileValidator = new FormValidator(config, ".form"); // объект
editProfileValidator.enableValidation(); // вызываем метод

//валидация формы добавления карточки
const editAddCardValidator = new FormValidator(config, ".form_type_add-card"); //объект из класса
editAddCardValidator.enableValidation(); // вызвали метод

const infoUpdate = new UserInfo({
  //заюираем имя и проф со страницы
  //информация о пользователе
  name: ".info__name",
  about: ".info__profession",
});

function changeAvatar(data) {
  //замена аватарки из {объекта пользователя}
  document.querySelector(
    ".profile__avatar"
  ).style.backgroundImage = `url(${data.avatar})`;
}

api.getUserInfo().then((result) => {
  //подставляем данные на страницу
  infoUpdate.setUserInfo(result);
  changeAvatar(result);
});

//ПОПАПЫ

//попап редактирования данных пользователя

const editPopup = new PopupWithForm(".popup_type_edit", (dataFromInputs) => {
  api.updateProfileInfo(dataFromInputs).then((res) => {
    infoUpdate.setUserInfo(res);
  });
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

const popupAddCard = new PopupWithForm(".popup_type_add-item", (formData) => {
  api.postNewCard(formData).then((res) => {
    const newCard = createCard(res, ".template-card");
    cardList.addItem(newCard);
  });
  popupAddCard.close();
});

popupAddCard.setEventListeners();

addButton.addEventListener("click", () => {
  popupAddCard.open();
  editAddCardValidator.resetValidation();
});

const preview = new PopupWithImage(".popup_type_picture"); //объект просмотра
preview.setEventListeners();
