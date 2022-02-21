
import { Card } from './card.js'
import { formValidator } from './formValidator.js'
export { openPopup, placeImagePopup, placeCaption, placeImage }

//Конфиги
const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__save_disabled',
  submitButtonSelector: '.popup__save',
}

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

//Попапы
const placeImagePopup = document.querySelector('.popup_type_place-image');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');

//Экземпляры классов
const profileValidator = new formValidator(config, editProfilePopup);
const placeValidator = new formValidator(config, addNewPlacePopup);

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

//Обработчики событий
editProfileButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', () => openPopup(addNewPlacePopup));
editProfileForm.addEventListener('submit', editProfile);
addNewPlaceForm.addEventListener('submit', addPlace);

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
  createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })
  closePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}

function createCard(cardData) {
  const card = new Card(cardData,'.card-template');
  const cardElement = card.generateCard();
  placesList.prepend(cardElement);
}

initialCards.forEach((item) => {
  createCard(item)
})

placeValidator.enableValidation();
profileValidator.enableValidation();