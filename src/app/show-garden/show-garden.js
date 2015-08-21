angular.module( 'ngBoilerplate.show-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'show-garden', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/show-garden',
    views: {
      "main": {
        controller: 'ShowGardenCtrl',
        templateUrl: 'show-garden/show-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Show Garden' }
  });
})

.controller( 'ShowGardenCtrl', function ShowGardenCtrl( $scope ) {


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


  var defaultProfilePhotos = ["assets/images/default_profile_pix/profileicon-watermelon.png",
                              "assets/images/default_profile_pix/profileicon-lemon.png",
                              "assets/images/default_profile_pix/profileicon-eggplant.png",
                              "assets/images/default_profile_pix/profileicon-carrot.png"];
  var randomNum = Math.floor((Math.random() * 4));
  // Profile page info
  $scope.profilePix = defaultProfilePhotos[randomNum];
  $scope.scapeName = "Mary's NEW Foodscape";
  $scope.status = "Hello from the show-garden.js. This will be a status message.";
  $scope.username = "Mary L.";
  $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];
  // This stuff goes in the white box under the orange labels
  $scope.location = "The Sunset, San Francisco, CA";
  $scope.produce = "veggies, fruites, etc.";
  $scope.goalsAndNeeds = "I need a hoe. I'm going to build a planter box.";
  $scope.otherDetails = "I have a friendly dog.";
  $scope.updates = [{
                      "date": "4/15/15"
                    , "content": "Watered today."
                    }
                    ,{
                      "date": "5/30/15"
                    , "content": "I planted tomatoes!"
                    }];

})

;
