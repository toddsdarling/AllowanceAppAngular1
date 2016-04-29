(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//allowance module here
'use strict';


angular.module('AllowanceApp', ['ngRoute', 'AllowanceApp.UserController']).config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
	  when('/', {
	    templateUrl: '/js/user/views/userListView.html',
	    controller: 'UserController'
	  }).
	  when('/users/add', {
	  	templateUrl: '/js/user/views/userAddView.html',
	  	controller: 'UserController'
	  }).
	  otherwise({
	    redirectTo: '/'
	  });
}]);




},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL2FsbG93YW5jZSBtb2R1bGUgaGVyZVxuJ3VzZSBzdHJpY3QnO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdBbGxvd2FuY2VBcHAnLCBbJ25nUm91dGUnLCAnQWxsb3dhbmNlQXBwLlVzZXJDb250cm9sbGVyJ10pLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJyxcblx0ZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcblx0JHJvdXRlUHJvdmlkZXIuXG5cdCAgd2hlbignLycsIHtcblx0ICAgIHRlbXBsYXRlVXJsOiAnL2pzL3VzZXIvdmlld3MvdXNlckxpc3RWaWV3Lmh0bWwnLFxuXHQgICAgY29udHJvbGxlcjogJ1VzZXJDb250cm9sbGVyJ1xuXHQgIH0pLlxuXHQgIHdoZW4oJy91c2Vycy9hZGQnLCB7XG5cdCAgXHR0ZW1wbGF0ZVVybDogJy9qcy91c2VyL3ZpZXdzL3VzZXJBZGRWaWV3Lmh0bWwnLFxuXHQgIFx0Y29udHJvbGxlcjogJ1VzZXJDb250cm9sbGVyJ1xuXHQgIH0pLlxuXHQgIG90aGVyd2lzZSh7XG5cdCAgICByZWRpcmVjdFRvOiAnLydcblx0ICB9KTtcbn1dKTtcblxuXG5cbiJdfQ==
