export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup__cross")
      ) {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    super.open();

    this._viewPicture = this._popup.querySelector(".popup__picture"); //карт
    this._viewCaption = this._popup.querySelector(".popup__caption"); //подпись
    this._viewPicture.src = this._link;
    this._viewPicture.alt = this._name;
    this._viewCaption.innerText = this._name;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    this._listOfInputs = this._popup.querySelectorAll(".form__input");
    return this._listOfInputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".form");
    this._form.addEventListener("submit", this._submitCallback);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
