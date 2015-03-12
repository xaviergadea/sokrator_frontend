// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesAlexandria', [])
.value('version', '0.1')
.factory("initAlexandria", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getAlexandriaList: function(backpath,scope,routeGet,routeAuth,userId,position) {				
		scope.AcessAlexandria = function() {
			$("#validaAlexandria").submit();
		}	
	},
	
    
  };
});
