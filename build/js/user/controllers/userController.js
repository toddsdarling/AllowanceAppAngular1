'use strict';

angular.module('ListUserController', ['UserService']);
angular.module('ListUserController').controller('ListUserController', ['$scope', 'UserService', '$http', function($scope, UserService, $http) {

	$scope.transactionTemplate = "";

	//need to wrap this in a promise so the user list will be set correctly

	UserService.getAllUsers().then(function(data) {
				
		$scope.userList = data;
	});

	$scope.handleUserListAction = function() {
		console.log('button clicked');
		//stop default event
		//event.preventDefault();

		//get the href
		var whichAction = event.currentTarget.href;

		//$scope.transactionTemplate = whichAction;

		//angular.element(document).find('.slide-animate').src = '"' + whichAction + '"'; 

		/*
		$http.get(whichAction).then(function(response) {
			console.log(response);
		}) */


	}




}]);