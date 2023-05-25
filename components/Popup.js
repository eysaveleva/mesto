  export default class Popup {
    constructor(selector) {
      this._container = document.querySelector(selector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      this._container.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
      this._container.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }

    setEventListeners() {
      this._container.addEventListener('click', (event) => {
        const targetClassList = event.target.classList;
        if (targetClassList.contains('popup') || targetClassList.contains('popup__close-btn')) {
          this.close();
        }
      });
    }
  }
