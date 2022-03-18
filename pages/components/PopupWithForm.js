import { Popup } from "./Popup.js";
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
