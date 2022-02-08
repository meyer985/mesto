function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form);
  });
}

function setEventListeners(form) {
  const formInputList = Array.from(form.querySelectorAll('.form__input'));
  formInputList.forEach((formInput) => {
    formInput.addEventListener('input', (evt) => {
      isInputValid(formInput, evt);
      toggleSubmitButton(form, formInputList);
    });
  });
  toggleSubmitButton(form, formInputList);
}

function isInputValid(formInput, evt) {
  if (!evt.target.validity.valid) {
    showError(formInput, evt);
  } else {
    hideError(formInput);
  }
}

function isFormInvalid(formInputList) {
  return formInputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleSubmitButton(form, formInputList) {
  const submitButton = form.querySelector('.form__submit');
  if (isFormInvalid(formInputList)) {
    submitButton.classList.add('form__submit_inactive');
  } else {
    submitButton.classList.remove('form__submit_inactive');
  }
}

function showError(formInput, evt) {
  formInput.classList.add('form__input_type_error');
  document.querySelector(`.form__error-message_${formInput.id}`).textContent = evt.target.validationMessage;
}

function hideError(formInput) {
  formInput.classList.remove('form__input_type_error');
  document.querySelector(`.form__error-message_${formInput.id}`).textContent = '';
}


enableValidation();

