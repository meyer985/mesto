import { Popup } from "./Popup.js";
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
