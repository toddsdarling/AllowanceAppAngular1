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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL2FsbG93YW5jZSBtb2R1bGUgaGVyZVxuJ3VzZSBzdHJpY3QnO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdBbGxvd2FuY2VBcHAnLCBbJ3VpLnJvdXRlcicsICdMaXN0VXNlckNvbnRyb2xsZXInLCAnQWRkVXNlckNvbnRyb2xsZXInLCAnRWRpdFVzZXJDb250cm9sbGVyJywgJ1ZpZXdUcmFuc2FjdGlvbkNvbnRyb2xsZXInLCAnQWRkVHJhbnNhY3Rpb25Db250cm9sbGVyJywgJ0J1Y2tldFNlcnZpY2UnLCAnRWRpdFRyYW5zYWN0aW9uQ29udHJvbGxlcicsICdBZGRCdWNrZXRDb250cm9sbGVyJywgJ0VkaXRCdWNrZXRDb250cm9sbGVyJ10pLmNvbmZpZyhcblxuXHRmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cblx0XHQvLyR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0LnN0YXRlKCcvJywge1xuXHRcdFx0dXJsOicvJyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnL2pzL3VzZXIvdmlld3MvdXNlckxpc3RWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0xpc3RVc2VyQ29udHJvbGxlcidcblx0XHR9KS5cblx0XHRzdGF0ZSgnYWRkVXNlcnMnLCB7XG5cdFx0XHR1cmw6Jy91c2Vycy9hZGQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdXNlci92aWV3cy91c2VyQWRkVmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRVc2VyQ29udHJvbGxlcidcblx0XHR9KS5cblx0XHRzdGF0ZSgnZWRpdFVzZXJzJywge1xuXHRcdFx0dXJsOiAnL3VzZXJzL2VkaXQve3V9Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnL2pzL3VzZXIvdmlld3MvdXNlckVkaXRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0VkaXRVc2VyQ29udHJvbGxlcicsXG5cdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdHVzZXJEYXRhOiBmdW5jdGlvbigkc3RhdGVQYXJhbXMsIFVzZXJTZXJ2aWNlLCBCdWNrZXRTZXJ2aWNlLCAkcSwgQ3VycmVudFVzZXIpIHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgdXNlckluZm87XG5cdFx0XHRcdFx0dmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuXHRcdFx0XHRcdC8vbWFrZSBmaXJzdCBjYWxsIHRvIGdldCB0aGUgdXNlci4gSWYgd2UncmUgY2FsbGluZyBmb3IgdGhlIHNhbWUgdXNlciwgbm8gQUpBWCBjYWxsXG5cdFx0XHRcdFx0Ly9uZWVkZWQsIHRoZSBwcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlc29sdmVkXG5cdFx0XHRcdFx0VXNlclNlcnZpY2UuZ2V0VXNlcigkc3RhdGVQYXJhbXMudSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHR1c2VySW5mbyA9IGRhdGE7XHRcblx0XHRcdFx0XHRcdC8vbm93IG1ha2Ugc2Vjb25kIGNhbGwgdG8gcmVzb2x2ZSB0aGUgYnVja2V0cyBmb3IgdGhlIHVzZXJcblx0XHRcdFx0XHRcdC8vKHNpbmNlIHRoZXkgc2hvdyB1cCBvbiB0aGUgZWRpdCBzY3JlZW4pXG5cdFx0XHRcdFx0XHRCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgdGhlIGN1cnJlbnQgdXNlciBpbmZvIEFGVEVSIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gcmVzb2x2ZWRcblx0XHRcdFx0XHRcdFx0Q3VycmVudFVzZXIudXNlckluZm8gPSB1c2VySW5mbztcblx0XHRcdFx0XHRcdFx0Q3VycmVudFVzZXIuYnVja2V0cyA9IGRhdGE7XHRcblx0XHRcdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZSgpO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZTtcblx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSkuXG5cdFx0c3RhdGUoJ3ZpZXdUcmFuc2FjdGlvbnNCeVVzZXInLCB7XG5cdFx0XHR1cmw6Jy90cmFuc2FjdGlvbnMvdmlldy97dX0nLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdHJhbnNhY3Rpb24vdmlld3MvdHJhbnNhY3Rpb25MaXN0Vmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdWaWV3VHJhbnNhY3Rpb25Db250cm9sbGVyJyxcblx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0dXNlckRhdGE6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgVXNlclNlcnZpY2UsIEJ1Y2tldFNlcnZpY2UsIFRyYW5zYWN0aW9uU2VydmljZSwgJHEsIEN1cnJlbnRVc2VyKSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIHVzZXJJbmZvO1xuXHRcdFx0XHRcdHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cblx0XHRcdFx0XHQvL21ha2UgZmlyc3QgY2FsbCB0byBnZXQgdGhlIHVzZXIuIElmIHdlJ3JlIGNhbGxpbmcgZm9yIHRoZSBzYW1lIHVzZXIsIG5vIEFKQVggY2FsbFxuXHRcdFx0XHRcdC8vbmVlZGVkLCB0aGUgcHJvbWlzZSBpcyBpbW1lZGlhdGVseSByZXNvbHZlZCBcblx0XHRcdFx0XHRVc2VyU2VydmljZS5nZXRVc2VyKCRzdGF0ZVBhcmFtcy51KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdHVzZXJJbmZvID0gZGF0YTtcdFxuXHRcdFx0XHRcdFx0Ly9ub3cgbWFrZSBzZWNvbmQgY2FsbCB0byByZXNvbHZlIHRoZSBidWNrZXRzIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8oc2luY2UgdGhleSBzaG93IHVwIG9uIHRoZSBlZGl0IHNjcmVlbilcblx0XHRcdFx0XHRcdFx0QnVja2V0U2VydmljZS5nZXRCdWNrZXRzRm9yVXNlcigkc3RhdGVQYXJhbXMudSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdC8vdXBkYXRlIHRoZSBjdXJyZW50IHVzZXIgaW5mbyBBRlRFUiBldmVyeXRoaW5nIGhhcyBiZWVuIHJlc29sdmVkXG5cdFx0XHRcdFx0XHRcdEN1cnJlbnRVc2VyLnVzZXJJbmZvID0gdXNlckluZm87XG5cdFx0XHRcdFx0XHRcdEN1cnJlbnRVc2VyLmJ1Y2tldHMgPSBkYXRhO1x0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Ly9ub3cgbWFrZSBhIGNhbGwgdG8gZ2V0IHRoZSB0cmFuc2FjdGlvbnMgZm9yIGEgdXNlclxuXHRcdFx0XHRcdFx0XHQvL29uY2UgYWxsIHRocmVlIG9mIHRoZXNlIGFyZSByZXNvbHZlZCwgd2UgY2FuIG1vdmUgZm9yd2FyZFxuXHRcdFx0XHRcdFx0XHRUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zQnlVc2VyKCRzdGF0ZVBhcmFtcy51KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSB0aGUgY3VycmVudCB1c2VyIGluZm8gQUZURVIgZXZlcnl0aGluZyBoYXMgYmVlbiByZXNvbHZlZFxuXHRcdFx0XHRcdFx0XHRcdEN1cnJlbnRVc2VyLnRyYW5zYWN0aW9ucyA9IGRhdGE7XG5cdFx0XHRcdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZSgpO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWZlci5wcm9taXNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuXG5cdFx0c3RhdGUoJ2FkZFRyYW5zYWN0aW9uJywge1xuXHRcdFx0dXJsOicvdHJhbnNhY3Rpb25zL2FkZD90eXBlPXt3aGljaFR5cGV9JnU9e3VzZXJJRH0nLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdHJhbnNhY3Rpb24vdmlld3MvdHJhbnNhY3Rpb25BZGRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZFRyYW5zYWN0aW9uQ29udHJvbGxlcicsXG5cdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxCdWNrZXRTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0Ly9uZWVkIHRvIGhhdmUgdGhlIGJ1Y2tldHMgQkVGT1JFIGdvaW5nIHRvIHRoaXMgc3RhdGVcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gQnVja2V0U2VydmljZS5nZXRCdWNrZXRzRm9yVXNlcigkc3RhdGVQYXJhbXMudSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5cblx0XHRzdGF0ZSgnZWRpdFRyYW5zYWN0aW9uJywge1xuXHRcdFx0dXJsOicvdHJhbnNhY3Rpb25zL2VkaXQ/dD17dHJhbnNhY3Rpb25JRH0mdT17dXNlcklEfScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkVkaXRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0VkaXRUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHR0cmFuc2FjdGlvbjogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBUcmFuc2FjdGlvblNlcnZpY2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9uKCRzdGF0ZVBhcmFtcy50KTtcblx0XHRcdFx0fSwgXG5cdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgQnVja2V0U2VydmljZSkge1xuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLiBcblx0XHRzdGF0ZSgnYWRkQnVja2V0Jywge1xuXHRcdFx0dXJsOiAnL2J1Y2tldHMvYWRkL3t1fScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy9idWNrZXQvdmlld3MvYWRkQnVja2V0Vmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRCdWNrZXRDb250cm9sbGVyJ1xuXHRcdH0pLlxuXHRcdHN0YXRlKCdlZGl0QnVja2V0Jywge1xuXHRcdFx0dXJsOiAnL2J1Y2tldC9lZGl0L3tifScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy9idWNrZXQvdmlld3MvZWRpdEJ1Y2tldFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnRWRpdEJ1Y2tldENvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHRidWNrZXQ6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgQnVja2V0U2VydmljZSkge1xuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldE9uZUJ1Y2tldCgkc3RhdGVQYXJhbXMuYik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG4vL3NldCB0aGUgQ3VycmVudFVzZXIgdmFsdWUgdG8gYmUgdXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB1c2VyIHdlJ3JlIGFjdGluZyBvblxuKS52YWx1ZSgnQ3VycmVudFVzZXInLCB7XG5cdHVzZXJJbmZvOiB7fSxcblx0YnVja2V0czoge30sXG5cdHRyYW5zYWN0aW9uczoge31cbn0pO1xuXG4iXX0=
