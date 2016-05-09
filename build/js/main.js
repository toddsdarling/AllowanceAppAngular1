(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL2FsbG93YW5jZSBtb2R1bGUgaGVyZVxuJ3VzZSBzdHJpY3QnO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdBbGxvd2FuY2VBcHAnLCBbJ3VpLnJvdXRlcicsICdMaXN0VXNlckNvbnRyb2xsZXInLCAnQWRkVXNlckNvbnRyb2xsZXInLCAnRWRpdFVzZXJDb250cm9sbGVyJywgJ1ZpZXdUcmFuc2FjdGlvbkNvbnRyb2xsZXInLCAnQWRkVHJhbnNhY3Rpb25Db250cm9sbGVyJywgJ0J1Y2tldFNlcnZpY2UnLCAnRWRpdFRyYW5zYWN0aW9uQ29udHJvbGxlciddKS5jb25maWcoXG5cblx0ZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG5cdFx0Ly8kdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cblx0XHQkc3RhdGVQcm92aWRlclxuXHRcdC5zdGF0ZSgnLycsIHtcblx0XHRcdHVybDonLycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy91c2VyL3ZpZXdzL3VzZXJMaXN0Vmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdMaXN0VXNlckNvbnRyb2xsZXInXG5cdFx0fSkuXG5cdFx0c3RhdGUoJ2FkZFVzZXJzJywge1xuXHRcdFx0dXJsOicvdXNlcnMvYWRkJyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnL2pzL3VzZXIvdmlld3MvdXNlckFkZFZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkVXNlckNvbnRyb2xsZXInXG5cdFx0fSkuXG5cdFx0c3RhdGUoJ2VkaXRVc2VycycsIHtcblx0XHRcdHVybDogJy91c2Vycy9lZGl0L3t1c2VySUR9Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnL2pzL3VzZXIvdmlld3MvdXNlckVkaXRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0VkaXRVc2VyQ29udHJvbGxlcidcblx0XHR9KS5cblx0XHRzdGF0ZSgndmlld1RyYW5zYWN0aW9uc0J5VXNlcicsIHtcblx0XHRcdHVybDonL3RyYW5zYWN0aW9ucy92aWV3L3t1fScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkxpc3RWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1ZpZXdUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHR1c2VyOiBmdW5jdGlvbigkc3RhdGVQYXJhbXMsIFVzZXJTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFVzZXJTZXJ2aWNlLmdldFVzZXIoJHN0YXRlUGFyYW1zLnUpO1xuXHRcdFx0XHR9LCBcblx0XHRcdFx0YnVja2V0czogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBCdWNrZXRTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIEJ1Y2tldFNlcnZpY2UuZ2V0QnVja2V0c0ZvclVzZXIoJHN0YXRlUGFyYW1zLnUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuXG5cdFx0c3RhdGUoJ2FkZFRyYW5zYWN0aW9uJywge1xuXHRcdFx0dXJsOicvdHJhbnNhY3Rpb25zL2FkZD90eXBlPXt3aGljaFR5cGV9JnU9e3VzZXJJRH0nLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcvanMvdHJhbnNhY3Rpb24vdmlld3MvdHJhbnNhY3Rpb25BZGRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZFRyYW5zYWN0aW9uQ29udHJvbGxlcicsXG5cdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxCdWNrZXRTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0Ly9uZWVkIHRvIGhhdmUgdGhlIGJ1Y2tldHMgQkVGT1JFIGdvaW5nIHRvIHRoaXMgc3RhdGVcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gQnVja2V0U2VydmljZS5nZXRCdWNrZXRzRm9yVXNlcigkc3RhdGVQYXJhbXMudSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5cblx0XHRzdGF0ZSgnZWRpdFRyYW5zYWN0aW9uJywge1xuXHRcdFx0dXJsOicvdHJhbnNhY3Rpb25zL2VkaXQ/dD17dHJhbnNhY3Rpb25JRH0mdT17dXNlcklEfScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9qcy90cmFuc2FjdGlvbi92aWV3cy90cmFuc2FjdGlvbkVkaXRWaWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0VkaXRUcmFuc2FjdGlvbkNvbnRyb2xsZXInLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHR0cmFuc2FjdGlvbjogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBUcmFuc2FjdGlvblNlcnZpY2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9uKCRzdGF0ZVBhcmFtcy50KTtcblx0XHRcdFx0fSwgXG5cdFx0XHRcdGJ1Y2tldHM6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgQnVja2V0U2VydmljZSkge1xuXHRcdFx0XHRcdHJldHVybiBCdWNrZXRTZXJ2aWNlLmdldEJ1Y2tldHNGb3JVc2VyKCRzdGF0ZVBhcmFtcy51KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbik7XG5cbiJdfQ==
