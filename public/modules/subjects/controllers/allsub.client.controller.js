'use strict';

angular.module('subjects').controller('allsubController',[
	'$scope','$window','Authentication','$http',
	function($scope,$window,Authentication,$http){
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
			 $scope.totalItems = $scope.allsubject.length;
		})
		.error(function(response){
			$scope.error = response.message;
		});
		
 $scope.viewby = 10;
  $scope.totalItems = $scope.allsubject.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };
$scope.plus = function() {
	if($scope.currentPage!=$scope.numberOfPages)
    $scope.currentPage++;
  };
  $scope.minus = function() {
    if($scope.currentPage!=1)$scope.currentPage--;
  };
$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
  $scope.numberOfPages = Math.floor(($scope.totalItems/$scope.itemsPerPage)+1);
}
$scope.numberOfPages = Math.floor(($scope.totalItems/$scope.itemsPerPage)+1);

         $scope.search   = ''; 


		$scope.createSubject = function( name ){
			
			$http.post('/subjects/update',{
				name:name})
			.success(function(response){
				$http.get('/subjects/allsubject')
		.success(function(response){
			$scope.allsubject = response;
			 $scope.totalItems = $scope.allsubject.length;
		})
		.error(function(response){
			$scope.error = response.message;
		});
			
				$scope.subjectName ='';
				$scope.totalItems = $scope.allsubject.length;
			$scope.numberOfPages = Math.floor(($scope.totalItems/$scope.itemsPerPage)+1);
			})
			.error(function(response){
				$scope.error= response.message;
			});

			
			
		};

		
}

		]);