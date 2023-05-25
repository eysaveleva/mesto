//import './pages/index.css'; !!!!!!!
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {initialCards,
        validationSetting,
     //   popupProfileEdit,
     //   popupElementAdd,
    //    popupImage,
        popupProfileEditBtn,
     //   popupCloseBtn,
        popupElementAddBtn,
    //    popupSmbBtn,
        profileTitle,
        profileSubtitle,
    //    elementsList,
    //    elementTemplate,
    //    popupOpenPhoto,
     //   popupOpenText,
        formElement,
        formAddElement,
       profileNameInput,
        profileJobInput,
        elementNameInput,
        elementLinkInput
} from '../components/const.js'



const popupImage = new PopupWithImage('.popup_type_open-image');





const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item,'.element-template',{
      handleCardClick: () => {
        popupImage.open(item);
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
  },
  '.elements'
);




function handleCardClick() {
  popupImage.open();
}

function generateNewCard(item) {
  const newCard = new Card({name: item['name'], link: item['element-link']}, '.element-template',
  handleCardClick).generateCard();
  console.log(newCard);
  return newCard;
}

const userInfo = new UserInfo({
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle'
});

const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputs) => userInfo.setUserInfo(inputs));
const popupFormCard = new PopupWithForm('.popup_type_add-element', (data) => { cardsList.addItem(generateNewCard(data)); });

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
