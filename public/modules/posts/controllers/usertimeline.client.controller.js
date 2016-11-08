'use strict';

angular.module('posts').controller('UserTimelineController',[
	'$scope',
	'$http',
	'$stateParams',
	function($scope,$http,$stateParams){
		$scope.hisname ='';
		$http.get('/statuses/user_timeline/'+$stateParams.username)
		.success(function(response){
			$scope.posts = response;
		})
		.error(function(response){
			$scope.error = response.message;

		});
		$scope.profile ={
			name : $scope.screenName,
			screenName: $stateParams.username,
			postCount : 0,
			favourite : 0

		};

		

	}



	]);