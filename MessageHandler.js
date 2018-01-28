const {CONNECTED, MESSAGE, SET_URL, SET_NAME, GET_MESSAGES} = require('./actions');
const WebSocket = require('ws');
const urlUserIdMap = new Map();
const urlMessageMap = new Map();

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
  const msg = JSON.parse(message)
  const url = urlUserIdMap.get(user.client.id);
  switch (msg.type) {
    case MESSAGE:
      addMessageToMap(url, message);
      server
        .clients
        .forEach((client) => {
          if (client !== user.client && client.url === url && client.readyState === WebSocket.OPEN) {
            client.send(formatMessageResponse(msg.message, user));
          }
        });
      break;
    case GET_MESSAGES:
      user
        .client
        .send();
      break;
    default:
      handleCommand(msg, user, server);
      break;
  }
}
function addMessageToMap(url, message) {
  let messages = urlMessageMap.get(url);
  if (messages instanceof Array) {
    messages.push(message);
  } else {
    messages = [message];
  }
  urlMessageMap.set(url, message);
}

function handleCommand(message, user, server) {
  switch (message.type) {
    case SET_URL:
      user.client.url = message.url;
      user.setUrl(message.url);
      addUserToUrlMap(user);
      break;
    case SET_NAME:
      user.setName(message.name);
      break;
  }
}

/**
 * Adds a user to the URL Map URL -> Map<User>
 * @param {User} user to add
 */
function addUserToUrlMap(user) {
  urlUserIdMap.set(user.client.id, user.url);
}