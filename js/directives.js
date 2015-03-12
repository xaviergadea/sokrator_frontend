'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  
  	.directive('inituserprofile',['backpath','$cookieStore','$http', function (backpath,$cookieStore,$http)
	{
		return {
		
			restrict: 'E',
			//templateUrl: 'partials/GMail.html',
			template: '<ng-include src="getTemplateUser()"/>',
			controller: function($scope) {
			  //function used on the ng-include to resolve the template
			  $scope.getTemplateUser = function() {
				//basic handling
				  return "partials/user.html";			
				  
			  }
			}
		};
	}])
	.directive('appsinitialposition1',['backpath','$cookieStore','$http', function (backpath,$cookieStore,$http)
	{
		return {
		
			restrict: 'E',
			//templateUrl: 'partials/GMail.html',
			template: '<ng-include src="getTemplateUrl1()"/>',
			controller: function($scope) {
			  //function used on the ng-include to resolve the template
			  $scope.getTemplateUrl1 = function() {
				//basic handling
				  if ($cookieStore.get("app1")!=undefined) {
					  return "partials/"+$cookieStore.get("app1").template;			
				  }
			  }
			},
			link: function (scope,element,$scope,$rootScope)
			{
				if ($cookieStore.get("app1")!=undefined) {
					scope.AppPosition(scope,$cookieStore.get("app1").routeGet,$cookieStore.get("app1").routeAuth,1);
				}
				
					
			}
		};
	}])
	.directive('appsinitialposition2',['backpath','$cookieStore','$http', function (backpath,$cookieStore,$http)
	{
		return {
		
			restrict: 'E',
			//templateUrl: 'partials/GMail.html',
			template: '<ng-include src="getTemplateUrl2()"/>',
			controller: function($scope) {
			  //function used on the ng-include to resolve the template
			  $scope.getTemplateUrl2 = function() {
				//basic handling
				  if ($cookieStore.get("app2")!=undefined) {
					  return "partials/"+$cookieStore.get("app2").template;			
				  }
			  }
			},
			link: function (scope,element,$scope,$rootScope)
			{
				if ($cookieStore.get("app2")!=undefined) {
					scope.AppPosition(scope,$cookieStore.get("app2").routeGet,$cookieStore.get("app2").routeAuth,2);
				}
					
			}
		};
	}])
	.directive('appsinitialposition3',['backpath','$cookieStore','$http', function (backpath,$cookieStore,$http)
	{
		return {
		
			restrict: 'E',
			//templateUrl: 'partials/GMail.html',
			template: '<ng-include src="getTemplateUrl3()"/>',
			controller: function($scope) {
			  //function used on the ng-include to resolve the template
			  $scope.getTemplateUrl3 = function() {
				//basic handling
				if ($cookieStore.get("app3")!=undefined) {
				  return "partials/"+$cookieStore.get("app3").template;			
				}
			  }
			},
			link: function (scope,element,$scope,$rootScope)
			{
				if ($cookieStore.get("app3")!=undefined) {
					scope.AppPosition(scope,$cookieStore.get("app3").routeGet,$cookieStore.get("app3").routeAuth,3);
				}
					
			}
		};
	}]).directive('myBackgroundImage', function ($cookieStore) {
        return function (scope, element, attrs) {
           	if ($cookieStore.get("bgImg")) {
				var img=$cookieStore.get("bgImg");
			} else{
				var img='bg_suburb.jpg';
			}
			element.css({
				 'background': 'url(img/'+img+')  no-repeat center center fixed',
				 '-webkit-background-size' : 'cover',
				 '-moz-background-size' : 'cover',
				 '-o-background-size' : 'cover',
				 'background-size' : 'cover'
				 
					/*'background-size': 'cover',
					'background-repeat': 'no-repeat',
					'background-position': 'center center'*/
			});
        };
    })
	/*.directive(
		"bnTiming",
		function( $timeout ) {

			// I bind the JavaScript events to the local scope.
			function link( $scope, element, attributes ) {

				$timeout();

				$scope.$evalAsync(
					function( $scope ) {

						

					}
				);

				$timeout(
					function() {
						$('.collapse').collapse();

						console.log( "$timeout 2" );

					}
				);

			}


			// Return the directive configuration.
			return({
				link: link
			});

		}
	);*/
	/*.directive('viewRepeatDirective', function() {
	  return function(scope, element, attrs) {		
		if (scope.$last){
		  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ca_ES/sdk.js#xfbml=1&appId=983736598319119&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
		}
	  };
	})*/
	
  ;

