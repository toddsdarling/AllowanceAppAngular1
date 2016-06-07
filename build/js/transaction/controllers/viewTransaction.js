'use strict';

angular.module('ViewTransactionController', ['TransactionService']);
angular.module('ViewTransactionController').controller('ViewTransactionController', ['$scope', 'TransactionService', 'BucketService', 'CurrentUser', function($scope, TransactionService, BucketService, CurrentUser) {

	console.log(CurrentUser);

	$scope.buildTransactionList = function() {

			//set the transaction list = the data from the model.  Anytime the model gets update
			//we just call this function which will update both the list and the bucket totals
			$scope.transactions = CurrentUser.transactions;

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

	$scope.getBucketNameByID = function(whichID) {		
		return BucketService.getUserBucketNameByID(whichID);
	}


	/* push the resolved user into the scope so we can access it in our view */ 	
	$scope.userInfo = CurrentUser.userInfo;
	$scope.buckets = CurrentUser.buckets;

	$scope.buildTransactionList();


}]);