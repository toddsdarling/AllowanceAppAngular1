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
		}


	}

}]);

