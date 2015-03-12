// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesAnalytics', [])
.value('version', '0.1')
.factory("initAnalytics", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getAnalyticsList: function(backpath,scope,routeGet,routeAuth,userId,position) {				
		scope.AcessAnalytics = function() {
			$("#validaAnalytics").submit();
		}	
	},
	
    
  };
});
