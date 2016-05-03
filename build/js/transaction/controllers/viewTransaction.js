'use strict';

angular.module('ViewTransactionController', ['TransactionService']);
angular.module('ViewTransactionController').controller('ViewTransactionController', ['$scope', 'TransactionService', 'user', function($scope, TransactionService, user) {

	//push the resolved user into the scope so we can access it in our view
	$scope.currentUser = user

	//need to get transaction list for this user
	TransactionService.getTransactionsByUser($scope.currentUser._id.$oid).then(function(data) {
		$scope.transactionList = data;
	});



}]);