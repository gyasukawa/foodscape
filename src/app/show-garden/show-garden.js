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

.controller( 'ShowGardenCtrl', function ShowGardenCtrl( $scope, $http ) {

// THIS IS TO PUT STUFF ON THE PAGE ///////////////////////////////////////
  $http.get('/foodscapes/9.json').then(function(response){

    var resData = response.data;

    console.log("worked: ", response);

    var goalsAndNeeds = angular.fromJson(resData.goalsneeds);
    $scope.myGoals = [];
    for(var i = 0; i < 4; i++){
      if(goalsAndNeeds[i].bool){
        var theText = goalsAndNeeds[i].text;
        theText = theText.toLowerCase();
        $scope.myGoals.push(theText);
      }
    }
    $scope.extraGoal = goalsAndNeeds[4].text;

    // Pulls from our random veggie pix
    $scope.profilePix = defaultProfilePhotos[randomNum];
    $scope.scapeName = resData.name;
    $scope.status = "Hello from the show-garden.js. This will be a status message."; // Is this the most recent update?
    $scope.username = "Mary L."; // this needs the username of the person who runs it
    $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];
    // This stuff goes in the white box under the orange labels
    $scope.location = resData.city;

    var produce = angular.fromJson(resData.produce);
    $scope.myProduce = [];
    for(var i = 0; i < 5; i++){
      if(produce[i].selected == "selected"){
        var theText = produce[i].type;
        $scope.myProduce.push(theText);
      }
    }

    $scope.extraProduce = produce[5].growingText;
    // $scope.goalsAndNeeds = resData.goalsneeds;
    $scope.otherDetails = resData.other_details;
    $scope.updates = [{
                        "date": "4/15/15"
                      , "content": "Watered today."
                      }
                      ,{
                        "date": "5/30/15"
                      , "content": "I planted tomatoes!"
                      }];
  }, function(response){
    console.log("nope");
  });
////////// END GET REQUEST TO PUT THINGS ON SHOW PAGE //////////////

  var defaultProfilePhotos = ["assets/images/default_profile_pix/profileicon-watermelon.png",
                              "assets/images/default_profile_pix/profileicon-lemon.png",
                              "assets/images/default_profile_pix/profileicon-eggplant.png",
                              "assets/images/default_profile_pix/profileicon-carrot.png"];
  var randomNum = Math.floor((Math.random() * 4));
                  // }];


  // Add posting updates
  $scope.postIt = function(post){
    console.log("trying to work");

    if (post.text != ""){
      var data = {update: {"foodscape_id": "id",
                          "text": post.text
                  }};

      console.log("This is what I passed through! Aren't you proud? ", data);

      $http({
          url: "/updates.json",
          method: "POST",
          data: data
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          // $scope.$apply(function() { $location.path("/new-garden"); });
      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
          $scope.status = status;
      });
    }
  }

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






}) // end controller

;
