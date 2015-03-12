'use strict';

/* Controllers */

angular.module('myApp.perfilcontrollers', ['angularMoment'])
.controller('skperfil', ['$scope','$http','backpath','$cookieStore','$window', function($scope,$http,backpath,$cookieStore,$window) {
    if ($cookieStore.get("userId")){
		var userId=$cookieStore.get("userId");
		$scope.nameUser=$cookieStore.get("name");
		$scope.img=$cookieStore.get("image");
		
	} else {
		var userId=0;
	}
	$scope.openMenuUser = function(action) {
		$("#menuPerfil").toggle();
	}
	
}])
angular.module('myApp.editprofilecontrollers', ['angularMoment'])
.controller('skeditprofile', ['$scope','$http','backpath','$cookieStore','$window','$location','$upload','$route', function($scope,$http,backpath,$cookieStore,$window,$location,$upload,$route) {
    var url = backpath.url+'AuserREST/'+$cookieStore.get("userId");// URL where the Node.js server is running	
	var file;
    $http.get(url).success(function(data) {    
        
        var now = moment(data.birthdate); 
        now=now.format("DD/MM/YYYY");
        data.birthdate=now;
        $scope.user = data;
		
    });
	$scope.editUser = function() {
		
        var url = backpath.url+'edituserREST/'+this.user._id;// URL where the Node.js server is running	
        /*$http({
            method: 'POST',
            url:url,
            data:$scope.user
            })
            .success(function (data) {
                $location.path('/skprofile')
            })
            .error(function(data) {
                console.log("Erro: "+data);
            })*/
		//$scope.rootUrl = "yourRootUrl";
		$scope.upload = $upload.upload({
			url: url,
			method: 'POST',
			file: file,
			data:$scope.user
		}).progress(function(evt) {
		}).success(function(data, status, headers, config) {
			$cookieStore.put("name", data.name);
			$cookieStore.put("image", data.photo);
			$cookieStore.put("bgImg", data.bgImg);
			$route.reload();
		});
     };
	
	
	 $scope.onFileSelect = function($files) {
		//$files: an array of files selected, each file has name, size, and type.
		for (var i = 0; i < $files.length; i++) {
			file = $files[i];
			
		//.error(...)
		//.then(success, error, progress); 
		// access or attach event listeners to the underlying XMLHttpRequest.
		//.xhr(function(xhr){xhr.upload.addEventListener(...)})
		}
		/* alternative way of uploading, send the file binary with the file's content-type.
		Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
		It could also be used to monitor the progress of a normal http post/put request with large data*/
		// $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
		};
	
}])