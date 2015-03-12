'use strict';

/* Controllers */

angular.module('myApp.userscontrollers', ['angularMoment'])  
  .controller('ListUserCtrl', ['$scope','$http','backpath', function($scope,$http,backpath) {
    var url = backpath.url+'AuserREST';// URL where the Node.js server is running	
      $http.get(url).success(function(data) {          
          $scope.users = data;
	  });

  }])
 .controller('NewUserCtrl', ['$scope','$http', '$location','backpath', function ($scope,$http,$location,backpath) {   
     
     $scope.newUser = function() {
        //console.log($scope.form);
        var url = backpath.url+'newuserREST';// URL where the Node.js server is running	
        $http({
            method: 'POST',
            url:url,
            data:$scope.form
            })
            .success(function (data) {
                $location.path('/skusers')
            })
            .error(function(data) {
                console.log("Erro: "+data);
            })
        };
        
 }])

.controller('EditUserCtrl', ['$scope','$http', '$location','$routeParams','backpath', function ($scope,$http,$location,$routeParams,backpath) {   
    var url = backpath.url+'AuserREST/'+$routeParams.id;// URL where the Node.js server is running	
    $http.get(url).success(function(data) {    
        
        var now = moment(data.birthdate); 
        
        //now=new Date(anyo, mes, dia);
        //return now;
        now=now.format("DD/MM/YYYY");
        //now=new Date(anyo, mes, dia).toDateInputValue();
        //console.log(now);
        data.birthdate=now;
        $scope.user = data;
		
    });
	
 }])
 
 .controller('UserOperations', ['$scope','$http', '$location','backpath','$upload', function ($scope,$http,$location,backpath,$upload) {   
    $scope.deleteUser = function() {
        if (confirm("Realment vols eliminar el registre?")) {
            var url = backpath.url+'deleteuserREST/'+this.user._id;// URL where the Node.js server is running	
            $http.get(url).success(function(data) {          
                $scope.users = data;
            });
        }
    },
    $scope.editUser = function() {
        var url = backpath.url+'edituserREST/'+this.user._id;// URL where the Node.js server is running	
        $http({
            method: 'POST',
            url:url,
            data:$scope.user
            })
            .success(function (data) {
                $location.path('/skusers')
            })
            .error(function(data) {
                console.log("Erro: "+data);
            })
     };
	 
	//$scope.usingFlash = FileAPI && FileAPI.upload != null;
	/*$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function() {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function(index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function(index) {
		$scope.upload[index].abort(); 
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ? 
			window.location.hash.substring(2): window.location.hash.substring(1)) : '1.2.20';
			
     $scope.onFileSelect = function($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = [];
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for ( var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function(fileReader, index) {
					fileReader.onload = function(e) {
						$timeout(function() {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};
	
	$scope.start = function(index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		var uploadUrl=backpath.url+'edituserREST/'+this.user._id;
		/*if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {'my-header': 'my-header-value'},
				data : {
					myModel : $scope.myModel
				},
				
				file: $scope.selectedFiles[index],
				fileFormDataName: 'myFile'
			});
			$scope.upload[index].then(function(response) {
				$timeout(function() {
					$scope.uploadResult.push(response.data);
				});
			}, function(response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function(evt) {
				// Math.min is to fix IE which reports 200% sometimes
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function(xhr){
//				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
			});
		} else {
			var fileReader = new FileReader();
            fileReader.onload = function(e) {
		        $scope.upload[index] = $upload.http({
		        	url: uploadUrl,
					headers: {'Content-Type': $scope.selectedFiles[index].type},
					data: {user : $scope.user}
		        }).then(function(response) {
					$scope.uploadResult.push(response.data);
				}, function(response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function(evt) {
					// Math.min is to fix IE which reports 200% sometimes
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
            }
	        fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		//}
	};*/
 }]);
