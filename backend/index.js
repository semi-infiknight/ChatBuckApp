// Import the necessary modules and initialize the app
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Define the Socket.io event handlers
io.on('connection', socket => {
  console.log(`Client ${socket.id} connected`);

  // Handle incoming messages
  socket.on('chat message', msg => {
    console.log(`Received message: ${msg}`);
    io.emit('chat message', msg);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
