const WebSocket = require('ws');

function createMessageResponse() {
  return {};
}

module.exports = function handleMessage(message, user, server) {
  if (isCommand(message)) {
    console.log('is a command');
  } else {
    server
      .clients
      .forEach((client) => {
        if (client !== user.client && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
  }
}

function isCommand(message) {
  if (message.indexOf('/') === 0) {
    return true;
  }
  return false;
}