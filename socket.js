// export function for listening to the socket
module.exports = function (socket) {
  
      socket.emit('send:message', {message  : 'Bienvenue sur le chat' });

      socket.on('send:message', function (data) {
          socket.broadcast.emit('send:message', data);
      });
};
