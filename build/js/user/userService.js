'use strict';

var UserService = angular.module('UserService', []);

UserService.factory('UserService', ['$http', '$q', 'CurrentUser', function($http, $q, CurrentUser) {

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

			var currentUserID = this.getCurrentUserID();

			if (currentUserID === id) {
				//if the user you want is already the current user, set up a promise that you'll immediately
				//resolve with current user data
				var userPromise = $q.defer();
				userPromise.resolve(CurrentUser.userInfo);
				return userPromise.promise;
			} else {
				return(
				$http({
					method:'GET',
					url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/users/'+ id +'?apiKey='+ apiKey,
				}).then(function success(data) {
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

		//made this a small utility function so that I didn't have to keep retyping 
		//the _id.$oid
		getCurrentUserID: function() {

			if (CurrentUser.userInfo.hasOwnProperty('_id')) {
				return CurrentUser.userInfo._id.$oid;
			} else {
				return null;
			}

			
		}
	}

}]);