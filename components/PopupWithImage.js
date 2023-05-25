import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
        super(selector);
  }

  open(data) {
        super.open();

        this._link = data.link;
        this._name = data.name;

        this._container.querySelector('.popup__open-photo').src = this._link;
        this._container.querySelector('.popup__open-photo').alt = `${this._name} во весь экран`;
        this._container.querySelector('.popup__open-text').textContent = this._name;
  }
}