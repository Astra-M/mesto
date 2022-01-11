
//Попапы
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');
const placeImagePopup = document.querySelector('.popup_type_place-image');

//Элементы
const placeImage = document.querySelector('.popup__image');
const placeCaption = document.querySelector('.popup__image-caption');
const placesList = document.querySelector('.places-gallery__list');
const cardTemplate = document.querySelector('.card-template').content;

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
const popupOpenButton = document.querySelector('.edit-btn');
const addPlaceButton = document.querySelector('.add-btn');
const popupCloseButton = editProfilePopup.querySelector('.popup__close');
const closeNewPlaceButton = addNewPlacePopup.querySelector('.popup__close');
const placeImageCloseButton = placeImagePopup.querySelector('.popup__close');
const popupSaveButton = editProfileForm.querySelector('.popup__save');

//Функции

function openPopup () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  editProfilePopup.classList.add('popup_opened');
}

function closePopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

function togglePopup(modal) {
  modal.classList.toggle('popup_opened');
}

//Обработчики событий

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
addPlaceButton.addEventListener('click', () => togglePopup(addNewPlacePopup));
closeNewPlaceButton.addEventListener('click', () => togglePopup(addNewPlacePopup))
editProfileForm.addEventListener('submit', formSubmitHandler);
popupSaveButton.addEventListener('click', closePopup);

addNewPlaceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })
  togglePopup(addNewPlacePopup);
})

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

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const placeCard = cardElement.querySelector('.place-card');
  const cardImage = cardElement.querySelector('.place-card__photo');
  const cardTitle = cardElement.querySelector('.place-card__title');
  const deleteButton = cardElement.querySelector('.delete-btn');
  const likeButton = cardElement.querySelector('.like-btn');

  
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  function deleteHandler() {
    placeCard.remove();
  }
  
  function likeHandler() {
    likeButton.classList.toggle('like-btn_active');
  }
  
  function imageClickHandler() {
    togglePopup(placeImagePopup);
    placeCaption.textContent = cardData.name;
    placeImage.src = cardData.link;
  }

  function closeHandler() {
    placeImagePopup.classList.remove('popup_opened');
  }

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', likeHandler);
  cardImage.addEventListener('click', imageClickHandler);
  placeImageCloseButton.addEventListener('click', closeHandler);

  placesList.prepend(cardElement);
}

initialCards.forEach(createCard);