<<<<<<< HEAD
function enableValidation({ formSelector, ...rest }) {
=======
function enableValidation({formSelector, ...rest}) {
>>>>>>> c9c9817ebf1a45bde5e1b6127ddefc67fa5b6955
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((currentForm) => {
    currentForm.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(currentForm, rest);
  });
}

<<<<<<< HEAD
function setEventListeners(currentForm, { inputSelector, ...rest }) {
=======
function setEventListeners(currentForm, {inputSelector, ...rest}) {
>>>>>>> c9c9817ebf1a45bde5e1b6127ddefc67fa5b6955
  const formInputList = Array.from(currentForm.querySelectorAll(inputSelector));
  formInputList.forEach((everyInput) => {
    everyInput.addEventListener('input', (evt) => {
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

<<<<<<< HEAD
function toggleSubmitButton(currentForm, formInputList, { submitButtonSelector, inactiveButtonClass }) {
=======
function toggleSubmitButton(currentForm, formInputList, {submitButtonSelector, inactiveButtonClass}) {
>>>>>>> c9c9817ebf1a45bde5e1b6127ddefc67fa5b6955
  const submitButton = currentForm.querySelector(submitButtonSelector);
  if (isFormInvalid(formInputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
  }
}

<<<<<<< HEAD
function showError(everyInput, evt, { errorClass, inputErrorClass }) {
=======
function showError(everyInput, evt, {errorClass, inputErrorClass}) {
>>>>>>> c9c9817ebf1a45bde5e1b6127ddefc67fa5b6955
  everyInput.classList.add(errorClass);
  document.querySelector(`${inputErrorClass}${everyInput.id}`).textContent = evt.target.validationMessage;
}

<<<<<<< HEAD
function hideError(everyInput, { errorClass, inputErrorClass }) {
=======
function hideError(everyInput, {errorClass, inputErrorClass}) {
>>>>>>> c9c9817ebf1a45bde5e1b6127ddefc67fa5b6955
  everyInput.classList.remove(errorClass);
  document.querySelector(`${inputErrorClass}${everyInput.id}`).textContent = '';
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: '.form__error-message_',
  errorClass: 'form__input_type_error'
});
