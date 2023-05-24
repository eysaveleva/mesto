import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
        super(selector);
        this._img = this._container.querySelector('.popup__open-photo');
        this._imgDesc = this._container.querySelector('.popup__open-text');
  }

  open(data) {
        this._img.src = data.src;
        this._img.alt = data.alt;
        this._imgDesc.textContent = data.alt;
        super.open();
  }
}