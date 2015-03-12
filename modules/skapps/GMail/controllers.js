// JavaScript Document
'use strict';

/* Controllers */
angular.module('myApp.servicesGmail', [])
.value('version', '0.1')
.factory("initGmail", function($http) {
//  var users = ["Peter", "Daniel", "Nina"];

  return {
    gmailList: function(backpath,scope,routeGet,routeAuth,userId,base64) {
		listMails(backpath,scope,routeGet,routeAuth,userId,base64);
		scope.RefreshGmail = function() {
			listMails(backpath,scope,routeGet,routeAuth,userId,base64);
		}	
	},
    
  };
  function listMails(backpath,scope,routeGet,routeAuth,userId,base64){
		$("#spinnerGmail").show();
		var url = backpath.url+routeGet+'/'+userId;// URL where the Node.js server is running	
		var url_refresh_token=routeAuth;
		$http.get(url).success(function(data) {
			if (data.error=="token_lost"){
				var url = backpath.url+url_refresh_token+'/'+userId;
				$http.get(url).success(function(data) {
					if (data.url!=""){
						$window.location.href = data.url;
					}
				});
			} else {
				var arrMessages = new Array();
				var i=0;
				scope.mails = [];
				if (data.hasOwnProperty("messages")) {
					$(data.messages).each(function(index, element) {
						i=i+1;					
						var url = backpath.url+'getGMailMessage'+'/'+userId+"/"+element.id;
						$http.get(url).success(function(data) {	
							/*if (data.payload.parts){
								$.each(data.payload.parts, function(index,datos){
									if (datos.mimeType=="text/plain") {
									//if (datos.mimeType=="text/html") {
										var base64Url = datos.body.data;
										var sb64 = base64Url.replace('-','+').replace('_', '/');
										var bodyMail = base64.urldecode(base64Url);  
										data.bodyMail=bodyMail;
										
									}
								});
							} else {
								var base64Url = data.payload.body.data;
								var sb64 = base64Url.replace('-','+').replace('_', '/');
								var bodyMail = base64.urldecode(base64Url);  
								data.bodyMail=bodyMail;
							}*/
							
							scope.myVarMail = false;
							scope.mails.push(data);	
							scope.toggleMail = function() {
								scope["myVarMail"+this.$index] = !scope["myVarMail"+this.$index];
								 $.ajax({
									 type: "GET",
									 url: backpath.url+'getGMailMessage'+'/'+userId+"/"+this.mail.id,									 
									 success: function(data){
										 if (data.payload.parts){
											$.each(data.payload.parts, function(index,datos){
												if (datos.mimeType=="text/html") {
												//if (datos.mimeType=="text/html") {
													var base64Url = datos.body.data;
													var sb64 = base64Url.replace('-','+').replace('_', '/');
													var bodyMail = base64.urldecode(base64Url);  
													$("#bodyMessage").html(bodyMail)
													
												}
											});
										} else {
											var base64Url = data.payload.body.data;
											var sb64 = base64Url.replace('-','+').replace('_', '/');
											var bodyMail = base64.urldecode(base64Url);  
											$("#bodyMessage").html(bodyMail);
										}
										
										$("#divReadGmailMessage").modal('show'); 										
									 },
									 error: function(){
									 //alert("failure");
									 }
								 });
							};
							$("#divReadGmailMessage").find('.modal-dialog').css({
								  width:'50%'
							});
							$('#divReadGmailMessage').on('hidden.bs.modal', function () {
								$("#bodyMessage").html("");
							})
	
							
							$("#spinnerGmail").hide();																				
						});					
					});
				}
			}
		});
		
      
  }
});
