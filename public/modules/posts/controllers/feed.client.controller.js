'use strict';

angular.module('posts').controller('FeedController',[
	'$scope','$window','Authentication','$http',
	function($scope,$window,Authentication,$http){
		  $scope.postSubject = undefined;
		$scope.allsubject=[
		{
			name : 'Art Sci'
		},
		{
			name : 'Philos'
			
		},
		
		

		];
		$http.get('/subjects/allsubject')
		.success(function(response){
			
			$scope.allsubject = response;
		})
		.error(function(response){
			$scope.error = response.message;
		});
		$scope.profile={
			name : Authentication.user.displayName,
			screenName: Authentication.user.username,
			postCount : 0,
			favourite : 0
		};

		$http.get('/statuses/is_liked_post')
		.success(function(response){
			$scope.isLikedPostRes = response;
		})
		.error(function(response){
			$scope.error = response.message;
		});
		

		$http.get('/statuses/feed_timeline')
		.success(function(response){
			$scope.timeline = response;
		})
		.error(function(response){
			$scope.error = response.message;
		});


		$scope.postPost = function(postContent, name ,screenName,postSubject,postType,postCat){
			
			$http.post('/statuses/update',{
				name:name,
				screenName:screenName,
				postContent:postContent,
				postSubject:postSubject,
				postType:postType,
				postCat:postCat,
				rating : 0,
				postTime: new Date()})
			.success(function(response){
				$scope.postContent ='';
				$scope.postSubject ='';
				$scope.postType ='';
				$scope.postCat ='';


				$http.get('/statuses/feed_timeline')
		.success(function(response){
			$scope.timeline = response;
		})
		.error(function(response){
			$scope.error = response.message;
		});
		$scope.profile={
			name : Authentication.user.displayName,
			screenName: Authentication.user.username,
			postCount : 30,
			favourite : 20
		};
			})
			.error(function(response){
				$scope.error= response.message;
			});
			
		};


		$scope.deletePost = function(_id){

			$http.post('/statuses/delete_post',{
				_id:_id
			})
			.success(function(response){
				$scope.postContent ='';
				$scope.postSubject ='';
				$scope.postType ='';
				$scope.postCat ='';

				$http.get('/statuses/feed_timeline')
		.success(function(response){
			$scope.timeline = response;
		})
		.error(function(response){
			$scope.error = response.message;
		});
		$scope.profile={
			name : Authentication.user.displayName,
			screenName: Authentication.user.username,
			postCount : 30,
			favourite : 20
		};
			})
			.error(function(response){
				$scope.error2= response.message;
			});
			
		};


		$scope.likePost = function(_id){

			$http.post('/statuses/like_post',{
				_id:_id
			})
			.success(function(response){
				$scope.postContent ='';
				$scope.postSubject ='';
				$scope.postType ='';
				$scope.postCat ='';

					$http.get('/statuses/is_liked_post')
					.success(function(response){
						$scope.isLikedPostRes = response;
					})
					.error(function(response){
						$scope.error = response.message;
					});

					$http.get('/statuses/feed_timeline')
					.success(function(response){
						$scope.timeline = response;
					})
					.error(function(response){
						$scope.error = response.message;
					});
					$scope.profile={
						name : Authentication.user.displayName,
						screenName: Authentication.user.username,
						postCount : 30,
						favourite : 20
					};
			})
			.error(function(response){
				$scope.error2= response.message;
			});
			
		};



		$scope.unlikePost = function(_id){

			$http.post('/statuses/unlike_post',{
				_id:_id
			})
			.success(function(response){
				$scope.postContent ='';
				$scope.postSubject ='';
				$scope.postType ='';
				$scope.postCat ='';

				$http.get('/statuses/is_liked_post')
				.success(function(response){
					$scope.isLikedPostRes = response;
				})
				.error(function(response){
					$scope.error = response.message;
				});

				$http.get('/statuses/feed_timeline')
				.success(function(response){
					$scope.timeline = response;
				})
				.error(function(response){
					$scope.error = response.message;
				});	
				$scope.profile={
					name : Authentication.user.displayName,
					screenName: Authentication.user.username,
					postCount : 30,
					favourite : 20
				};
			})
			.error(function(response){
				$scope.error2= response.message;
			});
			
		};




			$scope.totalDisplayed = 10;
			$scope.loadMore = function () {
 			$scope.totalDisplayed += 5;  
 			
				};
		
		 $(window).scroll(function() {   
   		if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
       $scope.loadMore();
  		 }
		});
	}

	]);

angular.module('posts').directive('reachedToBottom', function($window, $document){
    return{
        link: function(scope, element, attrs){
            element.on('scroll', function(){
                if(element[0].scrollTop + element.innerHeight() == element[0].scrollHeight){
                    scope.$eval(attrs.reachedToBottom);
                }
            })
        }
    }
});

angular.module('posts').directive('scrollTrigger', function($window) {
    return {
        link : function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
});

