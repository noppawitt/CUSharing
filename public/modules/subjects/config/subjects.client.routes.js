'use strict';

angular.module('subjects').config([
	'$stateProvider',
	function($stateProvider){
		$stateProvider
		.state('one', {
			url : '/s/:subject',
			templateUrl : 'modules/subjects/views/onesub.client.view.jade'
			})
		.state('all', {
			url : '/all',
			templateUrl : 'modules/subjects/views/allsub.client.view.jade'
			});
		}
])
.run([
	'$rootScope',
	'$state',
	'Authentication',
	function($rootScope,$state,Authentication){
			$rootScope.$on('$stateChangeStart',function(event, toState,toParams,fromState,fromParams){
					if(((toState.name!=='signup')&&(toState.name!=='signin'))&&!Authentication.user){
						event.preventDefault();
						$state.go('signup');
						}
				});
		}

]);