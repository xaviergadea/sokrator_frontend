'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.value('version', '0.1')
.factory('backpath', function() {
  return {
      //url : 'http://localhost:3000/'
	  url : 'http://v1-back.sokrato.me/'
  };
}).factory('AuthService',function ($http, Session,$cookieStore,$location) {
  return {
    login: function (credentials,scope) {
      return $http
        .post('http://v1-back.sokrato.me/loginRestDB', credentials)
        .then(function (res) {
          if (res.data==0) {
			  return false;
		  } else {
			  if (res.data.isAdmin==true){
				  var role="admin";  
			  } else {
				  var role="guest";
			  }
			  Session.create(res.data._id, res.data._id, role,res.data.name,res.data.photo,res.data.bgImg,$cookieStore);
			  $location.path('/skapps');
		  }
        });
    },
    isAuthenticated: function () {
      return $cookieStore.get("userId");
    },
    isAuthorized: function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (this.isAuthenticated($cookieStore) &&
       // authorizedRoles.indexOf(Session.userRole) !== -1);
	   authorizedRoles.indexOf($cookieStore.get("userRole")) !== -1);
    }
  };
}).service('Session', function () {
  this.create = function (sessionId, userId, userRole, name, image,bgImg, $cookieStore) {
	$cookieStore.put("userId", userId);
	$cookieStore.put("userRole", userRole);
	$cookieStore.put("name", name);
	$cookieStore.put("image", image);
	$cookieStore.put("bgImg", bgImg);
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
	$cookieStore.put("userId", null);
	$cookieStore.put("userRole", null);
	$cookieStore.put("name", null);
	$cookieStore.put("image", null);
	$cookieStore.put("bgImg", null);
  };
  return this;
}).run(function ($rootScope, AUTH_EVENTS, AuthService,$location,$cookieStore) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (next.data!=undefined){
	if (!next.data.publicPage) {
		var authorizedRoles = next.data.authorizedRoles;
		if (!AuthService.isAuthorized(authorizedRoles)) {
		  event.preventDefault();
		  if (AuthService.isAuthenticated($cookieStore)) {
			// user is not allowed
			$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		  } else {
			// user is not logged in
			//$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
			$location.path('/login');
		  }
		}
	}
	} 
  });
});

angular.module('myApp.servicesApps', []).factory('Connect', function($http){

    var factory = {};
    var baseUrl = 'https://api.twitter.com/';

    var bearerToken = function(){
        var consumerKey = encodeURIComponent('kIXgiMbGdneKf6ERdrPuGajv0');
        var consumerSecret = encodeURIComponent('DlsomSsx90tIpMiZbaddZ3FYahOBMZQMAEQilN1Yf61q1gy8ie');
        var tokenCredentials = btoa(consumerKey + ':' + consumerSecret);

        return tokenCredentials;
    };

factory.fetchAccessToken = function(scope){
    
    var oAuthurl = baseUrl + "oauth2/token";
    var headers = {
            'Authorization': 'Basic ' + bearerToken(),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    $http({method: 'POST', url: oAuthurl, headers: headers, data: 'grant_type=client_credentials'}).
        success(function(data, status){
            return data;
            scope.status = status;
            scope.data = data;
        }).
        error(function(data, status){
            return data;
            scope.status = status;
            scope.data = data || "Request failed";
        });
};

factory.fetchTimeLine = function(scope){
    scope.fetchAccessToken();
    //the rest
};
return factory;
});