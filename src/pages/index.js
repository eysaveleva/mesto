import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

import {validationSetting,
        popupProfileEditBtn,
        popupElementAddBtn,
        formElement,
        formAddElement,
        profileNameInput,
        profileJobInput,
        changeAvatarButton,
        avatarPopup
} from '../utils/const.js';

function handleCardClick(card) {
  popupImage.open(card);
}

function handleDeleteConfirm(card) {
  api.removeCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleFormAddCard(card) {
  popupFormCard.processSaving(true);
  api.postNewCard(card)
    .then((data) => {
      cardsList.addItem(generateNewCard(data));
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormCard.processSaving(false);
    })
}

function generateNewCard(card) {
  const newCard = new Card(
    card,
    userInfo.getUserInfo().profileID,
    "#card",
    handleCardClick,
    (cardObj) => {popupWithConfirm.open(cardObj)},
    (cardObj) => {uploadAddLike(cardObj)},
    (cardObj) => {uploadRemoveLike(cardObj)}
    ).generateCard();
  return newCard;
}

function handleFormEditProfile(dataProfile) {
  popupFormProfile.processSaving(true);
  api.saveUserChanges({ name: dataProfile.newName, about: dataProfile.about })
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.processSaving(false);
    })
}


function handleFormChangeAvatar(dataAvatar) {
  popupFormChangeAvatar.processSaving(true);

  api.changedAvatar(dataAvatar)
    .then((data) => {
      console.log(data);
      userInfo.setUserInfo(data);
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormChangeAvatar.processSaving(false);
    })
}

function uploadAddLike(card) {
  api.likedCard(card._id)
  .then((data) => {
    card.like();
    card.updateLikes(data);
  })
  .catch((error) => {
      console.log(`Ошибка: ${error}`);
  });
}

function uploadRemoveLike(card) {
  api.dislikedCard(card._id)
  .then((data) => {
    card.dislike();
    card.updateLikes(data);
  })
  .catch((error) => {
      console.log(`Ошибка: ${error}`);
  });
}

const cardsList = new Section(
  {
      renderer: (item) => {
          const cardItem = generateNewCard(item);
          cardsList.addItem(cardItem);
      },
  },
  '.elements'
);

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  selectorAvatar: '.profile-image__avatar'
});

const popupFormCard = new PopupWithForm('.popup_type_add-element', handleFormAddCard);
const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditProfile);
const popupImage = new PopupWithImage('.popup_type_open-image');
const popupWithConfirm = new PopupWithConfirm('.popup-delete',handleDeleteConfirm);
const popupFormChangeAvatar = new PopupWithForm('.popup-avatar', handleFormChangeAvatar);

popupWithConfirm.setEventListeners();
popupImage.setEventListeners();
popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupFormChangeAvatar.setEventListeners();

const profileFormValidation = new FormValidator(validationSetting,formElement);
const cardFormValidation = new FormValidator(validationSetting,formAddElement);
const avatarFormValidation = new FormValidator(validationSetting,avatarPopup);

avatarFormValidation.enableValidation();
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

const openFormProfile = () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.profileTitle;
  profileJobInput.value = userData.profileSubtitle;
  profileFormValidation.resetValidation();
  popupFormProfile.open();
}

const openFormCard = () => {
  cardFormValidation.resetValidation();
  popupFormCard.open();
}

const openFormAvatar = () => {
  avatarFormValidation.resetValidation();
  popupFormChangeAvatar.open();
}

popupProfileEditBtn.addEventListener ('click',openFormProfile);
popupElementAddBtn.addEventListener ('click',openFormCard);
changeAvatarButton.addEventListener ('click',openFormAvatar);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
  authorization: '70b5a854-9915-4cad-abf7-c60ff6335d2e',
  'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards.reverse());
  })
.catch((error) => console.log(`Ошибка: ${error}`));