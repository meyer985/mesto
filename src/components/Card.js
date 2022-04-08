// import { data } from "autoprefixer";

export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeliteClick,
    handleToggleLike,
    myId
  ) {
    this._data = data;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
    this._handleDeliteClick = handleDeliteClick;
    this._myId = myId;
    this._authorId = data.owner._id;
    this._handleToggleLike = handleToggleLike;
  }

  createCard() {
    this.newCard = this._cardTemplate.cloneNode(true); //клонир темпл

    //ищем элементы карточки
    this._cardImage = this.newCard.querySelector(".element__image"); //ищем картинку
    this._likeButton = this.newCard.querySelector(".element__like"); //кнопка лайк
    this._deliteButton = this.newCard.querySelector(".element__delite"); //делит
    this._likeCounter = this.newCard.querySelector(".element__like-counter");

    this._setEventListeners();
    this._setCardContent();

    //возвращаем готовую карточку
    return this.newCard;
  }

  _setEventListeners() {
    //вешаем слушатели
    this._likeButton.addEventListener("click", this._toggleLike); //лайк

    this._deliteButton.addEventListener("click", (event) => {
      this._handleDeliteClick(this._data);
    }); //делит
    this._cardImage.addEventListener("click", this._openViewScreen); //превью
  }

  _setCardContent() {
    //наполняем
    this.newCard.querySelector(".element__text").innerText = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._likeCounter.innerText = this._data.likes.length;

    if (this._myId !== this._authorId) {
      this._deliteButton.classList.add("element__delite_inactive");
    }
  }

  _toggleLike = () => {
    this._handleToggleLike();
    // this._likeButton.classList.toggle("element__like_active");
    console.log(this._myId);
    console.log(this._authorId);
  };

  deliteCard() {
    this.newCard.remove();
  }

  _openViewScreen = () => {
    this._handleCardClick();
  };
}
