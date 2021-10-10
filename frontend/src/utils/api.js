class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(param) {
    return fetch(this._baseUrl + param.path, {
      method: param.method,
      headers: this._headers,
      body: param.body,
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
      });
  }

  getUser() {
    return this._request({
      method: 'GET',
      path: 'users/me',
    });
  }

  getInitialCards() {
    return this._request({
      method: 'GET',
      path: 'cards',
    });
  }

  updateUser(data) {
    return this._request({
      method: 'PATCH',
      path: 'users/me',
      body: JSON.stringify(data),
    });
  }

  createCard(data) {
    return this._request({
      method: 'POST',
      path: 'cards',
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request({
      method: 'DELETE',
      path: `cards/${cardId}`,
    });
  }

  likeCard(cardId) {
    return this._request({
      method: 'PUT',
      path: `cards/${cardId}/likes`,
    });
  }

  unlikeCard(cardId) {
    return this._request({
      method: 'DELETE',
      path: `cards/${cardId}/likes`,
    });
  }

  changeLikeCardStatus(cardId, status) {
    return status ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  changeAvatar(link) {
    return this._request({
      method: 'PATCH',
      path: 'users/me/avatar',
      body: JSON.stringify(link),
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.prna.nomoredomains.club/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
