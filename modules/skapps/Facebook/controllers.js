// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesFacebook', [])
.value('version', '0.1')
.factory("initFacebook", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    getFbList: function(backpath,scope,routeGet,routeAuth,userId) {		
     	listFacebook(backpath,scope,routeGet,routeAuth,userId);
		scope.RefreshFacebook = function() {
			listFacebook(backpath,scope,routeGet,routeAuth,userId);
		}
	},
    
  };
  function listFacebook(backpath,scope,routeGet,routeAuth,userId){
	$("#spinnerFacebook").show();
	var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running	
	var url_refresh_token=routeAuth;
	$http.get(url).success(function(data) {
		scope.FBItems = data.data;
		$("#spinnerFacebook").hide();		
	});
}
});
