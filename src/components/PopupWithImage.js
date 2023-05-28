import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

    }

    open(title, link) {
      this._link = link;
      this._name = title;
      this._container.querySelector('.popup__open-photo').src = this._link;
      this._container.querySelector('.popup__open-photo').alt = `${this._name} во весь экран`;
      this._container.querySelector('.popup__open-text').textContent = this._name;
      super.open();
    }
}