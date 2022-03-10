import { initialCards, config } from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js'; 
import './index.css';

//Попапы
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');

//Формы
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const addNewPlaceForm = addNewPlacePopup.querySelector('.popup__container');

//Инпуты
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_job');

//Экземпляры классов
const profileValidator = new FormValidator(config, editProfileForm);
const placeValidator = new FormValidator(config, addNewPlaceForm);

const popupWithImage = new PopupWithImage('.popup_type_place-image');
popupWithImage.setEventListeners();

function handleCardClick (name,link) {
  popupWithImage.open(name,link);
}

const userInfo = new UserInfo({
  userNameSelector: '.input__name',
  userJobSelector: '.input__job'
})

const profileForm = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formSubmit: (data) => {
    userInfo.setUserInfo({name: data.popup__name, job: data.popup__job})
  }
})
profileForm.setEventListeners();

const editProfileButton = document.querySelector('.edit-btn');
editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.userName
  jobInput.value = userData.userJob

  profileForm.open();
})

function createCard (data) {
  const card = new Card(data,'.card-template', handleCardClick);
  return card.generateCard();
}

const placeForm = new PopupWithForm ({
  popupSelector: '.popup_type_add-place',
  formSubmit: (data) => {
    const cardElement = createCard ({name: data.popup__place, link: data.popup__link});
    cardList.addItem (cardElement);
  }
});
placeForm.setEventListeners();

const addPlaceButton = document.querySelector('.add-btn');
addPlaceButton.addEventListener('click', () => {
  placeForm.open(); 
})

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard (item);
    cardList.addItem(cardElement);
  }
},'.places-gallery__list');

cardList.renderItems();

placeValidator.enableValidation();
profileValidator.enableValidation();