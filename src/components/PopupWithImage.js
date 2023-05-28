import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._img = this._container.querySelector('.popup__open-photo');
        this._imgText = this._container.querySelector('.popup__open-text');
    }

    open(title, link) {
      this._img.src = link;
      this._img.alt = `${title} во весь экран`;
      this._imgText.textContent = title;
      super.open();
    }
}