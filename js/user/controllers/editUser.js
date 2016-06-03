'use strict';

angular.module('EditUserController', ['UserService']);
angular.module('EditUserController').controller('EditUserController', ['$scope', 'UserService', '$stateParams', 'userData', 'BucketService', function($scope, UserService, $stateParams, userData, BucketService) {

	//set the user info on the scope. These were resolved from the promise on the router before we got to this view
	$scope.userToBeEdited = userData.user;
	$scope.userBuckets = userData.buckets;

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

	$scope.handleDeleteBucket = function() {
		
	}




}]);