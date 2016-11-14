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
		.error(function(response){
			$scope.error = response.message;
		});

		$scope.removePost = function(_id){
			$http.post('/statuses/remove_post',{
				_id:_id
			})
			.success(function(response){
				$http.get('/statuses/me_timeline')
				.success(function(response){
					$scope.posts = response;
				})
				.error(function(response){
					$scope.error = response.message;
				});
			})
			.error(function(response){
				$scope.error = response.message;
			});
		};

		$scope.totalDisplayed = 10;
			$scope.loadMore = function () {
 				$scope.totalDisplayed += 5;  
 			
			};
		
	}

	]);