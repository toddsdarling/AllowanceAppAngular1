'use strict';

angular.module('AddTransactionController', ['TransactionService']);
angular.module('AddTransactionController').controller('AddTransactionController', ['$scope', 'buckets', 'TransactionService', '$stateParams', function($scope, buckets, TransactionService, $stateParams) {


	$scope.transactionToBeAdded = {
		amount: '',
		bucket: '',
		type: $stateParams.type
	}


	console.log(buckets);







}]);