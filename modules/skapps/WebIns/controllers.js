// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesWebIns', [])
.value('version', '0.1')
.factory("initWebIns", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getWebInsList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		scope.toggleSAT = function(idSAT) {
			scope["collapse"+idSAT] = !scope["collapse"+idSAT];
		};	
		scope.AcessWebIns = function() {
			$("#validaHipatiaWebIns").submit();
		}	
	},
	
    
  };
});
