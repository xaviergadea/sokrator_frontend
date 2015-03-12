'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'linkify',
  'ngResource',
  'ab-base64',
  'myApp.filters',
  'myApp.services',
  'myApp.servicesApps',
  'myApp.directives',
  'myApp.controllers',
  'myApp.perfilcontrollers',
  'myApp.editprofilecontrollers',
  'myApp.userscontrollers',
  'myApp.skappscontrollers',
  'myApp.logincontrollers',
  'myApp.skconfigcontrollers',
  'myApp.servicesGmail',
  'myApp.servicesGdrive', 
  'myApp.servicesMoodle',
  'myApp.servicesFacebook',
  'myApp.servicesTwitter',
  'myApp.servicesTools',
  'myApp.servicesFavourites',
  'myApp.servicesRSS',
  'myApp.servicesWebSAT',
  'myApp.servicesWebIns',
  'myApp.servicesAlexandria',
  'myApp.servicesMinimax',
  'myApp.servicesWebSec',
  'myApp.servicesCRM',
  'myApp.servicesYouTube',
  'myApp.servicesInfomedia',
  'myApp.servicesAnalytics',
  "ui.bootstrap",
  "angularFileUpload",
  "ui.sortable"
]).


config(['$routeProvider', '$locationProvider','USER_ROLES', function($routeProvider,$locationProvider,USER_ROLES) {
	//$locationProvider.html5Mode(true);
	
	$routeProvider.when('/', {
		redirectTo: '/login'
	});
	$routeProvider.when('/skusers', {
	  templateUrl: 'modules/users/views/skusers.html', 
	  controller: 'ListUserCtrl',
	  data: {
		  publicPage:false,
		  authorizedRoles: [USER_ROLES.admin]
		}
	});
	$routeProvider.when('/skusers/new', {
		templateUrl: 'modules/users/views/sknewuser.html', 
		controller: 'NewUserCtrl',
		data: {
			publicPage:false,
			authorizedRoles: [USER_ROLES.admin]
		}
	});
	$routeProvider.when('/skusers/edit/:id', {
		templateUrl: 'modules/users/views/skedituser.html', 
		controller: 'EditUserCtrl',
		data: {
			publicPage:false,
			authorizedRoles: [USER_ROLES.admin]
    	}
	});
	$routeProvider.when('/skapps', {
		templateUrl: 'modules/skapps/views/skapps.html', 
		controller: 'skapps',
		data: {
			publicPage:false,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	});
	$routeProvider.when('/skconfig/returnAPI/:appkey/:id/:refresh_token', {
		templateUrl: 'modules/skconfig/views/skconfig.html', 
		controller: 'returnAPI',
		data: {
			publicPage:true,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	});
	$routeProvider.when('/skconfig/facebookreturn/:code', {
		templateUrl: 'modules/skconfig/views/skconfig.html', 
		controller: 'returnCodeFacebook',
		data: {
			publicPage:true,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	});
	$routeProvider.when('/skconfig/returnAPI/:code', {
		templateUrl: 'modules/skconfig/views/skconfig.html', 
		controller: 'returnAPI',
		data: {
			publicPage:true,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	});
	$routeProvider.when('/login', {
		templateUrl: 'modules/login/views/login.html', 
		controller: 'LoginController',
		data: {
			publicPage:true
		}
	});
	$routeProvider.when('/skconfig', {
		templateUrl: 'modules/skconfig/views/skconfig.html', 
		controller: 'skconfig',
		data: {
			publicPage:false,
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	});
	$routeProvider.when('/skprofile', {
		templateUrl: 'modules/perfil/views/profile.html', 
		controller: 'skeditprofile',
		data: {
			publicPage:false
		}
	});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
	//$routeProvider.otherwise({redirectTo: '/login'});
}])
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]).constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});
/*.use(function(req, res) {
    res.sendfile(__dirname + '/Public/index.html');
});*/