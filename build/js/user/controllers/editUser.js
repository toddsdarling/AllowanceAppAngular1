'use strict';

angular.module('EditUserController', ['UserService']);
angular.module('EditUserController').controller('EditUserController', ['$scope', 'UserService', '$state', '$stateParams', 'BucketService', 'CurrentUser', function($scope, UserService, $state, $stateParams, BucketService, CurrentUser) {

	//set the user info on the scope. These were resolved from the promise on the router before we got to this view
	$scope.userToBeEdited = CurrentUser.userInfo;
	$scope.userBuckets = CurrentUser.buckets;

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

		if (confirm('Are you sure you want to delete this bucket?')) {
			BucketService.deleteBucket(this.bucketObj._id.$oid).then(function(response) {
				alert('Bucket deleted successfully!');

				setTimeout(function() {
					$state.go('/');
				}, 500);
			});
		}


	}




}]);