'use strict';

/* Controllers */

function TchatCtrl($scope, socket) {

	$scope.messages = [];
	$scope.users = [];	
	$scope.local_user = {};

	socket.on('send:message', function (data) {
        $scope.messages.push(messageToDisplay(data));
    });

	socket.on('user:join', function (user) {
		$scope.users.push(user);
		$scope.local_user = user;
    });

	$scope.sendMessage = function() {		
		var data = {message: $scope.message, user : $scope.local_user};
        socket.emit('send:message', data);
        
        // add the message to our model locally
	    $scope.messages.push(messageToDisplay(data));

	    // clear message box
	    $scope.message = '';
	}

	function messageToDisplay(data) {
		var message = "";
		if(data.user) {
			message = data.user.name + " : ";
		}
		message += data.message;		
		return message;
	}
}
