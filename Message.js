class Message {
  constructor(content, time, user) {
    this._content = content;
    this._time = time;
    this._user = user;
  }

  get content() {
    return this._content;
  }

  get time() {
    return this._time;
  }

  get content() {
    return this._user;
  }
}