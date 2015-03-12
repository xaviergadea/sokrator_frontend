'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('interpolate', ['version', function(version) {
        return function(text) {
          return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
	.filter('unsafe', function($sce) {
    	return function(val) {
        return $sce.trustAsHtml(val);
    };
	}).filter('fromNow', function() {
	  return function(date) {
		moment.lang("ca");
		return moment(date).fromNow();
	  }
	});;

                                       
