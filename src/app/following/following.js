angular.module( 'ngBoilerplate.following', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'following', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/following',
    views: {
      "main": {
        controller: 'FollowingCtrl',
        templateUrl: 'following/following.tpl.html'
      }
    },
    data:{ pageTitle: 'Following' }
  });
})

.controller( 'FollowingCtrl', function FollowingCtrl( $scope ) {
	$scope.foodscapes = [{
						"title": "Mary's Foodscape"
						,"location": "San Jose"
						,"status":"I watered my tomatoes"
						,"img":"./assets/images/community-2.png"
						}
						,{
						"title": "Sarah's Foodscape"
						,"location": "San Francisco"
						,"status":"Just dug a big hole"
						,"img":"./assets/images/community-3.jpeg"
						}];

})

;
