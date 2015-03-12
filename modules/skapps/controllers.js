'use strict';

/* Controllers */

angular.module('myApp.skappscontrollers', ['angularMoment'])
.controller('skapps', ['$scope','$http','backpath','$cookieStore','$window','$timeout', function($scope,$http,backpath,$cookieStore,$window,$timeout) {
    if ($cookieStore.get("userId")){
		var userId=$cookieStore.get("userId");
		//$scope.nameUser=$cookieStore.get("name");
		//$scope.img=$cookieStore.get("image");
	} else {
		var userId=0;
	}
	var items=[
		{ "numApp":"1"},
		{ "numApp":"2"},
		{ "numApp":"3"}
	];

	$scope.items=items;

	var exist_active=0;
	var url = backpath.url+'skappsREST/'+userId;// URL where the Node.js server is running	
    $http.get(url).success(function(data) {
		
		for(var i in data) {
			if (data[i].active==1) {
				exist_active=1;	
			}
		}
		/*if (exist_active==0) {
			$window.location.href = "#skconfig";
		} */
		
		$scope.url=backpath.url;
		$scope.apps = data;
		$scope.userinfo=$cookieStore.get("userId");
		
		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
			$("#menu-toggle").toggleClass("toggled");
		});
		$("#initSearch").click(function(e) {
			$(".cercador").toggle();
		});
		
		
    });
	
	var url = backpath.url+'skappsRecomenadesREST/'+userId;// URL where the Node.js server is running	
    $http.get(url).success(function(data) {
       
		for(var i in data) {
			if (data[i].active==1) {
				exist_active=1;	
			}
		}
		if (exist_active==0) {
			$window.location.href = "#skconfig";
		} 
		$scope.appsR = data;
		
    })
	
	var url = backpath.url+'skappsPositionREST/'+userId;// URL where the Node.js server is running	
    /*$http.get(url).success(function(data) {
		var position=0;
		
		
		jQuery.each(data,function(index, element) {
			if (element.position>0) {
				$cookieStore.put("app"+element.position,element);
				//$("#panelera1").find("appsinitialposition").replaceWith('<appsinitialposition1>');
			}
        });
		
			
		
		
    })*/
	globalRequestSync(url,"GET",cookiePut,$cookieStore);
	
	
}])


.controller('skappConnect', ['$scope','$http', '$location','backpath','$window','$cookieStore','base64','initGmail','initGdrive','initMoodle','initFacebook','initTools','initFavourites','initRSS','initTwitter','initWebSAT','initWebIns','initAlexandria','initMinimax','initWebSec','initCRM','initInfomedia','initAnalytics','initYouTube', function ($scope,$http,$location,backpath,$window,$cookieStore,base64,initGmail,initGdrive,initMoodle,initFacebook,initTools,initFavourites,initRSS,initTwitter,initWebSAT,initWebIns,initAlexandria,initMinimax,initWebSec,initCRM,initInfomedia,initAnalytics,initYouTube) {    

	$scope.AppPosition = function (scope,routeGet,routeAuth,position) {
		switch($cookieStore.get("app"+position).appkey) {
			case "GM":
				initGmail.gmailList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),base64);
				break;
			case "GD":
				initGdrive.gdrivelList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"));
				break;
			case "MD":
				initMoodle.getCourseList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"));
				break;
			case "FB":
				initFacebook.getFbList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"));
				break;
			case "TW":
				initTwitter.getTwitterList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"));
				break;
			case "PR": case "BL": case "BU": case "ST": case "UG":
				initTools.getToolsList(backpath,scope,$cookieStore.get("app"+position),$cookieStore.get("userId"),$cookieStore.get("app"+position).appkey);
				break;
			case "FV":
				initFavourites.getFavouritesList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
				initFavourites.initFavouritesForm(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
				break;
			case "RS":
				initRSS.getRSSList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
				initRSS.initRSSForm(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
				break;
			case "WS":
				initWebSAT.getWebSATList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "WI":
				initWebIns.getWebInsList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "AX":
				initAlexandria.getAlexandriaList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "MX":
				initMinimax.getMinimaxList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "WSEC":
				initWebSec.getWebSecList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "CRM":
				initCRM.getCRMList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "INFOMEDIA":
				initInfomedia.getInfomediaList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "GoogleAnalytics":
				initAnalytics.getAnalyticsList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);
			case "YouTube":
				initYouTube.getYouTubeList(backpath,scope,routeGet,routeAuth,$cookieStore.get("userId"),position);			
			default:
				
		}
		
	}
	$scope.viewFilesapp = function(action) {
		
		var url = backpath.url+'setAppPosition'+'/'+$cookieStore.get("userId")+"/"+this.app.appkey+"/"+action;
		$http.get(url);
		
		if (this.app.appR==1) { // ENTRA SI ÉS RECOMANADA
			$cookieStore.put("app"+action,this.app);		
			$scope.AppPosition($scope,"","",action)	
		} else {
			var url = backpath.url+'skappsOneAppREST/'+$cookieStore.get("userId")+'/'+this.app.appkey;// URL where the Node.js server is running	
			$http.get(url).success(function(data) {
				$cookieStore.put("app"+action,data);		
				$scope.AppPosition($scope,data.routeGet,data.routeAuth,action)	
				
			});
		}		
    }
    $scope.dragControlListeners = {
	    accept: function (sourceItemHandleScope, destSortableScope) {return boolean},//override to determine drag is allowed or not. default is true.
	    itemMoved: function (event) {},
	    orderChanged: function(event) {},
	    containment: '#board'//optional param.
	};
	
	
 }]);
var globalRequestSync = function (pUrl, pVerbo, pCallBack, $cookieStore) {
	
	$cookieStore.remove("app1");
	$cookieStore.remove("app2");
	$cookieStore.remove("app3");
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {

		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			pCallBack(httpRequest.responseText,$cookieStore);
		}
	}
	httpRequest.open(pVerbo, pUrl, false);
	httpRequest.send(null);

};
function cookiePut(data,$cookieStore){
	var data = JSON.parse(data);
	jQuery.each(data,function(index, element) {
		if (element.position>0) {
			$cookieStore.put("app"+element.position,element);
			//$("#panelera1").find("appsinitialposition").replaceWith('<appsinitialposition1>');
		}
	});
	jQuery.each(data["appsRec"],function(index, element) {
		if (element.position>0) {
			$cookieStore.put("app"+element.position,element);
			//$("#panelera1").find("appsinitialposition").replaceWith('<appsinitialposition1>');
		}
	});
	//$cookieStore.put("app"+element.position,element);
}
