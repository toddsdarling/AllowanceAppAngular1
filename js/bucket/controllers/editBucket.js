'use strict';

angular.module('EditBucketController', ['UserService']);
angular.module('EditBucketController').controller('EditBucketController', ['$scope', 'BucketService', '$state', '$stateParams', 'bucket', function($scope, BucketService, $state, $stateParams, bucket) {

	//set the bucket to be edited on the scope
	$scope.bucketToBeEdited = bucket;

	//when the user clicks to add or remove a new sub-bucket, handle adding/removing/renaming the fields 
	$scope.handleSubBucketFields = function(whichAction) {

		BucketService.handleSubBucketFields(whichAction, $scope.bucketToBeEdited.subBuckets);
	},

	$scope.handleEditBucket = function() {

		//check the model values for validation
		var allGood = BucketService.validateBucketFields($scope.bucketToBeEdited);

		//make a copy of sub-buckets array
		var userSubBuckets = $scope.bucketToBeEdited.subBuckets;

		//strip out any blank sub-buckets so they won't get added
		for (var j = 0; j < userSubBuckets.length; j++){
			//ONLY fields where the name field is filled out will have the "name" property
			//in their object
			if (!userSubBuckets[j].hasOwnProperty('name')) {
				userSubBuckets.splice(j, 1);
			}
		}

		//replace the $scope variable with the new one
		$scope.bucketToBeEdited.subBuckets = userSubBuckets;


		if (allGood) {

			//call user service to add the user
			BucketService.editBucket(this.bucketToBeEdited).then(function(response) {
				alert('Bucket edited successfully!');

				setTimeout(function() {
					//navigate back to user list
					$state.go('/');
				}, 500)

			});
		} else {
			//validation errors here
			alert('Please fill out all the fields!');
		}



	}




}]);