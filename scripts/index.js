//Создание переменных
//ПОПАП
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupAddElement = document.querySelector(".popup_type_add-element");
const popupImage = document.querySelector(".popup_type_open-image");
//КНОПКИ
const editBtn = document.querySelector(".profile__edit-btn");
const closeBtn = document.querySelectorAll(".popup__close-btn");
const addBtn = document.querySelector(".profile__add-btn");

// переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Для добавления изображений
const elements = document.querySelector(".elements");
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

//Изображения по умолчанию
const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];
//-------------------------------------------------------------------
// Объявление функций

//Открытие и добавление класса
function openPopup(newWindow) {
  newWindow.classList.add('popup_opened');
//document.addEventListener('keydown', handleEscape)
}

//Закрытие
function closePopup(newWindow) {
  newWindow.classList.remove('popup_opened');
//document.removeEventListener('keydown', handleEscape)
}

// удалить элемент
function deleteElem(del) {
  del.closest('.element').remove();
}
//лайк снять поставить
function toggleElemLike(like) {
  like.classList.toggle('element__like-btn_active');
}
// открывает popup с картинкой элемента
function showPopupBig(img, name) {
  popupOpenPhoto.src = img.src;
  popupOpenPhoto.alt = name;//`${name}.`;
  popupOpenText.textContent = name;
  openPopup(popupImage);
}

//Запрет обновления
function preventDefault(evt) {
  evt.preventDefault();
}

// Отрисовка картинок по умолчанию
function addDefaultElements(elem) {
  elem.forEach(({name, link}) => {
    createElement(name, link);
  })
}

//получить внесенные значения
function getElement(name, link) {
  const element = elementTemplate.cloneNode(true);
  const elementDelete = element.querySelector('.element__delete');
  const elementImg = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like-btn');

  console.log(name);
  console.log(link);
  element.querySelector('.element__text').textContent = name;
  elementImg.src = link;
  elementImg.alt = name;//`${name}.`;

  elementDelete.addEventListener('click', () => deleteElem(elementDelete));
  elementLike.addEventListener('click', () => toggleElemLike(elementLike));
  elementImg.addEventListener('click', () => showPopupBig(elementImg, name));

  return element;
}

// Добавить фотографию
function createElement(name, link) {
  const elementNew = getElement(name, link);
  elements.prepend(elementNew);
}

//функции для сохранения
function submitformElement () {
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;

  closePopup(popupEdit);
}

function submitFormAddElement(evt) {
  const name = elementNameInput.value;
  const link = elementLinkInput.value;
  console.log(elementNameInput.value);
  console.log(elementLinkInput.value);
  evt.target.reset()
  //toggleButtonState(inputEditFormList, btnSubmitCardForm, formSetting.inactiveButtonClass);

  createElement(name, link);
  closePopup(popupAddElement);
}
//-------------------------------------------------------------------
//СЛУШАТЕЛИ ПО ДЕЙСТВИЯМ
// открытие Формы добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAddElement);
});

// Закрытие по нажатию кнопки попапа
closeBtn.forEach(btn => {
  const popupWindow = btn.closest('.popup');
  popupWindow.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup")){
      closePopup(popupWindow)
  }
});
  btn.addEventListener('click', () => closePopup(popupWindow));
})

// открытие формы редактирования профиля
editBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;

  openPopup(popupEdit);

});

// сохранение форм
formElement.addEventListener("submit", submitformElement);
formAddElement.addEventListener('submit', submitFormAddElement);

// отрисовка картинок
addDefaultElements(initialCards);


//------------------------------------------------------------
//ВАЛИДАЦИЯ В РАЗРАБОТКЕ***

//переменные
const validationSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
}

//функции
function enableValidation(validationSetting) {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  })
}
// проверка
enableValidation(validationSetting);
