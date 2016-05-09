'use strict';

angular.module('ViewTransactionController', ['TransactionService']);
angular.module('ViewTransactionController').controller('ViewTransactionController', ['$scope', 'TransactionService', 'BucketService', 'user', function($scope, TransactionService, BucketService, user) {

	$scope.buildTransactionList = function() {

		//need to get transaction list for this user
		TransactionService.getTransactionsByUser($scope.currentUser._id.$oid).then(function(data) {
			//this doesn't fire off any AJAX calls, just filters the bucket list from the bucket service
			$scope.userBucketList = BucketService.getBucketsForUser();
			//match the bucket names to the IDs for the user transaction list
			var transactionList = data;

			transactionList.forEach(function(transObj, index, transList) {

				var bucketID = transObj.bucket;

				var bucketName = BucketService.getUserBucketNameByID(bucketID);

				//replace the ID 
				transList[index].bucket = bucketName;

			});

			$scope.transactionList = transactionList;
			$scope.buildBucketTotals();
		});

	}

	$scope.buildBucketTotals = function() {

		$scope.userBucketList.forEach(function(bucketObj, index, userBucketList) {
			//loop through the bucket list
			var bucketName = bucketObj.name;
			//init the bucket total
			var bucketTotal = 0;
		
			//use filter function to build an array of transactions for JUST that bucket
			var transactionsForThisBucket = $scope.transactionList.filter(function(transObj, index, arr) {
				return (transObj.bucket === bucketName);
			});

			//now, loop through filtered transactions and add up the total
			transactionsForThisBucket.forEach(function(transObj, index, transactionsForThisBucket) {
				if (transObj.type == 'dep') {
					bucketTotal += Number(transObj.amount);
				} else if (transObj.type === 'with') {
					bucketTotal -= Number(transObj.amount);
				}
			});

			$scope.userBucketList[index].total = bucketTotal;

		});

	}

	$scope.handleDeleteTransaction = function(transID) {
		//call delete transaction method on service and then set the new transaction list so that
		//the view will update
		TransactionService.deleteTransaction(transID).then(function(data) {

			$scope.buildTransactionList();

		});
	}


	//push the resolved user into the scope so we can access it in our view
	$scope.currentUser = user;
	//get the transaction list (uses the transaction service)
	$scope.buildTransactionList();

}]);