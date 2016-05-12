'use strict';

var BucketService = angular.module('BucketService', []);

BucketService.factory('BucketService', ['$http', function($http) {

	var apiKey = 'UQLD_WO4wNXMFL-fAo5YZSjTFUnBoS9v';

	var bucketsForUser = [];
	//NEED TO REMEMBER...this will have to get set back to false if an admin
	//user updates buckets for this user (so that it will pull the new buckets). OR, just set the new bucket list
	var bucketsChecked = false;

	return {

		getBucketsForUser: function(userID) {

			//check to see if we've looked for buckets before and have them.
			//if so, just return them directly
			if (bucketsChecked == true) {
				return bucketsForUser;
			} else {
				//if you've NEVER looked for buckets before, do it now and set the flag
				return(
					$http({
						method:'GET',
						url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets?apiKey=' + apiKey + '&q={"user":"' + userID + '"}'
					}).then(function success(data) {
						bucketsForUser = data.data;
						bucketsChecked = true;
						return bucketsForUser;
					}, function error(data) {
						return data.statusText;
					})
				);				
			}
		}, 

		getUserBucketNameByID: function(bucketID) {
			
			var bucketName = '';

			bucketsForUser.forEach(function(whichBucket, index, array) {
				if (whichBucket._id.$oid === bucketID) {
					bucketName =  whichBucket.name;
				}
			});

			return bucketName;
		},

		//this will be primarily used when editing a single bucket. Need to get it to display it in the view
		getOneBucket: function(bucketID) {
				//make the call to get the bucket
				return(
					$http({
						method:'GET',
						url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets/' + bucketID + '/?apiKey=' + apiKey,
					}).then(function success(data) {

						var bucketToReturn = data.data;

						//if there are no sub-buckets, init empty array for them
						if (!bucketToReturn.hasOwnProperty('subBuckets')) {
							bucketToReturn.subBuckets = [];
						}

						return bucketToReturn;
					}, function error(data) {
						return data.statusText;
					})
				);				
		},

		//this is common functionality between add/edit, so we put it here in the service. The validation
		//will run when the user adds or edits a bucket
		validateBucketFields: function(bucketObj) {

		if (bucketObj.name === '') {
				return false; 
			} else {
				return true;
			}
		}, 

		addBucket: function(bucketObj) {
			return(
			$http({
				method:'POST',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets?apiKey='+ apiKey,
				data: bucketObj
			}).then(function success(data) {
				//success function here
				return data.data;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));			
		}, 

		editBucket: function(bucketObj) {
			return(
			$http({
				method:'PUT',
				url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets/' + bucketObj._id.$oid + '?apiKey='+ apiKey,
				data: bucketObj
			}).then(function success(data) {
				//success function here
				return data.data;
				bucketsChecked = false;

			}, function error(data) {
				//error function here
				return data.statusText;
			}));			
		}, 

		//adding and removing sub-buckets is also commmon, so is moved out here to the service
		//when the user clicks to add or remove a new sub-bucket, handle adding/removing/renaming the fields 
		handleSubBucketFields: function(whichAction, subBuckets) {

			switch (whichAction) {
				case 'add': 
				    var newItemNo = subBuckets.length+1;
				    subBuckets.push({'id':'subBucket'+newItemNo});
				    return subBuckets;
				break;

				case 'remove': 
				    var lastItem = subBuckets.length-1;
				    subBuckets.splice(lastItem);
				    return subBuckets;
				break;
			}

		}, 

		//deletes a single transaction by ID
		deleteBucket: function(bucketObj) {
			return(
				$http({
					method: 'DELETE',
					url: 'https://api.mongolab.com/api/1/databases/allowanceapp/collections/buckets/' + bucketObj._id.$oid + '?apiKey='+ apiKey
				}).then(function success(data) {
					return data.data;
				}, function error(data) {
					return data.statusText;
				}));
		}




	}

}]);

