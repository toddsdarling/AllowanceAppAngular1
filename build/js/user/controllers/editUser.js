'use strict';

angular.module('EditUserController', ['UserService']);
angular.module('EditUserController').controller('EditUserController', ['$scope', 'UserService', '$stateParams', function($scope, UserService, $stateParams) {


	$scope.userToBeEdited = {};


	UserService.getUser($stateParams.userID).then(function(response) {
		$scope.userToBeEdited = response;
	});

	$scope.handleEditUser = function() {

		var allGood = UserService.validateUserFields($scope.userToBeEdited);

		if (allGood) {

			//call user service to add the user
			UserService.updateUser(this.userToBeEdited).then(function(response) {
				console.log(response);
			});

		} else {
			//validation errors here
		}




	}




}]);