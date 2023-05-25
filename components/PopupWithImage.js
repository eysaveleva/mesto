import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._container.querySelector('.popup__open-photo');
        this._popupCaption = this._container.querySelector('.popup__open-text');
    }

    open(data) {
      super.open();
        this._popupImage.src = data.link;
        this._popupImage.alt =  data.name;
        this._popupCaption.textContent = data.name;
    }
}