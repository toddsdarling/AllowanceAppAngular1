'use strict';

var UserService = angular.module('UserService', ['ngResource']);

UserService.factory('UserService', ['$http', function($http) {

	var apiKey = 'UQLD_WO4wNXMFL-fAo5YZSjTFUnBoS9v';

	return {

		getAllUsers: function() {

			return(
			$http({
				method:'GET',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/users?apiKey='+ apiKey
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));

		}



				
	}

}]);