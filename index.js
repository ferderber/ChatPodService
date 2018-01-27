const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

wss.broadcast = function (data) {
  wss
    .clients
    .forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
}

wss.on('connection', function connection(ws) {
  ws
    .on('message', function incoming(message) {
      wss
        .clients
        .forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
    });
});