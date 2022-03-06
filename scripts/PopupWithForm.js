import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
  constructor ({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__container');
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    
    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._formSubmit(this._getInputValues()) 
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}