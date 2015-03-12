// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesRSS', [])
.value('version', '0.1')
.factory("initRSS", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getRSSList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
		listRSS(backpath,scope,routeGet,routeAuth,userId,position);
		scope.RefreshRSS = function() {
			listRSS(backpath,scope,routeGet,routeAuth,userId,position);
		}
	},
	
	initRSSForm: function(backpath,scope,routeGet,routeAuth,userId,position) {	
		scope.newRSS = function() {
			var position=this.position;
			var routeGet=this.routeGet;
			$('#divnewRSS').modal('show');
			$("#btOkNewRSS").click(function(e) {
				var params="/";
				$("#FormRSS").find(':input').each(function(index, element) {
					params=params + encodeURIComponent(element.value) + "/";
				});
				
				var url = backpath.url+'userSaveRSS/'+userId+params;
				$http.get(url).success(function(response) {
					$("#btOkNewRSS").unbind("click");
					$("#FormRSS")[0].reset();
					$('.modal').modal('hide')
					scope.AppPosition(scope,routeGet,routeGet,position)	
					//$window.location.href = "#skconfig";
				});				
			});
		}
		scope.deleteRSS = function() {
			var position=this.position;
			var routeGet=this.routeGet;
			if (confirm("Realment vols eliminar?")) {			
				var url = backpath.url+'userDeleteRSS/'+userId+"/"+this.FavouriteItem._id;
				$http.get(url).success(function(response) {			
					scope.AppPosition(scope,routeGet,routeGet,position)	
					//$window.location.href = "#skconfig";
				});	
			}
			
		}
		scope.changeRSS = function() {
			var position=this.position;
			var routeGet=this.routeGet;
			var url = backpath.url+'userGetListRSS/'+userId;
			$http.get(url).success(function(response) {
				scope.listRss=response;
				$('#divChangeRSS').modal('show');
				//$window.location.href = "#skconfig";
			});	
			
		}
		scope.changeRSSview = function() {
			$("#spinnerRSS").show();
			var position=this.position;
			var routeGet=this.routeGet;
			
			
			var url = backpath.url+routeGet+'/'+userId+'/'+encodeURIComponent(this.listone.url);// URL where the Node.js server is running		
			$http.get(url).success(function(data) {
				scope.articlesRSS = data;
				scope.position = position;
				scope.routeGet = routeGet;
				scope.myVar = false;
				scope.toggle = function() {
					scope["myVar"+this.$index] = !scope["myVar"+this.$index];
					
				};
				$("#spinnerRSS").hide();
				$('#divChangeRSS').modal('hide');
			});
			
		}
	}
    
  };
  function listRSS(backpath,scope,routeGet,routeAuth,userId,position){
	$("#spinnerRSS").show();
	var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running		
	$http.get(url).success(function(data) {
		scope.articlesRSS = data;
		scope.position = position;
		scope.routeGet = routeGet;
		scope.myVar = false;
		scope.toggle = function() {
			scope["myVar"+this.$index] = !scope["myVar"+this.$index];
			
		};
		$("#spinnerRSS").hide();
	});
  }
});
