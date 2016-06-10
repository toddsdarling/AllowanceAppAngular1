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
		state('depositInline', {
			url: 'transactions/add?type={whichType}&u={userID}',
			parent:'/',
			views: {
				'depositInlineContainer': {
					controller: 'AddTransactionController',
					templateUrl: '/js/transaction/views/transactionAddView.html',				
					resolve: {
						buckets: function($stateParams,BucketService) {
							//need to have the buckets BEFORE going to this state									
							return BucketService.getBucketsForUser($stateParams.u);
						},
						callback: function(this) {
							return this.handleInlineTransactionSuccess;
						}
					}				
				}
			}
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
				userData: function($stateParams, UserService, BucketService, $q, CurrentUser) {
					
					var userInfo;
					var defer = $q.defer();

					//make first call to get the user. If we're calling for the same user, no AJAX call
					//needed, the promise is immediately resolved
					UserService.getUser($stateParams.u).then(function(data) {
						userInfo = data;	
						//now make second call to resolve the buckets for the user
						//(since they show up on the edit screen)
						BucketService.getBucketsForUser($stateParams.u).then(function(data) {
							//update the current user info AFTER everything has been resolved
							CurrentUser.userInfo = userInfo;
							CurrentUser.buckets = data;	
							defer.resolve();						
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
				userData: function($stateParams, UserService, BucketService, TransactionService, $q, CurrentUser) {
					
					var userInfo;
					var defer = $q.defer();

					//make first call to get the user. If we're calling for the same user, no AJAX call
					//needed, the promise is immediately resolved 
					UserService.getUser($stateParams.u).then(function(data) {
						userInfo = data;	
						//now make second call to resolve the buckets for the user
						//(since they show up on the edit screen)
							BucketService.getBucketsForUser($stateParams.u).then(function(data) {
							//update the current user info AFTER everything has been resolved
							CurrentUser.userInfo = userInfo;
							CurrentUser.buckets = data;								
							//now make a call to get the transactions for a user
							//once all three of these are resolved, we can move forward
							TransactionService.getTransactionsByUser($stateParams.u).then(function(data) {
								//update the current user info AFTER everything has been resolved
								CurrentUser.transactions = data;
								defer.resolve();						
							});

						});

					});

					return defer.promise;
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
			}, 
			views: {
				"inlineTransaction": {template: 'inlineTransaction'}
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

//set the CurrentUser value to be used as a reference to the current user we're acting on
).value('CurrentUser', {
	userInfo: {},
	buckets: {},
	transactions: {}
});

