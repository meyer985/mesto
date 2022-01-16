let editButton = document.querySelector('.info__edit');
let closeButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__name');
let jobInput = formElement.querySelector('.form__profession');

function formSubmitHandler(evt) {
  evt.preventDefault();

  const editName = nameInput.value;
  const editProfession = jobInput.value;

  let info = document.querySelector('.info');
  let infoName = info.querySelector('.info__name');
  let infoProfession = info.querySelector('.info__profession');

  infoName.textContent = editName;
  infoProfession.textContent = editProfession;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
