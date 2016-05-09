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

				alert('User updated successfully!');

				setTimeout(function() {
					//navigate back to user list
					$state.go('/');
				}, 500)

			});

		} else {
			//validation errors here
			alert('Please fill out all the fields!');
		}




	}




}]);