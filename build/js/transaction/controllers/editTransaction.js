'use strict';

angular.module('EditTransactionController', ['TransactionService']);
angular.module('EditTransactionController').controller('EditTransactionController', ['$scope', 'TransactionService', '$stateParams', '$state', 'buckets', 'transaction', function($scope, TransactionService, $stateParams, $state, buckets, transaction) {

	//put the buckets we got from the service into $scope so it can be referenced in the view
	$scope.buckets = buckets;

	$scope.transactionToBeEdited = transaction;

	$scope.handleTransactionEdit = function() {

		var allGood = TransactionService.validateTransactionFields($scope.transactionToBeEdited);

		if (allGood) {

			//call user service to add the user
			TransactionService.editTransaction($scope.transactionToBeEdited).then(function(response) {
				alert('Transaction edited successfully!');

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

}]);