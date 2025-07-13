const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 }, () => {
  console.log("WebSocket server running on ws://localhost:5000");
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (data) => {
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
