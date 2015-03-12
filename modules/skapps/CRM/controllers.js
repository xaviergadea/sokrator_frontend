// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesCRM', [])
.value('version', '0.1')
.factory("initCRM", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getCRMList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		
		scope.AcessCRM = function() {
			$("#validaCRM").submit();
		}	
	},
	
    
  };
});
