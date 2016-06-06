'use strict';

angular.module('ViewTransactionController', ['TransactionService']);
angular.module('ViewTransactionController').controller('ViewTransactionController', ['$scope', 'TransactionService', 'BucketService', 'CurrentUser', function($scope, TransactionService, BucketService, CurrentUser) {

	$scope.buildTransactionList = function() {

			$scope.transactions.forEach(function(transObj, index, transList) {

				var bucketID = transObj.bucket;

				var filteredBucketArr = $scope.buckets.filter(function(value, index, arr) {
					return value._id.$oid === bucketID;
				})

				if (filteredBucketArr.length > 0) {
					//replace the ID 
					$scope.transactions[index].bucketName = filteredBucketArr[0].name;					
				} else {
					$scope.transactions[index].bucketName = '';					
				}

			});


			$scope.buildBucketTotals();

	}

	$scope.buildBucketTotals = function() {

		$scope.buckets.forEach(function(bucketObj, index, userBucketList) {
			//loop through the bucket list
			var bucketName = bucketObj.name;
			//init the bucket total
			var bucketTotal = 0;
		
			//use filter function to build an array of transactions for JUST that bucket
			var transactionsForThisBucket = $scope.transactions.filter(function(transObj, index, arr) {
				return (transObj.bucket === bucketObj._id.$oid);
			});

			//now, loop through filtered transactions and add up the total
			transactionsForThisBucket.forEach(function(transObj, index, transactionsForThisBucket) {
				if (transObj.type == 'dep') {
					bucketTotal += Number(transObj.amount);
				} else if (transObj.type === 'with') {
					bucketTotal -= Number(transObj.amount);
				}
			});

			$scope.buckets[index].total = bucketTotal;

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
	$scope.currentUser = CurrentUser.userInfo;
	$scope.buckets = CurrentUser.buckets;
	$scope.transactions = CurrentUser.transactions;
	//get the transaction list (uses the transaction service)
	$scope.buildTransactionList();

}]);