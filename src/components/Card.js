export class Card {
  constructor (data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this.src = data.link;
    this.title = data.name;
    this.alt = data.name;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._cardImage.src = this.src;
    this._cardImage.alt = this.title;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find( user => user._id === this._userId)
    return userHasLikedCard

  }

  _fillLike() {
    this._likeButton.classList.add('like-btn_active')
  }

  _unfillLike() {
    this._likeButton.classList.remove('like-btn_active')
  }

  setLikes(newLikes) {
    this._likes = newLikes;

    const likesCount = this._cardElement.querySelector('.like-count')
    likesCount.textContent = this._likes.length

    if (this.isLiked()) {
      this._fillLike()
    } else {
      this._unfillLike()
    }
}

  generateCard () {
    this._cardElement = this._getTemplate();
    
    this._likeButton = this._cardElement.querySelector('.like-btn');
    this._deleteButton = this._cardElement.querySelector('.delete-btn');
    this._cardImage = this._cardElement.querySelector('.place-card__photo');

    this._fillCard();

    this.setLikes(this._likes);

    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }

    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners () {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    }); 
  
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.title, this.src)
    })
  }
}