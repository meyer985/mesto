class Api {
  constructor(prop) {
    const { baseUrl, headers } = prop;
    this._baseUrl = prop.baseUrl;
    this._headers = prop.headers;
  }

  _checkResponse(res) {
    if (res.status) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me `, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  updateProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deliteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "fa5b4790-bd4f-4062-8112-0930c934900c",
    "Content-Type": "application/json",
  },
});
