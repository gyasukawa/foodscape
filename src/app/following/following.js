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

  // All to do with modals
  $scope.sent = false;
  $scope.showFollow = false;
  $scope.showMessage = false;
  $scope.showFollow = false;
  $scope.unfollowConfirmBox = false;
  $scope.unfollowedMessage = false;


/////// This is for when you want to send a message
  $scope.message = function(){
    $scope.toggleModal();
    $scope.showMessage = true;
    console.log("show message ", $scope.showMessage);
  }
    // for the message box to show the already sent thank you message
  $scope.send = function(){
    $scope.showMessage = false;
    $scope.sent = true;
  }
////// This shows up to confirm that you've followed someone
  $scope.follow = function (){
    $scope.toggleModal();
    $scope.showFollow = true;
  }

  //////// This shows up to ask if you're sure you want to unfollow someone
  $scope.unfollowConfirm = function(){
    $scope.toggleModal();
    $scope.unfollowConfirmBox = true;
  }
////////// This confirms that you have actually unfollowed them.
  $scope.unfollow = function(){
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = true;
  }
  // Lightbox stuff -- there is a custom directive for the lightbox in app.js
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    console.log("toggling modal");
    $scope.modalShown = !$scope.modalShown;
    $scope.sent = false;
    $scope.showFollow = false;
    $scope.showMessage = false;
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = false;
  };

  //  End modals!

})

;
