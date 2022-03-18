export class UserInfo {
  constructor(data) {
    this._dataName = document.querySelector(data.name);
    this._dataAbout = document.querySelector(data.about);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._dataName.textContent;
    userData.about = this._dataAbout.textContent;
    return userData;
  }

  setUserInfo(user, info) {
    this._dataName.textContent = user;
    this._dataAbout.textContent = info;
  }
}
