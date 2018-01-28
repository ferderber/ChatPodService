const {CONNECTED, MESSAGE, SET_URL, SET_NAME} = require('./actions');
const WebSocket = require('ws');
const urlUserIdMap = new Map();

function formatMessageResponse(message, user) {
  return JSON.stringify({
    message,
    user: {
      id: user.client.id,
      name: user.name
    },
    type: MESSAGE,
    send_date: new Date()
  });
}

module.exports = function handleMessage(message, user, server) {
  const msg = JSON.parse(message);
  const url = urlUserIdMap.get(user.client.id);
  switch (msg.type) {
    case MESSAGE:
      server
        .clients
        .forEach((client) => {
          if (client !== user.client && client.url === url && client.readyState === WebSocket.OPEN) {
            client.send(formatMessageResponse(msg, user));
          }
        });
      break;
    default:
      handleCommand(msg, user, server);
      break;
  }
}

function handleCommand(message, user, server) {
  switch (message.type) {
    case SET_URL:
      user.client.url = message.url;
      user.setUrl(message.url);
      addUserToUrlMap(user);
    case SET_NAME:
      user.setName(message.name);
  }
}

/**
 * Adds a user to the URL Map URL -> Map<User>
 * @param {User} user to add
 */
function addUserToUrlMap(user) {
  console.log(user.client.id + " added to " + user.url);
  urlUserIdMap.set(user.client.id, user.url);
}