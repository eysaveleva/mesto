export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;;
    this._headers = options.headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  _checkResponse(res) {
    if (res.ok) {
        return Promise.resolve(res.json());
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserData() {
    return this._request(this._userUrl, {
      headers: this._headers,
    })
  }

  saveUserChanges({ name, about }) {
    return this._request(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  changedAvatar({ link }) {
    return this._request(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar : link})
    })
  }

  getInitialCards() {
    return this._request(this._cardsUrl, {
      headers: this._headers,
    })
  }

  postNewCard(card) {
    return this._request(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
  }

  removeCard(cardId) {
    return this._request(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  likedCard(cardId) {
    return this._request(`${this._likesUrl}/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  dislikedCard(cardId) {
    return this._request(`${this._likesUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}