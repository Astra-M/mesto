import { openPopup, placeImagePopup, placeCaption, placeImage } from './index.js'

export class Card {
  constructor (data, cardSelector) {
    this.src = data.link;
    this.title = data.name;
    this.alt = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate () {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place-card')
    .cloneNode(true)
  }

  _fillCard () {
    this._cardElement.querySelector('.place-card__title').textContent = this.title;
    this._cardElement.querySelector('.place-card__photo').src = this.src;
    this._cardElement.querySelector('.place-card__photo').alt = this.title;
  }

  generateCard () {
    this._cardElement = this._getTemplate();
    
    this._fillCard();

    this._likeButton = this._cardElement.querySelector('.like-btn');
    this._deleteButton = this._cardElement.querySelector('.delete-btn');
    this._cardImage = this._cardElement.querySelector('.place-card__photo');

    this._setEventListeners();

    return this._cardElement;
  }

  _likeHandler () {
    this._likeButton.classList.toggle('like-btn_active');
  }

  _deleteHandler() {
    this._cardElement.remove();
  }

  _imageClickHandler() {
    openPopup(placeImagePopup);
    placeCaption.textContent = this.title;
    placeImage.src = this.src;
    placeImage.alt = this.title;
  }

  _setEventListeners () {
    this._deleteButton.addEventListener('click', () => {
      this._deleteHandler()
    }); 
  
    this._likeButton.addEventListener('click', () => {
      this._likeHandler()
    });

    this._cardImage.addEventListener('click', () => {
      this._imageClickHandler()
    })
  }
}