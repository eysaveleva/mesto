import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._img = this._container.querySelector('.popup__open-photo');
    this._imgDesc = this._container.querySelector('.popup__open-text');
  }

  open(data) {
    super.open();
    this._img.src = data.link;
    this._img.alt = `${data.name} во весь экран`;
    this._imgDesc.textContent = data.name;
  }
}