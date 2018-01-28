const WebSocket = require('ws');
const User = require('./User');
const handleMessage = require('./MessageHandler');
const wss = new WebSocket.Server({port: 8899});
const users = new Map();
const {CONNECTED} = require('./actions');
let numConnections = 0;

wss.broadcast = function (data) {
  wss
    .clients
    .forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
}

function getUser(ws) {
  let user;
  if (ws.id !== undefined) {
    user = users.get(ws.id);
  } else {
    ws.id = numConnections;
    numConnections += 1;
    user = new User(ws);
    users.set(ws.id, user);
  }
  return user;
}

wss
  .on('connection', function connection(ws) {
    let user = getUser(ws);
    ws.send(JSON.stringify({type: CONNECTED, id: user.client.id, name: user.name}));
    ws.on('message', function incoming(message) {
      let user = getUser(ws);
      handleMessage(message, user, wss);
    });
    ws.on('close', (code, reason) => {
      users.delete(ws.id);
      console.log("closed connection " + ws.id);
    });
    ws.on('error', (err) => console.error(err));
  });