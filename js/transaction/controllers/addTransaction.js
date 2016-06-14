'use strict';

angular.module('AddTransactionController', ['TransactionService']);
angular.module('AddTransactionController').controller('AddTransactionController', ['$scope', 'TransactionService', '$stateParams', '$state', 'buckets', function($scope, TransactionService, $stateParams, $state, buckets) {

	//put the buckets we got from the service into $scope so it can be referenced in the view
	$scope.buckets = buckets;

	$scope.transactionToBeAdded = {
		amount: '',
		bucket: '',
		user: $stateParams.u,
		type: $stateParams.type, 
		date: new Date()
	}

	console.log($stateParams);


	$scope.transactionSuccessCallBack;

	$scope.handleTransactionAdd = function() {

		var allGood = TransactionService.validateTransactionFields($scope.transactionToBeAdded);

		if (allGood) {

			//call user service to add the user
			TransactionService.addTransaction($scope.transactionToBeAdded).then(function(response) {
				alert('Transaction added successfully!');

				setTimeout(function() {
					//navigate back to user list
					$state.go('viewTransactionsByUser', {u: $stateParams.u});
				}, 500)

			});
		} else {
			//validation errors here
			alert('Please fill out all the fields!');
		}

	}

	$scope.handleInlineTransactionSuccess = function() {
		console.log('added inline transaction');
	}

}]);