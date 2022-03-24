import { config } from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js'
import './index.css';

//Попапы
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addNewPlacePopup = document.querySelector('.popup_type_add-place');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');

//Элементы
const avatarIcon = document.querySelector('.user-form__avatar');

//Кнопки
const editProfileButton = document.querySelector('.edit-btn');
const addPlaceButton = document.querySelector('.add-btn');
const submitPlaceButton = addNewPlacePopup.querySelector('.popup__save')
const submitProfileButton = editProfilePopup.querySelector('.popup__save')
const submitAvatarButton = editAvatarPopup.querySelector('.popup__save')

//Формы
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const addNewPlaceForm = addNewPlacePopup.querySelector('.popup__container');
const editAvatarForm = editAvatarPopup.querySelector('.popup__container');

//Инпуты
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_job');


const profileValidator = new FormValidator(config, editProfileForm);
const placeValidator = new FormValidator(config, addNewPlaceForm);
const avatarValidator = new FormValidator(config, editAvatarForm)

const userInfo = new UserInfo({
  userNameSelector: '.input__name',
  userJobSelector: '.input__job',
  userAvatarSelector: '.user-form__avatar',
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '09dce2b8-d324-4571-9bf8-0a691518360f',
    'Content-Type': 'application/json'
  }
})

let userId

const profileRequest = api.getProfile()
const cardsRequest = api.getCards()
Promise.all([profileRequest, cardsRequest])
  .then( res => {
    const { 0: profileData, 1: listOfCards } = res;
    userId = profileData._id;
  
    userInfo.setUserInfo({name: profileData.name, job: profileData.about, avatar: profileData.avatar});
  
    listOfCards.forEach(data => {
        const cardElement = createCard ({
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id
        });
        cardList.addItem(cardElement)
        })
  })
  .catch(err => console.log(err))

    const avatarPopup = new PopupWithForm ({
      popupSelector: '.popup_type_edit-avatar',
      formSubmit: (data) => {
        const { avatar__link: avatar } = data;

        displayLoadingText (submitAvatarButton)

        api.editAvatar(avatar)
          .then(res => {
            userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar})
            avatarPopup.close()
          })
          .catch(err => console.log(err))
          .finally(() => {
            submitAvatarButton.textContent = 'Сохранить'
          })
      }
    })
    avatarPopup.setEventListeners();
    
    avatarIcon.addEventListener('click', () => {
      avatarPopup.open()
    })

const profileForm = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formSubmit: (data) => {
    const { popup__name: name, popup__job: about } = data;

    displayLoadingText (submitProfileButton);

    api.editProfile(name, about)
      .then((newUserInfo) => {
        userInfo.setUserInfo({name: newUserInfo.name, job: newUserInfo.about, avatar: newUserInfo.avatar})
        profileForm.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        submitProfileButton.textContent = 'Сохранить'
      })
  }
})
profileForm.setEventListeners();

const cofirmDeletePopup = new PopupWithForm ({
  popupSelector: '.popup_type_delete-confirm',
  })
cofirmDeletePopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_place-image');
popupWithImage.setEventListeners();

const placeForm = new PopupWithForm ({
  popupSelector: '.popup_type_add-place',
  formSubmit: (data) => {
    const { popup__place: name, popup__link: link } = data
    
    displayLoadingText (submitPlaceButton);
    
    api.addCard(name, link)
      .then(res => {
        const cardElement = createCard ({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
        });
        cardList.addItem (cardElement)
        placeForm.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
          submitPlaceButton.textContent = 'Создать'
      })
  }
});

placeForm.setEventListeners();

addPlaceButton.addEventListener('click', () => {
  placeForm.open();
})

function displayLoadingText (button) {
  button.textContent = 'Сохранение...'
}

function handleCardClick (name,link) {
  popupWithImage.open(name,link);
}

editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.userName
  jobInput.value = userData.userJob

  profileForm.open();
})

function createCard (data) {
  const card = new Card (
    data,
    '.card-template',
    handleCardClick,
    (id) => {
      cofirmDeletePopup.open()
      cofirmDeletePopup.changeSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard()
            cofirmDeletePopup.close()
          })
          .catch(err => console.log(err))
          })
      },
      (id) => {
        if(card.isLiked()) {
          api.deleteLike(id) 
            .then( res => {
              card.setLikes(res.likes)
            })
            .catch(err => console.log(err))
          } else {
          api.addLike(id)
            .then( res => {
              card.setLikes(res.likes)
            })
            .catch(err => console.log(err))
        }
      }
    )
  return card.generateCard();
}

const cardList = new Section ({
  items: [],
},'.places-gallery__list');

placeValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation()