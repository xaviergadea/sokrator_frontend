// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesMinimax', [])
.value('version', '0.1')
.factory("initMinimax", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getMinimaxList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		scope.AcessMinimax = function() {
			$("#validaSocratesMinimax").submit();
		}	
	},
	
    
  };
});
