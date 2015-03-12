// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesTwitter', [])
.value('version', '0.1')
.factory("initTwitter", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    getTwitterList: function(backpath,scope,routeGet,routeAuth,userId) {		
     	listTwitter(backpath,scope,routeGet,routeAuth,userId);
		scope.RefreshTwitter = function() {
			listTwitter(backpath,scope,routeGet,routeAuth,userId);
		}
	},
    
  };
  function listTwitter(backpath,scope,routeGet,routeAuth,userId){
	$("#spinnerTwitter").show();
	var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running	
	var url_refresh_token=routeAuth;
	$http.get(url).success(function(data) {
		$("#spinnerTwitter").hide();
		scope.TWItems = data;		
	});
  }
});
