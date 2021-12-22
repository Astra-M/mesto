const popupOpenButton = document.querySelector('.edit-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup')

function togglePopup () {
  popup.classList.toggle('popup_opened');
  nameInput.value = 'Жак-Ив Кусто';
  jobInput.value = 'Исследователь океана';
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
let popupSaveButton = formElement.querySelector('.popup__save');

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let userName = document.querySelector('.input__name');
  let userJob = document.querySelector('.input__job');
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  nameInput.value = 'Жак-Ив Кусто';
  jobInput.value = 'Исследователь океана';
}


formElement.addEventListener('submit', formSubmitHandler); 
popupSaveButton.addEventListener('click', closePopup);