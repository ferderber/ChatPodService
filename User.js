let numConnections = 0;
const utils = require('./utils');

class User {
  constructor(client, name) {
    this._client = client;
    this._name = name
      ? name
      : utils.nameRandomizer();
    this._url = null;
  }

  get client() {
    return this._client;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get url() {
    return this._url;
  }
  setUrl(url) {
    this._url = url;
  }
  setName(name) {
    this._name = name;
  }
}

module.exports = User;