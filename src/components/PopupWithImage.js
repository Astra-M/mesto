import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
  constructor ( popupSelector) {
    super(popupSelector);
    this._placeImage = this._popup.querySelector('.popup__image');
    this._placeCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._placeImage.src = link;
    this._placeCaption.textContent = name;
    this._placeImage.alt = name;
    super.open();
  }
}
