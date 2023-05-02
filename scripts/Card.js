export class Card {
    constructor (data, templateSelector, handleClick) {
      this._title = data.nameCard;
      this._link = data.linkCard;
      this._templateSelector = templateSelector;
      this._handleClick = handleClick;
      }

      _getTemplate() {
        const elementCard = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);

        return elementCard;
      }

      _delete () {
        this._elementList.closest('.element').remove();
      }

        _toggleLike() {
          this._buttonLike.classList.toggle('element__like-btn_active')
        };

        _showImage(event) {
          if(!event.target.classList.contains('element__delete')) {
            this._handleClick(this._title, this._link)
          }
        };

         _setEventListeners() {
          this._elementDelete.addEventListener('click', () => this._delete());
          this._elementLike.addEventListener('click', () => this._toggleLike());
          this._elementImg.addEventListener('click', event => this._showImage(event));
        }

         getCardElement() {
          this._element = this._getTemplate();
          this._elementDelete = this._element.querySelector('.element__delete');
          this._elementImg = this._element.querySelector('.element__image');
          this._elementLike = this._element.querySelector('.element__like-btn');

          this._element.querySelector('.element__text').textContent = this._title;
          this._elementImg.src = this._link;
          this._elementImg.alt = this._title;

          this._setEventListeners();


          return this._element;

           }

          }
