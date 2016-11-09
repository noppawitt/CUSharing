'use strict';

angular.module('posts').controller('MeController',[
	'$scope',
	'Authentication',
	'$http',
	function($scope,Authentication,$http){
		$scope.profile={
			name : Authentication.user.displayName,
			screenName: Authentication.user.username,
			postCount : 0,
			favourite : Authentication.user.likedPost.length,
		};

		$http.get('/statuses/me_timeline')
		.success(function(response){
			$scope.posts = response;
		})

		/*
		$http.get('/statuses/liked_timeline')
		.success(function(response){
			$scope.likedPosts = response
		})
		*/

		.error(function(response){
			$scope.error = response.message;
		});
		
	}

	]);