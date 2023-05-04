export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    this._inputList = Array.from(form.querySelectorAll(settings.inputSelector))
    this._buttonElement = form.querySelector(settings.submitButtonSelector)
    }

  //показать ошибки
  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  //скрыть ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

   //переключение состояния кнопки submit
  toggleButtonState = () => {
    this._inputList.some(inputElement => !inputElement.validity.valid) ?
    this._buttonElement.classList.add(this._settings.inactiveButtonClass):
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass)

    this._inputList.some(inputElement => !inputElement.validity.valid) ?
    this._buttonElement.disabled = true:
    this._buttonElement.disabled = false

  }
  //проверка валидности ввода
  _checkInputValidity = (inputElement) => {
    !inputElement.validity.valid ?
      this._showInputError(inputElement) :
      this._hideInputError(inputElement)
  }
// скрыть ошибки валидации
  resetValidation = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.toggleButtonState();
  }

  //Запрет обновления
  preventDefault(evt) {
    evt.preventDefault();
  }

  // включение валидации
  enableValidation = () => {
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement)
      this.toggleButtonState()
    }))
  }
}