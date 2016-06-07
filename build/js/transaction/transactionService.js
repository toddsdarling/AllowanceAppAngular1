'use strict';

var TransactionService = angular.module('TransactionService', []);

TransactionService.factory('TransactionService', ['$http', 'CurrentUser', function($http, CurrentUser) {

	var apiKey = 'UQLD_WO4wNXMFL-fAo5YZSjTFUnBoS9v';

	return {

		//returns all the transactions by user. We handle the initial sort in the view
		getTransactionsByUser: function(userID) {

			return(
			$http({
				method:'GET',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions?apiKey='+ apiKey + '&q={"user":"' + userID + '"}'
			}).then(function success(data) {

				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));

		},

		//returns a single transaction..just pass in the ID
		getTransaction: function(transID) {

			return(
			$http({
				method:'GET',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions/' + transID + '?apiKey='+ apiKey
			}).then(function success(data) {

				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));

		},

		//this is used by add/editt transaction views to validate entry fields
		//to make sure the user is putting in correct data
		validateTransactionFields: function(transObj) {	

			if (transObj.amount === '' || transObj.bucket === '') {
				return false; 
			} else {
				return true;
			}	
		}, 

		//adds a single transaction. The transObj that is passed has the following props:
		//amount, bucket, user, type and date
		addTransaction: function(transObj) {
			return(
			$http({
				method:'POST',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions?apiKey='+ apiKey,
				data: transObj
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));			
		},

		editTransaction: function(transObj) {

			return(
			$http({
				method:'PUT',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions/'+ transObj._id.$oid +'?apiKey='+ apiKey,
				data: transObj
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));	

		}, 

		//deletes a single transaction by ID
		deleteTransaction: function(transID) {
			return(
				$http({
					method: 'DELETE',
					url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/transactions/' + transID + '?apiKey='+ apiKey
				}).then(function success(data) {

					//filter the transaction OUT of the current user's list
					CurrentUser.transactions = CurrentUser.transactions.filter(function(transObj, index, arr) {
						return transObj._id.$oid !== data.data._id.$oid;		
					});


					return data.data;
				}, function error(data) {
					return data.statusText;
				}));
		}


	}

}]);

