export default (socket, io) => {
  socket.join('main');

  socket.on('new connection', async () => {
    const roomSize = io.sockets.adapter.rooms.get('main').size;

    if (roomSize === 1) {
      socket.emit('joined', 'X');
    }
    if (io.sockets.adapter.rooms.get('main').size === 2) {
      socket.emit('joined', 'O');
      socket.emit('matched');
      socket.broadcast.to('main').emit('matched');
    }
  });

  socket.on('mouseenter', (data) => {
    socket.broadcast.to('main').emit('mouseenter', data);
  });
  socket.on('mouseleave', () => {
    socket.broadcast.to('main').emit('mouseleave');
  });

  socket.on('click', () => {
    socket.broadcast.to('main').emit('click');
  });

  socket.on('continue', () => {
    socket.broadcast.to('main').emit('continue');
  });

  socket.on('exit', () => {
    socket.broadcast.to('main').emit('disconnected');
  });

  socket.on('disconnect', () => {
    socket.broadcast.to('main').emit('disconnected');
  });
};
