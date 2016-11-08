'use strict';

angular.module('posts').controller('OneSubController',[
	'$scope',
	'$http',
	'$stateParams',
	function($scope,$http,$stateParams){
		

		$http.get('/statuses/subject_timeline/'+$stateParams.subject)
		.success(function(response){
			$scope.posts = response;
		})
		.error(function(response){
			$scope.error = response.message;

		});

		$http.get('/subjects/onesubject/'+$stateParams.subject)
		.success(function(response){
			$scope.subjectname = response.name;
		})
		.error(function(response){
			$scope.error = response.message;
		});
			

	}



	]);