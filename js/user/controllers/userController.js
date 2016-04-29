'use strict';

angular.module('AllowanceApp.UserController', ['UserService']);
angular.module('AllowanceApp.UserController').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

	//need to wrap this in a promise so the user list will be set correctly

	UserService.getAllUsers().then(function(data) {
		$scope.userList = data;
	});


	$scope.handleAddUserSubmission = function(formObj) {
		console.log(formObj);
	}




}]);