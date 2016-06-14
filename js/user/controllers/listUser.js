'use strict';

angular.module('ListUserController', ['UserService']);
angular.module('ListUserController').controller('ListUserController', ['$scope', 'UserService', '$http', '$state', function($scope, UserService, $http, $state) {

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
		//use the user object from the ng-repeat
		var userID = this.user._id.$oid;
		$scope.inlineTransactionForUser = userID;
		$state.go('transactionInline', {u: userID});

	}

	$scope.handleInlineTransactionSuccess = function() {
		console.log('success');
	}




}]);