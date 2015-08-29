angular.module( 'ngBoilerplate.following', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'following', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/subscriptions',
    views: {
      "main": {
        controller: 'FollowingCtrl',
        templateUrl: 'following/following.tpl.html'
      }
    },
    data:{ pageTitle: 'Following' }
  });

})

.controller( 'FollowingCtrl', function FollowingCtrl( $http, $scope ) {


  $scope.checkAuth = function(){
    $http.get('/the_current_user.json').then(
        function(response){
          console.log("current user from following", response);
          $scope.current_user = response.data;
          $scope.loadFollowing();

        }, function(response){
        console.log("nope from app.js current user ", response);
        $scope.current_user = null;
      });
  }


  $scope.foodscapes = [];
  $scope.loadFoodscapeData = function(subscriptionData){
    for(var i = 0; i < subscriptionData.subscriptions.length; i++){
      var scape_id = subscriptionData.subscriptions[i].foodscape_id;
      $scope.host_name = subscriptionData.hosts[i].name; // don't need this yet.
      $http({
              url: "/foodscapes/" + scape_id + ".json",
              method: "GET",
              data: {}
          }).success(function(data, status, headers) {
             console.log("following scape data ", data);
             var resData = data.foodscape;
             var followedScape = {
              "title": resData.name
              ,"location": resData.city
              ,"status": "soon..."
              ,"img":"./assets/images/community-2.png"
              ,"url":"/UI/index.html#/foodscapes/" + scape_id
              }
             $scope.foodscapes.push(followedScape);


              // $scope.data = data;
              // $scope.$apply(function() { $location.path("/new-garden"); });
          }).error(function(data, status, headers) {
              // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
              $scope.status = status;
          });
    }
  }
  $scope.loadFollowing = function(){
    var user_id = $scope.current_user.id;
    $http({
            url: "/users/" + user_id + "/following.json",
            method: "GET",
            data: {}
        }).success(function(data, status, headers) {
           console.log("following data ", data);

            $scope.loadFoodscapeData(data);
            // $scope.data = data;
            // $scope.$apply(function() { $location.path("/new-garden"); });
        }).error(function(data, status, headers) {
            // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
            $scope.status = status;
        });
    }

  $scope.checkAuth();

  // console.log("Following current user", $scope.current_user);

  // This is a function to load the actual foodscape data
  // THIS NEEDS TO BE TRANSFERRED TO THE BACKEND!
  // This is extremely inefficient.

  


  // $scope.foodscapes = [{
  //           "title": "Mary's Foodscape"
  //           ,"location": "San Jose"
  //           ,"status":"I watered my tomatoes"
  //           ,"img":"./assets/images/community-2.png"
  //           }
  //           ,{
  //           "title": "Sarah's Foodscape"
  //           ,"location": "San Francisco"
  //           ,"status":"Just dug a big hole"
  //           ,"img":"./assets/images/community-3.jpeg"
  //           }];

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
  };
    // for the message box to show the already sent thank you message
  $scope.send = function(){
    $scope.showMessage = false;
    $scope.sent = true;
  };


  //////// This shows up to ask if you're sure you want to unfollow someone
  $scope.unfollowConfirm = function(){
    $scope.toggleModal();
    $scope.unfollowConfirmBox = true;
  };
////////// This confirms that you have actually unfollowed them.
  $scope.unfollow = function(){
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = true;
  };
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
