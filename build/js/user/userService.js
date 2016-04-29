angular.module('AllowanceApp').factory('UserService',[function() {

	var UserService = {};

	UserService.getAllUsers = function() {
		console.log('get all users');
	}

	UserService.getUserById = function(id) {
		console.log('get user by id');
	}

	UserService.createUser = function(obj) {
		console.log('create user');
	}

	UserService.deleteUser = function(id) {
		console.log('delete user by id');
	}

	UserService.updateUser = function(obj) {
		console.log('update user');
	}

	return UserService;

}]);