// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesInfomedia', [])
.value('version', '0.1')
.factory("initInfomedia", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getInfomediaList: function(backpath,scope,routeGet,routeAuth,userId,position) {				
		scope.AcessInfomedia = function() {
			$("#validaInfomedia").submit();
		}	
	},
	
    
  };
});
