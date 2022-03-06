import { initialCards, config } from './constants.js'
import { Section } from './Section.js';
import { Card } from './Card.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';



//Попапы
const placeImagePopup = document.querySelector('.popup_type_place-image');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');

//Формы
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const addNewPlaceForm = addNewPlacePopup.querySelector('.popup__container');

//Экземпляры классов
const profileValidator = new FormValidator(config, editProfileForm);
const placeValidator = new FormValidator(config, addNewPlaceForm);

const popupWithImage = new PopupWithImage('.popup_type_place-image');

const userInfo = new UserInfo({
  userNameSelector: '.input__name', 
  userJobSelector: '.input__job'})


//Элементы
const placeImage = document.querySelector('.popup__image');
const placeCaption = document.querySelector('.popup__image-caption');
const placesList = document.querySelector('.places-gallery__list');



//Инпуты
const userName = document.querySelector('.input__name'); //
const userJob = document.querySelector('.input__job');//
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_job')
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placelinkInput = document.querySelector('.popup__input_type_place-link');

//Кнопки
const editProfileButton = document.querySelector('.edit-btn');
const addPlaceButton = document.querySelector('.add-btn');

//Обработчики событий
editProfileButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', () => openPopup(addNewPlacePopup));
editProfileForm.addEventListener('submit', editProfile);
addNewPlaceForm.addEventListener('submit', addPlace);

//Функции

const profileForm = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile', 
  formSubmit: (data) => {
    console.log(data)
  }
})

const placeForm = new PopupWithForm ({
  popupSelector: '.popup_type_add-place', 
  formSubmit: (data) => {
    console.log(data)
    
  }
});


function addPlace (event) {
  event.preventDefault();
  createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })
  closePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}

function handleCardClick (name, link) {
  popupWithImage.open(name,link);
}

const cardList = new Section ( {
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item,'.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement) 
    } 
},'.places-gallery__list');

cardList.renderItems();


placeValidator.enableValidation();
profileValidator.enableValidation();

