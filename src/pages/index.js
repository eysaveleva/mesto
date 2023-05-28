import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {initialCards,
        validationSetting,
        popupProfileEditBtn,
        popupElementAddBtn,
        formElement,
        formAddElement,
       profileNameInput,
        profileJobInput,
        elementNameInput,
        elementLinkInput
} from '../utils/const.js'

const popupImage = new PopupWithImage('.popup_type_open-image');

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    console.log(item);
    const cardElement = generateNewCard(item);
    cardsList.addItem(cardElement);
    }
  },
  '.elements'
);

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function generateNewCard(data) {
  const newCard = new Card(data, ".element-template", handleCardClick).generateCard();
  return newCard;
}

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle'
});

const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputs) => userInfo.setUserInfo(inputs));
const popupFormCard = new PopupWithForm('.popup_type_add-element', (data) => { cardsList.addItem(generateNewCard({name: data['name'], link: data['element-link']})); });

cardsList.renderItems();
popupFormCard.setEventListeners();
popupFormProfile.setEventListeners();
popupImage.setEventListeners();

const openFormProfile = () => {
  popupFormProfile.open();
  const { profileTitle, profileSubtitle } = userInfo.getUserInfo();
  profileNameInput.value = profileTitle;
  profileJobInput.value = profileSubtitle;
  profileFormValidation.resetValidation();
}

const openFormCard = () => {
  elementNameInput.value = '';
  elementLinkInput.value = '';
  cardFormValidation.resetValidation();
  popupFormCard.open();
}

popupProfileEditBtn.addEventListener ('click',openFormProfile);
popupElementAddBtn.addEventListener ('click',openFormCard);

const profileFormValidation = new FormValidator(validationSetting,formElement);
const cardFormValidation = new FormValidator(validationSetting,formAddElement);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();