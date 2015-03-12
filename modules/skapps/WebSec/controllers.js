// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesWebSec', [])
.value('version', '0.1')
.factory("initWebSec", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getWebSecList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		
		scope.AcessWebSec = function() {
			$("#validaHipatiaWebSec").submit();
		}	
	},
	
    
  };
});
