//переменные
const validationSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
}

//функции:

//прокерка наличия ошибки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
//переключение состояния кнопки submit
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//показать ошибки
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

//скрыть ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// включает валидацию во всех формах
function enableValidation(validationSetting) {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    setEventListeners(formElement, validationSetting); // опишим отдельной функцией
  })
}

//Основная агрегированная функция
function setEventListeners(formElement, validationSetting) {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = validationSetting;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

//проверка валидности ввода
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//функция очистки ошибок
//очистка полей ввода и удаление ошибок валидации
function resetFormCondition(newWindow) {
  newWindow.querySelectorAll('.popup__input_error')
    .forEach(inputElement => inputElement.classList.remove('popup__input_error'));
    newWindow.querySelectorAll('.popup__input-error_active')
    .forEach(errorElement => errorElement.classList.remove('popup__input-error_active'));
    newWindow.querySelectorAll('.popup__form')
    .forEach(formElement => formElement.reset());
}

//запускаем валидацию
enableValidation(validationSetting);