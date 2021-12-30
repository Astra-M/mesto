const popupOpenButton = document.querySelector('.edit-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.input__name');
const userJob = document.querySelector('.input__job');


const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const popupSaveButton = formElement.querySelector('.popup__save');


function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
popupSaveButton.addEventListener('click', closePopup);