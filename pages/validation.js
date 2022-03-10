function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector)); //создает массив всех форм
  formList.forEach((currentForm) => {
    currentForm.addEventListener("submit", (evt) => evt.preventDefault()); //устанавл слушатель сабмита
    setEventListeners(currentForm, rest);
  });
}

function setEventListeners(currentForm, { inputSelector, ...rest }) {
  const formInputList = Array.from(currentForm.querySelectorAll(inputSelector));
  formInputList.forEach((everyInput) => {
    everyInput.addEventListener("input", (evt) => {
      isInputValid(everyInput, evt, rest);
      toggleSubmitButton(currentForm, formInputList, rest);
    });
  });
  toggleSubmitButton(currentForm, formInputList, rest);
}

function isInputValid(everyInput, evt, rest) {
  if (!evt.target.validity.valid) {
    showError(everyInput, evt, rest);
  } else {
    hideError(everyInput, rest);
  }
}

function isFormInvalid(formInputList) {
  return formInputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleSubmitButton(
  currentForm,
  formInputList,
  { submitButtonSelector, inactiveButtonClass }
) {
  const submitButton = currentForm.querySelector(submitButtonSelector);
  if (isFormInvalid(formInputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(inactiveButtonClass);
  }
}

function showError(everyInput, evt, { errorClass, inputErrorClass }) {
  everyInput.classList.add(errorClass);
  document.querySelector(`${inputErrorClass}${everyInput.id}`).textContent =
    evt.target.validationMessage;
}

function hideError(everyInput, { errorClass, inputErrorClass }) {
  everyInput.classList.remove(errorClass);
  document.querySelector(`${inputErrorClass}${everyInput.id}`).textContent = "";
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: ".form__error-message_",
  errorClass: "form__input_type_error",
});
