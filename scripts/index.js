import {
  Card
} from './Card.js'

import {
  FormValidator
} from './FormValidator.js'

import {
  initialCards, validationSetting
} from './const.js'

//Создание переменных
//ПОПАП
const popupProfileEdit = document.querySelector(".popup_type_edit-profile");
const popupElementAdd = document.querySelector(".popup_type_add-element");
const popupImage = document.querySelector(".popup_type_open-image");
//КНОПКИ
const popupProfileEditBtn = document.querySelector(".profile__edit-btn");
const popupCloseBtn = document.querySelectorAll(".popup__close-btn");
const popupElementAddBtn = document.querySelector(".profile__add-btn");
//const popupSmbBtn = document.querySelector("#smb");

// переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Для добавления изображений
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");

// открыть картинку
const popupOpenPhoto = document.querySelector(".popup__open-photo");
const popupOpenText = document.querySelector(".popup__open-text");

//формы
const formElement = document.forms['edit'];
const formAddElement = document.forms['addcard'];

// поля ввода
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input");
const elementNameInput = document.querySelector("#element-name");
const elementLinkInput = document.querySelector("#element-link");

//-------------------------------------------------------------------
// Объявление функций
//закрыть esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"))
  }
}

//Открытие и добавление класса
function openPopup(newWindow) {
  newWindow.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc);
}

//Закрытие
function closePopup(newWindow) {
  newWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function showImage (element) {
  openPopup(popupImage);
  elementTemplate.textContent = element._title;
  popupOpenPhoto.src = element._link;
  popupOpenPhoto.alt = element._title;
}

/* function createElement(item) {
  return new Card(item, '.element-template', handleClick).getCardElement()
}
 */
function handleClick(title, link) {
  popupOpenPhoto.src = link;
  popupOpenPhoto.alt = `${title} во весь экран`;
  popupOpenText.textContent = title;
  openPopup(popupImage);
}

function createCard(data) {
  return new Card(data, '.element-template', handleClick).getCardElement()
}

//функции для сохранения
function submitformElement () {
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(popupProfileEdit);
}

function submitFormAddElement(evt) {
 // evt.target.reset()
  elementsList.prepend(createCard({nameCard: elementNameInput.value, linkCard: elementLinkInput.value}));
  closePopup(popupElementAdd);
}

initialCards.forEach((data) => {
  const dataCard = {
    nameCard: data.name,
    linkCard: data.link,
    showImage: showImage
  }
  elementsList.prepend(createCard(dataCard));
});

// открытие формы редактирования профиля
popupProfileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
  openPopup(popupProfileEdit);
});

// сохранение форм
formElement.addEventListener("submit", submitformElement);
formAddElement.addEventListener('submit', submitFormAddElement);
//---------------------------------------------------------------------------

popupElementAddBtn.addEventListener('click', () => {
  elementNameInput.value = '';
  elementLinkInput.value = '';
 openPopup(popupElementAdd);
});

// Закрытие по нажатию кнопки попапа
popupCloseBtn.forEach(btn => {
  const popupWindow = btn.closest('.popup');
  popupWindow.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup")){
      closePopup(popupWindow)
    }
  });
  btn.addEventListener('click', () => closePopup(popupWindow));
})

const profileFormValidation = new FormValidator(validationSetting,formElement);
const cardFormValidation = new FormValidator(validationSetting,formAddElement);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
//-------------------------------------------------------------