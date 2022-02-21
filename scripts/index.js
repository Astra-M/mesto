
//Попапы
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');
const placeImagePopup = document.querySelector('.popup_type_place-image');
const popups = document.querySelectorAll('.popup');

//Элементы
const placeImage = document.querySelector('.popup__image');
const placeCaption = document.querySelector('.popup__image-caption');
const placesList = document.querySelector('.places-gallery__list');

//Формы
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const addNewPlaceForm = addNewPlacePopup.querySelector('.popup__container');

//Инпуты
const userName = document.querySelector('.input__name');
const userJob = document.querySelector('.input__job');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_job')
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placelinkInput = document.querySelector('.popup__input_type_place-link');

//Кнопки
const editProfileButton = document.querySelector('.edit-btn');
const addPlaceButton = document.querySelector('.add-btn');

//Функции

function closePopupOnClick() {
  popups.forEach( (popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (event.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
  })
}

closePopupOnClick();

function closePopupByEscapeButton(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscapeButton);
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscapeButton);
}

function openProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(editProfilePopup);
}

function editProfile (event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function addPlace (event) {
  event.preventDefault();
  generateCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })  
  closePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}

/*function addPlace (event) {
  event.preventDefault();
    createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })  
  closePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}*/

//Обработчики событий

editProfileButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', () => openPopup(addNewPlacePopup));
editProfileForm.addEventListener('submit', editProfile);
addNewPlaceForm.addEventListener('submit', addPlace);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

class Card {
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

function createCard(cardData) {
  const placeCard = generateCard(cardData);
  placesList.prepend(placeCard);
}

initialCards.forEach((item) => {
  const card = new Card(item,'.card-template');
  const cardElement = card.generateCard();
  placesList.prepend(cardElement);
})



  /*const cardTitle = cardElement.querySelector('.place-card__title');
  const deleteButton = cardElement.querySelector('.delete-btn');
  const likeButton = cardElement.querySelector('.like-btn');

const cardImage = cardElement.querySelector('.place-card__photo');
  const cardTitle = cardElement.querySelector('.place-card__title');
  
  const likeButton = cardElement.querySelector('.like-btn');*/
  //this._cardElement = this._template.cloneNode(true)
/*
messageList.forEach((item) => {
    const card = new Card(item); // передаём объект аргументом
    const cardElement = card.generateCard();
    document.body.append(cardElement);


        //this._template= document.querySelector(cardSelector).content.querySelector('.place-card')
//this._cardElement = this._template.cloneNode(true)
}); 

/*openPopup(placeImagePopup);
    placeCaption.textContent = item.name;
    placeImage.src = item.link;
    placeImage.alt = item.name;
    
    const placeImage = document.querySelector('.popup__image');
    const placeCaption = document.querySelector('.popup__image-caption');
    */


/*function getCard(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const placeCard = cardElement.querySelector('.place-card');
  const cardImage = cardElement.querySelector('.place-card__photo');
  const cardTitle = cardElement.querySelector('.place-card__title');
  const deleteButton = cardElement.querySelector('.delete-btn');
  const likeButton = cardElement.querySelector('.like-btn');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  function deleteHandler() {
    placeCard.remove();
  }

  function likeHandler() {
    likeButton.classList.toggle('like-btn_active');
  }

  function imageClickHandler() {
    openPopup(placeImagePopup);
    placeCaption.textContent = item.name;
    placeImage.src = item.link;
    placeImage.alt = item.name;
  }

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', likeHandler);
  cardImage.addEventListener('click', imageClickHandler);

  return cardElement;
}

function createCard(cardData) {
  const placeCard = getCard(cardData);
  placesList.prepend(placeCard);
}

initialCards.forEach(createCard);*/