'use strict';

/* Controllers */

angular.module('myApp.skconfigcontrollers', ['angularMoment'])
.controller('skconfig', ['$scope','$http','backpath','$cookieStore','$window', function($scope,$http,backpath,$cookieStore,$window) {
    if ($cookieStore.get("userId")){
		var userId=$cookieStore.get("userId");
	} else {
		var userId=0;
	}
	var url = backpath.url+'skappsREST/'+userId;// URL where the Node.js server is running	
    $http.get(url).success(function(data) {
        $scope.url=backpath.url;
        $scope.apps = data;
		$scope.userinfo=$cookieStore.get("userId");
		$('#TabConfig a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})
		for(var i in data) {
			if (data[i].paramsActivate!="" && data[i].paramsActivate && data[i].paramsActivate!="undefined") {
				/*switch(i) {
				    case "Moodle":*/
				if (i=="Moodle") {
					var numMoodle=i;
					$("#moodleParamsContent").load("modules/skconfig/views/parameters/"+data[numMoodle].paramsActivate+".html", function() {
					  $("#btOkActivate").click(function(e) {
						// alert(data[i].paramsActivate);
						formActivate(data[numMoodle],backpath,$cookieStore.get("userId"),$http,$window);
					  });
					});
				
				}
			}
		}
		
    })
	
	var url = backpath.url+'skappsRecomenadesREST/'+userId;// URL where the Node.js server is running	
    $http.get(url).success(function(data) {
        $scope.url=backpath.url;
        $scope.appsR = data;
		$scope.userinfo=$cookieStore.get("userId");
		$('#TabConfig a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})
		/*for(var i in data) {
			if (data[i].paramsActivate!="" && data[i].paramsActivate) {
				$("#moodleParamsContent").load("modules/skconfig/views/parameters/"+data[i].paramsActivate+".html", function() {
				  $("#btOkActivate").click(function(e) {
					// alert(data[i].paramsActivate);
					formActivate(data[i],backpath,$cookieStore.get("userId"),$http,$window);
				  });
				});
			}
		}*/
		
    })
	
}])
.controller('skappConfig', ['$scope','$http', '$location','backpath','$window','$cookieStore', function ($scope,$http,$location,backpath,$window,$cookieStore) { 
    $scope.connectapp = function() {
        
		//if (confirm("Realment vols connectar l'app?")) {
		if (this.app.paramsActivate!="" && this.app.paramsActivate) {
			$("#routeAuth").val(this.app.routeAuth)

			$('#'+this.app.paramsActivate).modal('show')
		} else if (this.app.routeAuth=="") { // CAS QUE NO TINGUI OAUTH
			var url = backpath.url+'userSaveApp/'+$cookieStore.get("userId")+"/"+this.app.appkey+"/0/0";			
			$http.get(url).success(function(data) {
				$window.location.href = "#skconfig";
			});
		} else {
            var url = backpath.url+this.app.routeAuth+'/'+$cookieStore.get("userId");// URL where the Node.js server is running	
			if (this.app.popup==1) {
				 $window.location.href=url;
			} else {
				$http.get(url).success(function(data) {
					if (data.url!=""){
						$window.location.href = data.url;
					}
				});
			}
		}
		   //$scope.aa = Connect.fetchAccessToken ($scope);
       // }
    }
	$scope.connectappRecomenades = function() {
        
			
		var url = backpath.url+'userSaveApp/'+$cookieStore.get("userId")+"/"+this.app.appkey+"/0/0"
		$http.get(url).success(function(data) {
			$window.location.href = "#skconfig";
		});
    }
	$scope.removeApp = function() {        
		//if (confirm("Realment vols desvincular l'app?")) {
			var url = backpath.url+'deleteApp/'+$cookieStore.get("userId")+"/"+this.app.appkey;// URL where the Node.js server is running	
			$http.get(url).success(function(data) {
				$window.location.reload();
				//if (data.url!=""){
				//$window.location.href = data.url;
				//alert(data.name);
				//}
			});        
		//}
    }
	
 }])
.controller('returnAPI', ['$scope','$http', '$location','backpath','$window','$routeParams','$cookieStore', function ($scope,$http,$location,backpath,$window,$routeParams,$cookieStore) { 
	var url = backpath.url+'userSaveApp/'+$cookieStore.get("userId")+"/"+$routeParams.appkey+"/"+$routeParams.id+"/"+$routeParams.refresh_token;
	
	$http.get(url).success(function(data) {
		$window.location.href = "#skconfig";
	});
 }]).controller('returnCodeFacebook', ['$scope','$http', '$location','backpath','$window','$routeParams','$cookieStore', function ($scope,$http,$location,backpath,$window,$routeParams,$cookieStore) { 
	var url = backpath.url+'oauth2callbackFacebook/'+$routeParams.code;
	
	$http.get(url).success(function(data) {
		if (data.access_token!="" && data.access_token!="undefined") {
			var url = backpath.url+'userSaveApp/'+$cookieStore.get("userId")+"/FB/"+data.access_token+"/"+data.access_token;
	
			$http.get(url).success(function(data) {
				$window.location.href = "#skconfig";
			});
		}
	});
 }]);
function formActivate(dataParams,backpath,iduser,$http,$window){
	var params="/";
	$(".FormAppsConfig").find(':input').each(function(index, element) {
        params=params + encodeURIComponent(element.value) + "/";
    });
	
	var url = backpath.url+dataParams.routeAuth+"/"+iduser+params;// URL where the Node.js server is running	
	$http.get(url).success(function(response) {
		if (response.url!="" && response.url){
			$window.location.href = dataParams.url;
		}else if(response.token) {
			var url = backpath.url+'userSaveApp/'+iduser+"/"+dataParams.appkey+"/"+response.token+"/"+response.token+"/"+encodeURIComponent(response.urlMoodle)+"/"+encodeURIComponent(response.username)+"/"+encodeURIComponent(response.iduser);
			$http.get(url).success(function(response) {
				$('.modal').modal('hide')
				$window.location.href = "#skconfig";
			});
		}
	});
}