// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesTools', [])
.value('version', '0.1')
.factory("initTools", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    getToolsList: function(backpath,scope,tools,userId,category) {		
    
	if (tools.appkey=="PR") {
		scope.toolsPR = tools;
	}else if (tools.appkey=="BL") {
		scope.toolsBL = tools;
	}else if (tools.appkey=="BU") {
		scope.toolsBU = tools;
	}else if (tools.appkey=="ST") {
		scope.toolsST = tools;
	}else if (tools.appkey=="UG") {
		scope.toolsUG = tools;
	}
	
	},
    
  };
});
