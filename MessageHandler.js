const WebSocket = require('ws');

function formatMessageResponse(message, user) {
  return JSON.stringify({
    message,
    user: {
      id: user.client.id,
      name: user.name
    },
    send_date: new Date()
  });
}

module.exports = function handleMessage(message, user, server) {
  if (isCommand(message)) {} else {
    server
      .clients
      .forEach((client) => {
        if (client !== user.client && client.readyState === WebSocket.OPEN) {
          client.send(formatMessageResponse(message, user));
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