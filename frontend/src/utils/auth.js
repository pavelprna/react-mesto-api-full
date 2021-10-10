class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _request({ endpoint, req }) {
    return fetch(this.baseUrl + endpoint, req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
      })
  }

  signUp({ password, email }) {
    return this._request({
      endpoint: 'signup',
      req: {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ password, email }),
        credentials: 'include',
      },
    });
  }

  signIn(userData) {
    return this._request({
      endpoint: 'signin',
      req: {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(userData),
        credentials: 'include',
      }
    })
      .catch(err => console.log(err));
  }

  logout() {
    return this._request({
      endpoint: 'logout',
      req: {
        method: 'DELETE',
        credentials: 'include',
      }
    })
  }

  checkToken() {
    return this._request({
      endpoint: 'users/me',
      req: {
        method: "GET",
        headers: {
          ...this.headers,
        },
        credentials: 'include',
      }
    })
  }
}

const auth = new Auth({
  baseUrl: 'https://api.mesto.prna.nomoredomains.club/',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default auth;
