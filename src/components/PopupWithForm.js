import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor ({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._submitButton = document.querySelector('.popup__save');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues())
    })
  }

  changeSubmit(newFormSubmit) {
    this._formSubmit = newFormSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }
}