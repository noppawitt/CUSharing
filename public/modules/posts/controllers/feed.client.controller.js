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
		

		$http.get('/statuses/feed_timeline')
		.success(function(response){
			$scope.timeline = response;

			$http.get('/statuses/is_liked_post')
			.success(function(response2){
				var likedPostList = response2;
				var postList = response;
				//console.log(postList[0].screenName);
				//console.log(likedPostList);
				//$scope.isLiked = {};
				$scope.likeTxt = [];
				$scope.likeCount = [];
				for(var i = 0;i<postList.length;i++){
					$scope.likeCount[postList[i]._id] = postList[i].likeCount;
					if(likedPostList.indexOf(postList[i]._id)>=0){
						//isLiked[postList._id] = true;
						$scope.likeTxt[postList[i]._id] = 'Unlike';
					}
					else{
						//isLiked[postList._id]= false;
						$scope.likeTxt[postList[i]._id] = 'Like';
					}
				}
			})
		.error(function(response){
			$scope.error = response.message;
		});
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
			console.log('GG');

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
			if($scope.likeTxt[_id] == 'Like'){
				$scope.likeTxt[_id] = 'Unlike';
				$scope.likeCount[_id]++;
				//$scope.isLiked[_id] = true;
				$http.post('/statuses/like_post',{
					_id:_id
				})
				.error(function(response){
					$scope.error2= response.message;
				});
			}
			else{
				$scope.likeTxt[_id] = 'Like';
				$scope.likeCount[_id]--;
				//$scope.isLiked[_id] = false;
				$http.post('/statuses/unlike_post',{
					_id:_id
				})
				.error(function(response){
					$scope.error2= response.message;
				});
			}
			
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

