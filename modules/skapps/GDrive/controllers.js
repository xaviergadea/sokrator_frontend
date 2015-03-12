// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesGdrive', [])
.value('version', '0.1')
.factory("initGdrive", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    gdrivelList: function(backpath,scope,routeGet,routeAuth,userId) {
		listDrive(backpath,scope,routeGet,routeAuth,userId);
		scope.RefreshGDrive = function() {
			listDrive(backpath,scope,routeGet,routeAuth,userId);
		}	
	},
    
  };
  
  function listDrive(backpath,scope,routeGet,routeAuth,userId){   
  	$("#spinnerGDrive").show();
	var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running	
	var url_refresh_token=routeAuth;
	$http.get(url).success(function(data) {
		if (data.error=="token_lost"){
			var url = backpath.url+url_refresh_token+'/'+userId;
			$http.get(url).success(function(data) {
				if (data.url!=""){
					$window.location.href = data.url;
				}
			});
		} else {
			$(data).each(function(index, element) {				
				scope.files = element.items;
				$("#spinnerGDrive").hide();
			});
		}
	});
  }
});
