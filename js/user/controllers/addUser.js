'use strict';

angular.module('AddUserController', ['UserService']);
angular.module('AddUserController').controller('AddUserController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {


	$scope.userToBeAdded = {
		fname: '',
		lname: '',
		email: ''
	}


	//need to wrap this in a promise so the user list will be set correctly
	$scope.handleAddUserSubmission = function() {
		//check the model values for validation
		var allGood = UserService.validateUserFields($scope.userToBeAdded);

		if (allGood) {

			//call user service to add the user
			UserService.addUser(this.userToBeAdded).then(function(response) {
				alert('User added successfully!');

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