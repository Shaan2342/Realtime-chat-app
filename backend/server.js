import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; // Correctly import the Server class
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { // Use the imported Server class
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

let messages = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  // Send chat history to the new user
  socket.emit('chat history', messages);

  // Listen for new messages
  socket.on('send message', (message) => {
    messages.push(message);
    io.emit('new message', message); // Broadcast to all users
  });

  socket.on('disconnect', () => {
    console.log('User  disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});