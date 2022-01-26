function submitForm(event) {
  event.preventDefault();
};

function showError (input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorVisibleClass);
  errorContainer.textContent = input.validationMessage;
}

function hideError (input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.textContent = '';
}

function disableSubmitButton (button, inactiveClass) {
  button.classList.add(inactiveClass);
  button.setAttribute('disabled', '');
}

function enableSubmitButton (button, inactiveClass) {
  button.classList.remove(inactiveClass);
  button.removeAttribute('disabled', '');
}

function toggleButton (form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    enableSubmitButton(button, inactiveButtonClass);
  } else {
    disableSubmitButton (button, inactiveButtonClass);
  }
}

function validateInput (form, input, classes) {
  const errorContainer = form.querySelector(`#${input.id}-error`);
  console.log(input.validationMessage);
  if (input.validity.valid) {
    hideError(input, errorContainer, classes);
  } else {
    showError(input, errorContainer, classes);
  }
  toggleButton(form, classes);
}

function enableValidation({formSelector, inputSelector, ...rest}) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    const button = form.querySelector(rest.submitButtonSelector);
    form.addEventListener('submit', submitForm);
    form.addEventListener('reset', () => disableSubmitButton (button, rest.inactiveButtonClass));
    const inputs = form.querySelectorAll(inputSelector);
    inputs.forEach( input => {
      input.addEventListener('input', () => {
        validateInput(form, input, rest);
      });
    });
    toggleButton(form, rest);
  });
}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__save_disabled',
  submitButtonSelector: '.popup__save',
});