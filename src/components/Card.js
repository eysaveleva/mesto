export default class Card {
  constructor(data, userID, templateSelector, handleCardClick, handleDeleteConfirm, uploadAddLike, uploadRemoveLike ) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._uploadAddLike = uploadAddLike;
    this._uploadRemoveLike = uploadRemoveLike;
    this._id = data._id;
    this._userID = userID;
    this._idOwner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteConfirm = handleDeleteConfirm;
}

_getTemplate() {
  const elementCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return elementCard;
}

_checkLike() {
return this._likes.some((like) => like._id === this._userID)}

deleteCard() {
  this._element.remove();
  this._element = null;
}

_showImage(event) {
  if(!event.target.classList.contains('element__delete')) {
    this._handleCardClick(this._data)
  }
}

_setEventListeners() {
  this._likeButton.addEventListener('click', () => {
    if (this._likeButton.classList.contains('element__like-btn_active')) {
        this._uploadRemoveLike(this);
    } else {
        this._uploadAddLike(this);
    }
  });

  this._cardTrash.addEventListener('click', () => {
    this._handleDeleteConfirm(this);
  });

  this._cardImage.addEventListener('click', event => {
    this._showImage(event);
  });
}

generateCard() {
  this._element = this._getTemplate();
  this._likeButton = this._element.querySelector('.element__like-btn');
  this._cardImage = this._element.querySelector('.element__image');
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._cardTrash = this._element.querySelector('.element__delete');
  this._cardTitle = this._element.querySelector('.element__text');

  this._cardTitle.textContent = this._name;
  if (this._userID !== this._idOwner) {
    this._cardTrash.remove();
  }

  this._countLikes();
  this._setEventListeners();

  return this._element;
}

_countLikes() {
  this._element.querySelector('.element__like-counter').textContent = this._likes.length;
  this._likeButton.classList.toggle("element__like-btn_active", this.isLiked()) ;
}

like() {
  this._likeButton.classList.add("element__like-btn_active");
}

dislike() {
  this._likeButton.classList.remove("element__like-btn_active");
}

updateLikes(data) {
  this._likes = data.likes;
  this._countLikes()
}

isLiked() {
  return this._likes.some((like) => like._id === this._userID)
}
}