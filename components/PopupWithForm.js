import Popup  from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, { handleFormSubmit }) {
      super(selector);
      this._handleFormSubmit = handleFormSubmit;
      this._inputsList = this._container.querySelectorAll('.popup__input');
    }

    _getInputValues() {
      const formValues = {};
      this._inputsList.forEach((input) => {
          formValues[input.name] = input.value;
      });
      this.close();
      return formValues;
  }


    setEventListeners() {
      super.setEventListeners();

      this._container.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }

    close() {
      super.close();

      this._formValues = {};
      this._inputsList.forEach((input) => {
        this._formValues[input.name] = '';
      });
    }

  }
