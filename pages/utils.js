export const viewWindow = document.querySelector(".popup_type_picture"); //окно просмотра картинок
export const viewPicture = viewWindow.querySelector(".popup__picture"); //картинка
export const viewCaption = viewWindow.querySelector(".popup__caption"); //подпись

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function closePopup(popup) {
  document.removeEventListener("keydown", closeByEsc);
  popup.classList.remove("popup_opened");
}
