'use strict';

var TransactionService = angular.module('TransactionService', []);

TransactionService.factory('TransactionService', ['$http', function($http) {

	var apiKey = 'UQLD_WO4wNXMFL-fAo5YZSjTFUnBoS9v';

	return {

		getTransactionsByUser: function() {

			return(
			$http({
				method:'GET',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions?apiKey='+ apiKey
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));

		},

		getBucketsForUser: function(userID) {
			return(
				$http({
					method: 'GET',
					url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets?apiKey=' + apiKey + '&q={"user":"' + userID + '"}'
				}).then(function success(data) {
					return data.data;	
				}, function error(data) {
					return data.statusText;
				})
			)
		}
	}

}]);