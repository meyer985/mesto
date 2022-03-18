export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    this.newCard = this._cardTemplate.cloneNode(true); //клонир темпл

    //ищем элементы карточки
    this._cardImage = this.newCard.querySelector(".element__image"); //ищем картинку
    this._likeButton = this.newCard.querySelector(".element__like"); //кнопка лайк
    this._deliteButton = this.newCard.querySelector(".element__delite"); //делит

    this._setEventListeners();
    this._setCardContent();

    //возвращаем готовую карточку
    return this.newCard;
  }

  _setEventListeners() {
    //вешаем слушатели
    this._likeButton.addEventListener("click", this._toggleLike); //лайк
    this._deliteButton.addEventListener("click", this._deliteCard); //делит
    this._cardImage.addEventListener("click", this._openViewScreen); //превью
  }

  _setCardContent() {
    //наполняем
    this.newCard.querySelector(".element__text").innerText = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
  }

  _toggleLike = () => {
    this._likeButton.classList.toggle("element__like_active");
  };

  _deliteCard = (event) => {
    event.target.closest(".element").remove();
  };

  _openViewScreen = () => {
    console.log("tut");
    this._handleCardClick();
  };
}
