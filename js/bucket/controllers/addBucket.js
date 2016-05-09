'use strict';

angular.module('AddBucketController', ['UserService']);
angular.module('AddBucketController').controller('AddBucketController', ['$scope', 'BucketService', '$state', '$stateParams', function($scope, BucketService, $state, $stateParams) {

	//init bucket to be added...include array for any sub-buckets that are added here
	$scope.bucketToBeAdded = {
		name: '',
		subBuckets: [],
		user: $stateParams.u
	}


	//when the user clicks to add or remove a new sub-bucket, handle adding/removing/renaming the fields 
	$scope.handleSubBucketFields = function() {

	    var newItemNo = $scope.bucketToBeAdded.subBuckets.length+1;
	    $scope.bucketToBeAdded.subBuckets.push({'id':'subBucket'+newItemNo})

	},

	$scope.removeSubBucketField = function() {
	    var lastItem = $scope.bucketToBeAdded.subBuckets.length-1;
	    $scope.bucketToBeAdded.subBuckets.splice(lastItem);		
	}, 

	$scope.handleAddBucket = function() {

		//check the model values for validation
		var allGood = BucketService.validateBucketFields($scope.bucketToBeAdded);

		//make a copy of sub-buckets array
		var userSubBuckets = $scope.bucketToBeAdded.subBuckets;

		//strip out any blank sub-buckets so they won't get added
		for (var j = 0; j < userSubBuckets.length; j++){
			//ONLY fields where the name field is filled out will have the "name" property
			//in their object
			if (!userSubBuckets[j].hasOwnProperty('name')) {
				userSubBuckets.splice(j, 1);
			}
		}

		//replace the $scope variable with the new one
		$scope.bucketToBeAdded.subBuckets = userSubBuckets;


		if (allGood) {

			//call user service to add the user
			BucketService.addBucket(this.bucketToBeAdded).then(function(response) {
				alert('Bucket added successfully!');

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