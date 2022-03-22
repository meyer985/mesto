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

  setUserInfo(data) {
    this._dataName.textContent = data.name;
    this._dataAbout.textContent = data.about;
  }
}
