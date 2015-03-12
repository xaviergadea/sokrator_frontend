// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesMoodle', [])
.value('version', '0.1')
.factory("initMoodle", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    getCourseList: function(backpath,scope,routeGet,routeAuth,userId) {		
    	listMoodle(backpath,scope,routeGet,routeAuth,userId);
		scope.RefreshMoodle = function() {
			listMoodle(backpath,scope,routeGet,routeAuth,userId);
		}	
	},
    
  };
  function listMoodle(backpath,scope,routeGet,routeAuth,userId){
	$("#spinnerMoodle").show();
	var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running	
	var url_refresh_token=routeAuth;
	$http.get(url).success(function(data) {
		if (data.error==1) {

		} else {
			scope.MoodleEvents = data.events;
			$("#spinnerMoodle").hide();
			showMoodleEvent(scope);

		}
			
	});  
  }
  function showMoodleEvent(scope){
  	scope.toggleMoodleEvent = function() {
  		$("#MoodleBodyEvent").html(this.MoodleEv.description);
  		$("#divReadMoodleEvent").modal('show'); 	
  	}
  }
  
});
