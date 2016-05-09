'use strict';

angular.module('ListUserController', ['UserService']);
angular.module('ListUserController').controller('ListUserController', ['$scope', 'UserService', function($scope, UserService) {

	//need to wrap this in a promise so the user list will be set correctly

	UserService.getAllUsers().then(function(data) {
		$scope.userList = data;
	});




}]);