'use strict';

angular.module('ListUserController', ['UserService']);
angular.module('ListUserController').controller('ListUserController', ['$scope', 'UserService', '$http', function($scope, UserService, $http) {

	$scope.inlineTransactionForUser = "";

	//need to wrap this in a promise so the user list will be set correctly

	UserService.getAllUsers().then(function(data) {
				
		$scope.userList = data;
	});

	$scope.handleUserListAction = function(whichUser) {
		console.log('button clicked');
		//stop default event
		//event.preventDefault();

		//get the href
		$scope.inlineTransactionForUser = whichUser;



		//$scope.transactionTemplate = whichAction;

		//angular.element(document).find('.slide-animate').src = '"' + whichAction + '"'; 

		/*
		$http.get(whichAction).then(function(response) {
			console.log(response);
		}) */


	}




}]);