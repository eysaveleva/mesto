export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, selectorAvatar  }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
    this._profileID = null;
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    this._userInfo = {
      profileTitle: this._profileTitle.textContent,
      profileSubtitle: this._profileSubtitle.textContent,
      profileID: this._profileID,
      profileAvatar: this._avatar
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    this._profileID = data._id;
    this._avatar.src = data.avatar;
  }
}