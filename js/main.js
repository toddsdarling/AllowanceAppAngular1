//allowance module here
'use strict';


angular.module('AllowanceApp', ['ui.router', 'ListUserController', 'AddUserController', 'EditUserController', 'ViewTransactionController', 'AddTransactionController', 'BucketService', 'EditTransactionController']).config(

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
			url: '/users/edit/{userID}',
			templateUrl: '/js/user/views/userEditView.html',
			controller: 'EditUserController'
		}).
		state('viewTransactionsByUser', {
			url:'/transactions/view/{u}',
			templateUrl: '/js/transaction/views/transactionListView.html',
			controller: 'ViewTransactionController',
			resolve: {
				user: function($stateParams, UserService) {
					return UserService.getUser($stateParams.u);
				}, 
				buckets: function($stateParams, BucketService) {
					return BucketService.getBucketsForUser($stateParams.u);
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
		});
	}

);

