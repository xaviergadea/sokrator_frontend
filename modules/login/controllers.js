'use strict';

/* Controllers */

angular.module('myApp.logincontrollers', ['angularMoment'])  
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService,$cookieStore) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  	$cookieStore.put("userId", null);
	$cookieStore.put("userRole", null);
	$cookieStore.put("name", null);
	$cookieStore.put("image", null);
	$cookieStore.put("bgImg", null);
	
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (ret) {
		if (ret==false){
			$rootScope.error_user=1;
		}else{
      		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		}
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	 
    });
  };
})
