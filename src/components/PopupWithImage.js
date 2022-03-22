import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._viewPicture = this._popup.querySelector(".popup__picture");
    this._viewCaption = this._popup.querySelector(".popup__caption");
  }

  open(data) {
    super.open();
    this._viewPicture.src = data.link;
    this._viewPicture.alt = data.name;
    this._viewCaption.innerText = data.name;
  }
}
