export default class UserInfo {
    constructor({ profileTitle, profileSubtitle }) {
      this._profileTitle = document.querySelector(profileTitle);
      this._profileSubtitle = document.querySelector(profileSubtitle);
    }

  getUserInfo() {
      this._userInfo = {
        profileTitle: this._profileTitle.textContent,
        profileSubtitle: this._profileSubtitle.textContent
      };
      return this._userInfo;
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.newname;
    this._profileSubtitle.textContent = data.about;

}
  }