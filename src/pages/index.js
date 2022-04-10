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

let myId;
const cardList = new Section(elementsList);

Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([userData, cardsContent]) => {
    //получаем данные пользователя
    myId = userData._id;
    infoUpdate.setUserInfo(userData);
    infoUpdate.changeAvatar(userData);

    //рендерим карточки
    cardList.cardRenderer({
      items: cardsContent,
      renderer: (item) => {
        const newCard = createCard(item, ".template-card");
        cardList.addItem(newCard);
      },
    });
  }
);

//функция создания новой карточки

function createCard(data, templateSelector) {
  const card = new Card(
    data,
    templateSelector,

    //обработчик превью
    () => {
      preview.open(data);
    },

    //обработчик удаления
    (data) => {
      removeConfirmationPopup.open();
      removeConfirmationPopup.updateSubmitHandler(() => {
        removeConfirmationPopup.submit.value = "Удаление...";
        api
          .deleteCard(data)
          .then(() => {
            card.deliteCard();
            removeConfirmationPopup.close();
          })
          .catch(() => console.log(res.status))
          .finally(() => {
            removeConfirmationPopup.submit.value = "Да";
          });
      });
    },

    //обработчик лайка
    () => {
      if (card.isItLiked()) {
        card.deliteLike();
        api
          .deliteLike(data._id)
          .then((res) => {
            card.setLikeCounter(res.likes);
          })
          .catch(() => console.log(res.status));
      } else {
        card.setLike();
        api
          .putLike(data._id)
          .then((res) => {
            card.setLikeCounter(res.likes);
          })
          .catch(() => console.log(res.status));
      }
    },
    myId
  );

  return card.createCard();
}

//ВАЛИДАЦИЯ

//валидаци формы профиля пользователя
const editProfileValidator = new FormValidator(config, ".form");
editProfileValidator.enableValidation(); // вызываем метод

//валидация формы добавления карточки
const editAddCardValidator = new FormValidator(config, ".form_type_add-card");
editAddCardValidator.enableValidation(); // вызвали метод

//валидация обновления аватара
const changeAvatarValidator = new FormValidator(config, ".form_type_avatar");
changeAvatarValidator.enableValidation();

//получение информации о пользователе со страницы
const infoUpdate = new UserInfo({
  name: ".info__name",
  about: ".info__profession",
});

//ПОПАПЫ

//подтверждение удаления карточки

const removeConfirmationPopup = new PopupWithForm(".popup_type_remove");
removeConfirmationPopup.setEventListeners();

//попап редактирования данных пользователя
editButton.addEventListener("click", openEditPopup);

const editPopup = new PopupWithForm(".popup_type_edit", (dataFromInputs) => {
  editPopup.submit.value = "Сохранение...";
  api
    .updateProfileInfo(dataFromInputs)
    .then((res) => {
      infoUpdate.setUserInfo(res);
      editPopup.close();
    })
    .catch(() => console.log(res.status))
    .finally(() => {
      editPopup.submit.value = "Сохранить";
    });
});

editPopup.setEventListeners();

function openEditPopup() {
  editPopup.open();
  const userInfo = infoUpdate.getUserInfo();
  editPopup.listOfInputs[0].value = userInfo.name;
  editPopup.listOfInputs[1].value = userInfo.about;
}

//поп-ап добавления карточки
addButton.addEventListener("click", () => {
  popupAddCard.open();
  editAddCardValidator.resetValidation();
});

const popupAddCard = new PopupWithForm(".popup_type_add-item", (formData) => {
  popupAddCard.submit.value = "Сохранение...";
  api
    .postNewCard(formData)
    .then((res) => {
      const newCard = createCard(res, ".template-card");
      cardList.addItem(newCard);
      popupAddCard.close();
    })
    .catch(() => console.log(res.status))
    .finally(() => {
      popupAddCard.submit.value = "Создать";
    });
});

popupAddCard.setEventListeners();

//поп-ап окна просмотра
const preview = new PopupWithImage(".popup_type_picture");
preview.setEventListeners();

//поп-ап замены аватарки
const editAvatar = document.querySelector(".profile__overlay");
editAvatar.addEventListener("click", () => {
  avatar.open();
  changeAvatarValidator.resetValidation();
});

const avatar = new PopupWithForm(".popup_type_avatar", (formData) => {
  avatar.submit.value = "Сохранение...";
  api
    .updateAvatar(formData.link)
    .then((res) => {
      infoUpdate.changeAvatar(res);
      avatar.close();
    })
    .catch(() => console.log(res.status))
    .finally(() => {
      avatar.submit.value = "Создать";
    });
});

avatar.setEventListeners();
