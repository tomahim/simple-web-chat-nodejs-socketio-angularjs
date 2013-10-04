'use strict';

/* Controllers */

function TchatCtrl($scope, socket) {

	$scope.messages = [];

	socket.on('send:message', function (data) {
        $scope.messages.push(data.message);
    });

	$scope.sendMessage = function() {		
        socket.emit('send:message', {message: $scope.message});
        
        // add the message to our model locally
	    $scope.messages.push($scope.message);

	    // clear message box
	    $scope.message = '';
	}
}
