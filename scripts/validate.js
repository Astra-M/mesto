class formValidator {
  constructor(settings,form){
    this._form = form;
    this._settings = settings; //можно удалить, проверить используется ли
    this._inputs = form.querySelectorAll(settings.inputSelector);
    this._button = form.querySelector(settings.submitButtonSelector); 
    //this._inactiveButtonClass = this._form.querySelector(this._settings.inactiveButtonClass);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorVisibleClass = settings.errorVisibleClass;
    this._inputErrorClass = settings.inputErrorClass;    
    //const errorContainer = this._form.querySelector(`#${input.id}-error`);попробовать
  }

  _showError (input, errorContainer) {
    
    console.log('this._errorVisibleClass=>', this._errorVisibleClass)
    
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.add(this._errorVisibleClass);
    errorContainer.textContent = input.validationMessage;
  }
  
  _hideError (input, errorContainer) {
    //console.log('errorContainer => hide error', errorContainer);
    
    input.classList.remove(this._inputErrorClass);
    errorContainer.classList.remove(this._errorVisibleClass);
    errorContainer.textContent = '';
  }

  _validateInput (input) {
    console.log(this._form)

    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    //
    console.log(input.validationMessage);
    //console.log(input.validity.valid);
    console.log(errorContainer);//

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
    //console.log(this._button)
  }
  
  _enableSubmitButton = () => {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled', '');
  }
  
  _toggleButton = () => {
    //this._form.querySelector('popup__container')
    const isFormValid = this._form.querySelector('.popup__container').checkValidity();
    //const isFormValid = this._form.checkValidity();
    //console.log(this._form)    
    if (isFormValid) {
      //console.log(isFormValid)

      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _setEventListeners () {
      this._form.addEventListener('submit', this._form);
      //this._form.addEventListener('submit', submitForm);
      this._form.addEventListener('reset', () => disableSubmitButton (this._button, this._inactiveButtonClass));
      
      
      this._inputs.forEach( input => {
        input.addEventListener('input', () => {
          this._validateInput(input);
        });
      });
      //this._toggleButton(this._form, rest);
      this._toggleButton(this._form);
  } 

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });//можно оставить методом сабмит   
    this._setEventListeners();
  }
}

const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__save_disabled',
  submitButtonSelector: '.popup__save',
}

const profileForm = document.querySelector('.popup_type_edit-profile');
const placeForm = document.querySelector('.popup_type_add-place');

const profileValidator = new formValidator(config, profileForm);
const placeValidator = new formValidator(config, placeForm);

placeValidator.enableValidation();
profileValidator.enableValidation();

/*function submitForm(event) {
  event.preventDefault();
};
console.log('config.errorVisibleClass', config.errorVisibleClass)//

*/

/*function showError (input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorVisibleClass);
  errorContainer.textContent = input.validationMessage;
}

function hideError (input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.textContent = '';
}*/

/*function disableSubmitButton (button, inactiveClass) {
  button.classList.add(inactiveClass);
  button.setAttribute('disabled', '');
}

function enableSubmitButton (button, inactiveClass) {
  button.classList.remove(inactiveClass);
  button.removeAttribute('disabled', '');
}*/

/*function toggleButton (form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    enableSubmitButton(button, inactiveButtonClass);
  } else {
    disableSubmitButton (button, inactiveButtonClass);
  }
}*/

/*function validateInput (form, input, classes) {
  const errorContainer = form.querySelector(`#${input.id}-error`);
  console.log(input.validationMessage);
  if (input.validity.valid) {
    hideError(input, errorContainer, classes);
  } else {
    showError(input, errorContainer, classes);
  }
  toggleButton(form, classes);
}*/

/*function enableValidation({formSelector, inputSelector, ...rest}) {
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
}*/

/*enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__save_disabled',
  submitButtonSelector: '.popup__save',
});*/