import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import socketHandler from './handlers/socket.js';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on:3000');
  io.on('connection', function (socket) {
    socketHandler(socket, io);
  });
});
