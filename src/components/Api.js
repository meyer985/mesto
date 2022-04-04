class Api {
  constructor(prop) {
    const { baseUrl, headers } = prop;
    this._baseUrl = prop.baseUrl;
    this._headers = prop.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me `, { headers: this._headers })
      .then((res) => {
        if (res.status) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch(() => console.log(res.status));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => {
        if (res.status) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch(() => console.log(res.status));
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "fa5b4790-bd4f-4062-8112-0930c934900c",
    "Content-Type": "application/json",
  },
});
