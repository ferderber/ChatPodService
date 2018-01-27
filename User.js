let numConnections = 0;
const utils = require('./utils');

class User {
  constructor(client, name) {
    this._client = client;
    this._name = name
      ? name
      : utils.nameRandomizer();
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
}

module.exports = User;