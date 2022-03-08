export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputs = this._form.querySelectorAll(settings.inputSelector);
    this._button = this._form.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorVisibleClass = settings.errorVisibleClass;
    this._inputErrorClass = settings.inputErrorClass;
  }

  _showError (input, errorContainer) {
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.add(this._errorVisibleClass);
    errorContainer.textContent = input.validationMessage;
  }
  
  _hideError (input, errorContainer) {
    input.classList.remove(this._inputErrorClass);
    errorContainer.classList.remove(this._errorVisibleClass);
    errorContainer.textContent = '';
  }

  _validateInput (input) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideError(input, errorContainer);
    } else {
      this._showError(input, errorContainer);
    }
    this._toggleButton();
  }

  _disableSubmitButton = () => {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', '');
  }

  _enableSubmitButton = () => {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled', '');
  }

  _toggleButton = () => {
    const isFormValid = this._form.checkValidity();
    if (isFormValid) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _setEventListeners () {
      this._form.addEventListener('reset', () => this._disableSubmitButton());

      this._inputs.forEach( input => {
        input.addEventListener('input', () => {
          this._validateInput(input);
        });
      });

      this._toggleButton();
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}