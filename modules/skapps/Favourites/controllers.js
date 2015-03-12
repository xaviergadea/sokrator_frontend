// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesFavourites', [])
.value('version', '0.1')
.factory("initFavourites", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    //getFavouritesList: function(backpath,scope,tools,userId,category) {		
    getFavouritesList: function(backpath,scope,routeGet,routeAuth,userId,position) {		
    	initFovouritesList(backpath,scope,routeGet,userId,position);
    	
	},
    
	initFavouritesForm: function(backpath,scope,routeGet,routeAuth,userId,position) {	
		scope.newFavourite = function() {
			var position=this.positionFavourite;
			var routeGet=this.routeGetFavourite;
			var url = backpath.url+'getFavouriteCategoriesList/'+userId;
			
			
			$http.get(url).success(function(response) {
				scope.FavouriteCategories = response;
				$('#divnewFavourite').modal('show');
				//$window.location.href = "#skconfig";
			});	
			
			
			$("#btOkNewFavourite").click(function(e) {
				// alert(data[i].paramsActivate);
				//formActivate(data[i],backpath,$cookieStore.get("userId"),$http,$window);
				var params="/";
				$("#FormFavourites").find(':input').each(function(index, element) {
					if (element.value!="") {
						params=params + encodeURIComponent(element.value) + "/";
					}
				});
				
				var url = backpath.url+'userSaveFavourite/'+userId+params;
				$http.get(url).success(function(response) {
					$("#btOkNewFavourite").unbind("click");
					$("#FormFavourites")[0].reset();
					$('.modal').modal('hide');
					initFovouritesList(backpath,scope,routeGet,userId,position);
					//scope.AppPosition(scope,routeGet,routeGet,position)	
					//$window.location.href = "#skconfig";
				});				
			});
		}
		scope.editFavourite = function() {
			var position=this.positionFavourite;
			var routeGet=this.routeGetFavourite;
			var idItem=this.FavouriteItem._id;
			var url = backpath.url+'getFavouriteItem/'+userId+'/'+idItem;
			$http.get(url).success(function(response) {
				scope.favEdit=response.UserFavourites;
			
			
				var url = backpath.url+'getFavouriteCategoriesList/'+userId;
						
				$http.get(url).success(function(response) {
					scope.FavouriteCategories = response;
					angular.forEach(response, function(value, key) {
					  if (value._id==scope.favEdit[0].UserFavouriteCategory) {
						   scope.selectedFavourite = value;
					  }
					});												
					$('#diveditFavourite').modal('show');					
				});			
				$("#btOkEditFavourite").unbind("click");
				$("#btOkEditFavourite").click(function(e) {
					// alert(data[i].paramsActivate);
					//formActivate(data[i],backpath,$cookieStore.get("userId"),$http,$window);
					var params="/"+idItem+"/";
					$("#FormEditFavourites").find(':input').each(function(index, element) {
						if (element.value!="") {
							params=params + encodeURIComponent(element.value) + "/";
						}
					});
					
					var url = backpath.url+'userSaveEditFavourite/'+userId+params;
					$http.get(url).success(function(response) {
						if (response=="ok") {
							$("#btOkEditFavourite").unbind("click");
							$("#FormFavourites")[0].reset();
							$('.modal').modal('hide');
							initFovouritesList(backpath,scope,routeGet,userId,position);
						} else {
							alert("Error al guardar el canvi");
						}
						$("#btOkEditFavourite").unbind("click");						
					});				
				});
			});	
		}
		scope.deleteFavourite = function() {
			var position=this.positionFavourite;
			var routeGet=this.routeGetFavourite;
			if (confirm("Realment vols eliminar?")) {			
				var url = backpath.url+'userDeleteFavourite/'+userId+"/"+this.FavouriteItem._id;
				$http.get(url).success(function(response) {			
					initFovouritesList(backpath,scope,routeGet,userId,position);
					//$window.location.href = "#skconfig";
				});	
			}
			
		}
		scope.NewFavouriteCategory = function () {
			$("#DivNewFavouriteCategory").show();	
		}
		
		scope.SaveFavouriteCategory = function () {
			var url = backpath.url+'userSaveFavouriteCategory/'+userId+'/'+$("#newFavouriteCategory").val();
			
			$http.get(url).success(function(response) {
				var url = backpath.url+'getFavouriteCategoriesList/'+userId;
				$http.get(url).success(function(response) {
					scope.FavouriteCategories = response;
					$('#DivNewFavouriteCategory').hide();
					$("#newFavouriteCategory").val("");
					//$window.location.href = "#skconfig";
				});	
			});	
		}
		scope.changeCategoryFavourites= function () {
			var url = backpath.url+'getFavouriteCategoriesList/'+userId;
			
			
			$http.get(url).success(function(response) {
				scope.FavouriteCategories = response;
				$('#divChangeFavouritesCategory').modal('show');
				//$window.location.href = "#skconfig";
			});	
		}
		scope.changeFavouriteview = function() {
			if (angular.isUndefined(this.fav)==true) {
				var idFav=0;	
			} else {
				var idFav=this.fav._id;
			}
			var url = backpath.url+'getFavouriteListByCategory/'+userId+'/'+idFav;// URL where the Node.js server is running		
			$http.get(url).success(function(data) {
				if (data=="no_elements"){
					alert("No hem trobat favorits per a aquesta categoria!");
				} else {
					scope.FavouriteItems = data;
					//scope.positionFavourite = position;
					//scope.routeGetFavourite = routeGet;
					$('#divChangeFavouritesCategory').modal('hide');
				}
			});
		}
	}
  };
  function initFovouritesList(backpath,scope,routeGet,userId,position){
		var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running		
		$http.get(url).success(function(data) {
			scope.FavouriteItems = data.UserFavourites;
			scope.positionFavourite = position;
			scope.routeGetFavourite = routeGet;
		});
	}
});
