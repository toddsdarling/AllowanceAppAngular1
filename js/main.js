//allowance module here
'use strict';


angular.module('AllowanceApp', ['ui.router', 'ListUserController', 'AddUserController', 'EditUserController', 'ViewTransactionController', 'AddTransactionController', 'BucketService', 'EditTransactionController', 'AddBucketController', 'EditBucketController']).config(

	function($stateProvider, $urlRouterProvider) {

		//$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('/', {
			url:'/',
			templateUrl: '/js/user/views/userListView.html',
			controller: 'ListUserController'
		}).
		state('addUsers', {
			url:'/users/add',
			templateUrl: '/js/user/views/userAddView.html',
			controller: 'AddUserController'
		}).
		state('editUsers', {
			url: '/users/edit/{u}',
			templateUrl: '/js/user/views/userEditView.html',
			controller: 'EditUserController',
			resolve: {
				userData: function($stateParams, UserService, BucketService, $q) {

					var currentUser = UserService.getCurrentUserID();


					//set up promise object
					var defer = $q.defer();
					var info = {};
					//make first call to get the user. If we're calling for the same user, no AJAX call
					//needed, the promise is immediately
					UserService.getUser($stateParams.u).then(function(data) {
						info.user = data;	
						//now make second call to resolve the buckets for the user
						//(since they show up on the edit screen)
						BucketService.getBucketsForUser($stateParams.u).then(function(data) {
							info.buckets = data;
							//resolve the promise
							defer.resolve(info);
						});
					});

					return defer.promise;
				}				
			}
		}).
		state('viewTransactionsByUser', {
			url:'/transactions/view/{u}',
			templateUrl: '/js/transaction/views/transactionListView.html',
			controller: 'ViewTransactionController',
			resolve: {
				user: function($stateParams, UserService) {
					return UserService.getUser($stateParams.u);
				}, 
				buckets: function($stateParams, BucketService, UserService) {
					return BucketService.getBucketsForUser(UserService.getCurrentUserID());
				}
			}
		}).
		state('addTransaction', {
			url:'/transactions/add?type={whichType}&u={userID}',
			templateUrl: '/js/transaction/views/transactionAddView.html',
			controller: 'AddTransactionController',
			resolve: {
				buckets: function($stateParams,BucketService) {
					//need to have the buckets BEFORE going to this state									
					return BucketService.getBucketsForUser($stateParams.u);
				}
			}
		}).
		state('editTransaction', {
			url:'/transactions/edit?t={transactionID}&u={userID}',
			templateUrl: '/js/transaction/views/transactionEditView.html',
			controller: 'EditTransactionController',
			resolve: {
				transaction: function($stateParams, TransactionService) {
					return TransactionService.getTransaction($stateParams.t);
				}, 
				buckets: function($stateParams, BucketService) {
					return BucketService.getBucketsForUser($stateParams.u);
				}
			}
		}). 
		state('addBucket', {
			url: '/buckets/add/{u}',
			templateUrl: '/js/bucket/views/addBucketView.html',
			controller: 'AddBucketController'
		}).
		state('editBucket', {
			url: '/bucket/edit/{b}',
			templateUrl: '/js/bucket/views/editBucketView.html',
			controller: 'EditBucketController',
			resolve: {
				bucket: function($stateParams, BucketService) {
					return BucketService.getOneBucket($stateParams.b);
				}
			}
		});
	}

);

