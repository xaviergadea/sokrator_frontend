// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesYouTube', [])
.value('version', '0.1')
.factory("initYouTube", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getYouTubeList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		
		scope.AcessYouTube = function() {
			$("#validaYouTube").submit();
		}	
	},
	
    
  };
});
