export class FormValidator {
  constructor(data, formElement) {
    //data -список селекторов, второй - форма
    this._data = data;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  _setEventListeners() {
    const formInputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputSelector)
    ); //находим список инпутов в форме

    //на каждый инпут подписываемся на слушатель события, вызываем проверку
    // валидации и тоггл кнопки
    formInputList.forEach((everyInput) => {
      //everyInput - отдельное поле ввода
      everyInput.addEventListener("input", (evt) => {
        this._isInputValid(everyInput, evt);
        this._toggleSubmitButton(formInputList);
      });
    });
    this._toggleSubmitButton(formInputList);
  }

  _isInputValid(everyInput, evt) {
    if (!evt.target.validity.valid) {
      this._showError(everyInput, evt);
    } else {
      this._hideError(everyInput);
    }
  }

  _toggleSubmitButton(formInputList) {
    const submitButton = this._formElement.querySelector(
      this._data.submitButtonSelector
    );

    if (this._isFormInvalid(formInputList)) {
      submitButton.classList.add(this._data.inactiveButtonClass);
      submitButton.setAttribute("disabled", "disabled");
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(this._data.inactiveButtonClass);
    }
  }

  _isFormInvalid(formInputList) {
    return formInputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _showError(everyInput, evt) {
    everyInput.classList.add(this._data.errorClass);
    document.querySelector(
      `${this._data.inputErrorClass}${everyInput.id}`
    ).textContent = evt.target.validationMessage;
  }

  _hideError(everyInput) {
    everyInput.classList.remove(this._data.errorClass);
    document.querySelector(
      `${this._data.inputErrorClass}${everyInput.id}`
    ).textContent = "";
  }
}
