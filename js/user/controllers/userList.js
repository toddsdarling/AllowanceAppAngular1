'use strict';

angular.module('ListUserController', ['UserService']);
angular.module('ListUserController').controller('ListUserController', ['$scope', 'UserService', '$http', function($scope, UserService, $http) {

	//which you click the inline "deposit/withdraw" buttons in the userlist
	//we need to know which user you're clicking for. Init this value to ''
	$scope.inlineTransactionForUser = "";

	//need to wrap this in a promise so the user list will be set correctly

	UserService.getAllUsers().then(function(data) {
				
		$scope.userList = data;
	});

	$scope.handleUserListAction = function(whichUser) {





		//set the value of the user so the list shows the transaction
		//add view ONLY for the user you just clicked on
		$scope.inlineTransactionForUser = whichUser;
	}

	$scope.handleInlineTransactionSuccess = function() {
		console.log('success');
	}




}]);