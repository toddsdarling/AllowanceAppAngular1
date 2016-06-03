'use strict';

var UserService = angular.module('UserService', []);

UserService.factory('UserService', ['$http', '$q', function($http, $q) {

	var apiKey = 'UQLD_WO4wNXMFL-fAo5YZSjTFUnBoS9v';
	var currentUser = {};

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

		},

		addUser: function(usrObj) {

			return(
			$http({
				method:'POST',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/users?apiKey='+ apiKey,
				data: usrObj
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));

		}, 

		//get a single user by ID 
		getUser: function(id) {

			if (currentUser.hasOwnProperty("_id") && currentUser._id.$oid === id) {
				//set up a promise that we'll immediately resolve since the user info is already
				var userPromise = $q.defer();
				userPromise.resolve(currentUser);
				return userPromise.promise;
			} else {
				return(
				$http({
					method:'GET',
					url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/users/'+ id +'?apiKey='+ apiKey,
				}).then(function success(data) {
					//success function here, set the current user
					currentUser = data.data;
					return data.data;

				}, function error(data) {
					//error function here
					return data.statusText;
				}));	
			}	


		},

		updateUser: function(usrObj) {

			return(
			$http({
				method:'PUT',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/users/'+ usrObj._id.$oid +'?apiKey='+ apiKey,
				data: usrObj
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));					


		},

		validateUserFields: function(usrObj) {	

			if (usrObj.fname === '' || usrObj.fname === '' || usrObj.email === '' ) {
				return false; 
			} else {
				return true;
			}	
		}, 

		getCurrentUserID: function() {
			return currentUser._id.$oid;
		}

	}

}]);