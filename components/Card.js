const popupImage = document.querySelector(".popup_type_open-image");
export default class Card {
  constructor (data, templateSelector ,  handleCardClick ) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }


  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return elementCard;
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like-btn_active')
  };

  _delete () {
    this._element.remove();
    this._element = null;
  }

 /*  _showImage() {
    console.log(this._title);
    console.log(this._link);
    //if(!event.target.classList.contains('element__delete')) {
      //this._elementImg.open();
      this._elementImg.open();
     // this._handleCardClick(this._title, this._link);
    //}
  } */

  _setEventListeners() {
    this._elementDelete.addEventListener('click', () => this._delete());
    this._elementLike.addEventListener('click', () => this._toggleLike());
    //this._elementImg.addEventListener('click', this._showImage());
   // this._elementImg.addEventListener('click', () => this._showImage(event));
   // this._elementImg.addEventListener('click', () => this._showImage());
    this._elementImg.addEventListener('click', this._handleCardClick);
  }





  generateCard() {
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector('.element__like-btn');
    this._elementImg = this._element.querySelector('.element__image');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._element.querySelector('.element__text').textContent = this._title;


    this._elementImg.src = this._link;
    this._elementImg.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}






