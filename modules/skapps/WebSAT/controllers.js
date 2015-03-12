// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesWebSAT', [])
.value('version', '0.1')
.factory("initWebSAT", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getWebSATList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		scope.toggleSAT = function(idSAT) {
			scope["collapse"+idSAT] = !scope["collapse"+idSAT];
		};	
		scope.AcessWebSAT = function() {
			$("#validaHipatia").submit();
		}	
	},
	
    
  };
});
