// export function for listening to the socket on the connection
var users = [];

module.exports = function (socket) {	

    socket.on('disconnect', function () {
		socket.broadcast.emit('send:message', {message : new_user.name + ' a quitté la discussion'});
		users.pop();
    });

    var new_user = {id : (users.length+1), name : generateGuestName()};
    users.push(new_user);
    console.log(users);

    socket.emit('send:message', {message  : '*** Bienvenue sur le chat ' + new_user.name + ' ***' });

	socket.broadcast.emit('send:message', {message : new_user.name + ' a rejoint la discussion'});

    socket.emit('user:join', new_user);

	socket.on('send:message', function (data) {
    	socket.broadcast.emit('send:message', data);
    });

    socket.on('user:join', function (user) {
    	socket.broadcast.emit('user:join', user);
    });
};


//Try to generate unique name
function generateGuestName() {
	var num = (users.length+1);
	var name = 'Guest_' + num;
	for (var i = 0; i <= users.length-1; i++) {
		if(users[i].name != name) {
			break;
		} else {
			num++;
			name = 'Guest_' + (users.length+1);
		}
	};
	return name;
}