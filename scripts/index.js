import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, config } from './constants.js'

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

//Элементы
const placeImage = document.querySelector('.popup__image');
const placeCaption = document.querySelector('.popup__image-caption');
const placesList = document.querySelector('.places-gallery__list');



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

//Обработчики событий
editProfileButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', () => openPopup(addNewPlacePopup));
editProfileForm.addEventListener('submit', editProfile);
addNewPlaceForm.addEventListener('submit', addPlace);

//Функции

function handleCardClick (name, link) {
    placeCaption.textContent = name;
    placeImage.src = link;
    placeImage.alt = name;
    openPopup(placeImagePopup);
}

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
  createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })
  closePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}

function getCard(cardData) {
  const card = new Card(cardData,'.card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

function createCard(cardData) {
  const cardElement = getCard(cardData);
  placesList.prepend(cardElement);
}

initialCards.forEach((item) => {
  createCard(item)
})

placeValidator.enableValidation();
profileValidator.enableValidation();