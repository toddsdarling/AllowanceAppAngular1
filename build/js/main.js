(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
		state('transactionInline', {
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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vYWxsb3dhbmNlIG1vZHVsZSBoZXJlXG4ndXNlIHN0cmljdCc7XG5cblxuYW5ndWxhci5tb2R1bGUoJ0FsbG93YW5jZUFwcCcsIFsndWkucm91dGVyJywgJ0xpc3RVc2VyQ29udHJvbGxlcicsICdBZGRVc2VyQ29udHJvbGxlcicsICdFZGl0VXNlckNvbnRyb2xsZXInLCAnVmlld1RyYW5zYWN0aW9uQ29udHJvbGxlcicsICdBZGRUcmFuc2FjdGlvbkNvbnRyb2xsZXInLCAnQnVja2V0U2VydmljZScsICdFZGl0VHJhbnNhY3Rpb25Db250cm9sbGVyJywgJ0FkZEJ1Y2tldENvbnRyb2xsZXInLCAnRWRpdEJ1Y2tldENvbnRyb2xsZXInXSkuY29uZmlnKFxuXG5cdGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuXHRcdC8vJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXJcblx0XHQuc3RhdGUoJy8nLCB7XG5cdFx0XHR1cmw6Jy8nLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdXNlci92aWV3cy91c2VyTGlzdFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnTGlzdFVzZXJDb250cm9sbGVyJ1x0XHRcdFx0XHRcdFx0XG5cdFx0fSkuXG5cdFx0c3RhdGUoJ3RyYW5zYWN0aW9uSW5saW5lJywge1xuXHRcdFx0dXJsOiAndHJhbnNhY3Rpb25zL2FkZD90eXBlPXt3aGljaFR5cGV9JnU9e3VzZXJJRH0nLFxuXHRcdFx0cGFyZW50OicvJyxcblx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdCdkZXBvc2l0SW5saW5lQ29udGFpbmVyJzoge1xuXHRcdFx0XHRcdGNvbnRyb2xsZXI6ICdBZGRUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RyYW5zYWN0aW9uL3ZpZXdzL3RyYW5zYWN0aW9uQWRkVmlldy5odG1sJyxcdFx0XHRcdFxuXHRcdFx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxCdWNrZXRTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0XHRcdC8vbmVlZCB0byBoYXZlIHRoZSBidWNrZXRzIEJFRk9SRSBnb2luZyB0byB0aGlzIHN0YXRlXHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLlxuXHRcdHN0YXRlKCdhZGRVc2VycycsIHtcblx0XHRcdHVybDonL3VzZXJzL2FkZCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy91c2VyL3ZpZXdzL3VzZXJBZGRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZFVzZXJDb250cm9sbGVyJ1xuXHRcdH0pLlxuXHRcdHN0YXRlKCdlZGl0VXNlcnMnLCB7XG5cdFx0XHR1cmw6ICcvdXNlcnMvZWRpdC97dX0nLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdXNlci92aWV3cy91c2VyRWRpdFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnRWRpdFVzZXJDb250cm9sbGVyJyxcblx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0dXNlckRhdGE6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgVXNlclNlcnZpY2UsIEJ1Y2tldFNlcnZpY2UsICRxLCBDdXJyZW50VXNlcikge1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciB1c2VySW5mbztcblx0XHRcdFx0XHR2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG5cdFx0XHRcdFx0Ly9tYWtlIGZpcnN0IGNhbGwgdG8gZ2V0IHRoZSB1c2VyLiBJZiB3ZSdyZSBjYWxsaW5nIGZvciB0aGUgc2FtZSB1c2VyLCBubyBBSkFYIGNhbGxcblx0XHRcdFx0XHQvL25lZWRlZCwgdGhlIHByb21pc2UgaXMgaW1tZWRpYXRlbHkgcmVzb2x2ZWRcblx0XHRcdFx0XHRVc2VyU2VydmljZS5nZXRVc2VyKCRzdGF0ZVBhcmFtcy51KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdHVzZXJJbmZvID0gZGF0YTtcdFxuXHRcdFx0XHRcdFx0Ly9ub3cgbWFrZSBzZWNvbmQgY2FsbCB0byByZXNvbHZlIHRoZSBidWNrZXRzIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8oc2luY2UgdGhleSBzaG93IHVwIG9uIHRoZSBlZGl0IHNjcmVlbilcblx0XHRcdFx0XHRcdEJ1Y2tldFNlcnZpY2UuZ2V0QnVja2V0c0ZvclVzZXIoJHN0YXRlUGFyYW1zLnUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSB0aGUgY3VycmVudCB1c2VyIGluZm8gQUZURVIgZXZlcnl0aGluZyBoYXMgYmVlbiByZXNvbHZlZFxuXHRcdFx0XHRcdFx0XHRDdXJyZW50VXNlci51c2VySW5mbyA9IHVzZXJJbmZvO1xuXHRcdFx0XHRcdFx0XHRDdXJyZW50VXNlci5idWNrZXRzID0gZGF0YTtcdFxuXHRcdFx0XHRcdFx0XHRkZWZlci5yZXNvbHZlKCk7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlci5wcm9taXNlO1xuXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdH1cblx0XHR9KS5cblx0XHRzdGF0ZSgndmlld1RyYW5zYWN0aW9uc0J5VXNlcicsIHtcblx0XHRcdHVybDonL3RyYW5zYWN0aW9ucy92aWV3L3t1fScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkxpc3RWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1ZpZXdUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHR1c2VyRGF0YTogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBVc2VyU2VydmljZSwgQnVja2V0U2VydmljZSwgVHJhbnNhY3Rpb25TZXJ2aWNlLCAkcSwgQ3VycmVudFVzZXIpIHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgdXNlckluZm87XG5cdFx0XHRcdFx0dmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuXHRcdFx0XHRcdC8vbWFrZSBmaXJzdCBjYWxsIHRvIGdldCB0aGUgdXNlci4gSWYgd2UncmUgY2FsbGluZyBmb3IgdGhlIHNhbWUgdXNlciwgbm8gQUpBWCBjYWxsXG5cdFx0XHRcdFx0Ly9uZWVkZWQsIHRoZSBwcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlc29sdmVkIFxuXHRcdFx0XHRcdFVzZXJTZXJ2aWNlLmdldFVzZXIoJHN0YXRlUGFyYW1zLnUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0dXNlckluZm8gPSBkYXRhO1x0XG5cdFx0XHRcdFx0XHQvL25vdyBtYWtlIHNlY29uZCBjYWxsIHRvIHJlc29sdmUgdGhlIGJ1Y2tldHMgZm9yIHRoZSB1c2VyXG5cdFx0XHRcdFx0XHQvLyhzaW5jZSB0aGV5IHNob3cgdXAgb24gdGhlIGVkaXQgc2NyZWVuKVxuXHRcdFx0XHRcdFx0XHRCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgdGhlIGN1cnJlbnQgdXNlciBpbmZvIEFGVEVSIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gcmVzb2x2ZWRcblx0XHRcdFx0XHRcdFx0Q3VycmVudFVzZXIudXNlckluZm8gPSB1c2VySW5mbztcblx0XHRcdFx0XHRcdFx0Q3VycmVudFVzZXIuYnVja2V0cyA9IGRhdGE7XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvL25vdyBtYWtlIGEgY2FsbCB0byBnZXQgdGhlIHRyYW5zYWN0aW9ucyBmb3IgYSB1c2VyXG5cdFx0XHRcdFx0XHRcdC8vb25jZSBhbGwgdGhyZWUgb2YgdGhlc2UgYXJlIHJlc29sdmVkLCB3ZSBjYW4gbW92ZSBmb3J3YXJkXG5cdFx0XHRcdFx0XHRcdFRyYW5zYWN0aW9uU2VydmljZS5nZXRUcmFuc2FjdGlvbnNCeVVzZXIoJHN0YXRlUGFyYW1zLnUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIHRoZSBjdXJyZW50IHVzZXIgaW5mbyBBRlRFUiBldmVyeXRoaW5nIGhhcyBiZWVuIHJlc29sdmVkXG5cdFx0XHRcdFx0XHRcdFx0Q3VycmVudFVzZXIudHJhbnNhY3Rpb25zID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0XHRkZWZlci5yZXNvbHZlKCk7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVyLnByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5cblx0XHRzdGF0ZSgnYWRkVHJhbnNhY3Rpb24nLCB7XG5cdFx0XHR1cmw6Jy90cmFuc2FjdGlvbnMvYWRkP3R5cGU9e3doaWNoVHlwZX0mdT17dXNlcklEfScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkFkZFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkVHJhbnNhY3Rpb25Db250cm9sbGVyJyxcblx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0YnVja2V0czogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLEJ1Y2tldFNlcnZpY2UpIHtcblx0XHRcdFx0XHQvL25lZWQgdG8gaGF2ZSB0aGUgYnVja2V0cyBCRUZPUkUgZ29pbmcgdG8gdGhpcyBzdGF0ZVx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcImlubGluZVRyYW5zYWN0aW9uXCI6IHt0ZW1wbGF0ZTogJ2lubGluZVRyYW5zYWN0aW9uJ31cblx0XHRcdH1cblx0XHR9KS5cblx0XHRzdGF0ZSgnZWRpdFRyYW5zYWN0aW9uJywge1xuXHRcdFx0dXJsOicvdHJhbnNhY3Rpb25zL2VkaXQ/dD17dHJhbnNhY3Rpb25JRH0mdT17dXNlcklEfScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkVkaXRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0VkaXRUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHR0cmFuc2FjdGlvbjogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBUcmFuc2FjdGlvblNlcnZpY2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9uKCRzdGF0ZVBhcmFtcy50KTtcblx0XHRcdFx0fSwgXG5cdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgQnVja2V0U2VydmljZSkge1xuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLiBcblx0XHRzdGF0ZSgnYWRkQnVja2V0Jywge1xuXHRcdFx0dXJsOiAnL2J1Y2tldHMvYWRkL3t1fScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy9idWNrZXQvdmlld3MvYWRkQnVja2V0Vmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRCdWNrZXRDb250cm9sbGVyJ1xuXHRcdH0pLlxuXHRcdHN0YXRlKCdlZGl0QnVja2V0Jywge1xuXHRcdFx0dXJsOiAnL2J1Y2tldC9lZGl0L3tifScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy9idWNrZXQvdmlld3MvZWRpdEJ1Y2tldFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnRWRpdEJ1Y2tldENvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHRidWNrZXQ6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgQnVja2V0U2VydmljZSkge1xuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldE9uZUJ1Y2tldCgkc3RhdGVQYXJhbXMuYik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG4vL3NldCB0aGUgQ3VycmVudFVzZXIgdmFsdWUgdG8gYmUgdXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB1c2VyIHdlJ3JlIGFjdGluZyBvblxuKS52YWx1ZSgnQ3VycmVudFVzZXInLCB7XG5cdHVzZXJJbmZvOiB7fSxcblx0YnVja2V0czoge30sXG5cdHRyYW5zYWN0aW9uczoge31cbn0pO1xuXG4iXX0=
