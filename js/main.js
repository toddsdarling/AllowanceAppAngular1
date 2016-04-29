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



