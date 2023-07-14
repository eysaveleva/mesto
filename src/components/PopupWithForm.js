import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selector,handleFormSubmit ) {
    super(selector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._container.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._button = this._container.querySelector('.popup__submit-btn');
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputsList.forEach((input) => {
    formValues[input.name] = input.value;
    });

    return formValues;
  }

  processSaving(status){
    if(status){
      this._button.textContent = 'Cохранение...';
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      /* this.close(); */
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = '';
    });
  }
}