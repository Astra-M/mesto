
//Попапы
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');
const placeImagePopup = document.querySelector('.popup_type_place-image');

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
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const addPlaceButton = document.querySelector('.add-btn');
const closeNewPlaceButton = addNewPlacePopup.querySelector('.popup__close');
const placeImageCloseButton = placeImagePopup.querySelector('.popup__close');

//Функции

function togglePopup(modal) {
  modal.classList.toggle('popup_opened');
}

function openProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  togglePopup(editProfilePopup);
}

function editProfile (event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  togglePopup(editProfilePopup);
}

function addPlace (event) {
  event.preventDefault();
    createCard({
    name: placeNameInput.value,
    link: placelinkInput.value,
  })
  togglePopup(addNewPlacePopup);
  addNewPlaceForm.reset();
}

//Обработчики событий

editProfileButton.addEventListener('click', openProfile);
editProfileCloseButton.addEventListener('click', () => togglePopup(editProfilePopup));
addPlaceButton.addEventListener('click', () => togglePopup(addNewPlacePopup));
closeNewPlaceButton.addEventListener('click', () => togglePopup(addNewPlacePopup));
placeImageCloseButton.addEventListener('click', () => togglePopup(placeImagePopup));
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

function getCard(item) {
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
    togglePopup(placeImagePopup);
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

initialCards.forEach(createCard);