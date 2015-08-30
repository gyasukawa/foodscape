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
              ,"status": $scope.host_name //this is the host name, not the status. Duh. Needs to be changed eventually after we don't need another get request to do it.
              ,"img":"./assets/images/community-2.png"
              ,"url":"/UI/index.html#/foodscapes/" + scape_id
              , "scape_id": scape_id
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


  $scope.messageRecipient = null;
/////// This is for when you want to send a message
  $scope.message = function(scapeHost){
    $scope.messageRecipient = scapeHost;

    $scope.toggleModal();
    $scope.showMessage = true;
    $scope.toScapeHost = scapeHost;
    console.log("show message ", $scope.showMessage);
  };
    // for the message box to show the already sent thank you message
  $scope.send = function(){
    var messageParams = makeMessageEmail(messageText);
    sendTheMail(messageParams);

    $scope.showMessage = false;
    $scope.sent = true;
  };


  //////// This shows up to ask if you're sure you want to unfollow someone
  $scope.unfollow_id = null;
  $scope.unfollowConfirm = function(foodscape){
    console.log(foodscape.scape_id);
    $scope.toggleModal();
    $scope.unfollowConfirmBox = true;
    $scope.unfollow_id = foodscape.scape_id;
  };
////////// This confirms that you have actually unfollowed them. -- you actually unfollow them in here
  $scope.unfollow = function(){
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = true;
    //actually unfollows
    $http({
          url: "/foodscapes/" + $scope.unfollow_id + "/unfollow.json",
          method: "DELETE",
          data: {}
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          console.log("Successfully unfollowed")
          // $scope.$apply(function() { $location.path("/new-garden"); });
          $window.location.href = '/UI/index.html#/login';
      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
      }); // end delete request

  }; // end unfollow
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


  // MESSAGE STUFF

  var m = new mandrill.Mandrill('55zOecDadI2ajt-66mNoXQ');

  var makeMessageEmail = function(message){
    var userName = current_user.name;
    console.log("makeMessageEmail username:: ", userName);
    //
    var params = {
        "message": {
            "from_email":"admin@myfoodscape.com",
            "to":[{"email":"iring.ma@gmail.com"},{"email":"grace.yasukawa@gmail.com"},{"email":"allxiecleary@gmail.com"}], // This needs to be subscribers
            "subject": "Message from " + userName+"!",
            "html": "<h4>You have message from " + userName + ".</h4><p>" + message + "</p><br> You can reply using their email (for now): <a href='"+ current_user.email +"'>foodscape</a></br>",//I'm going to actually put the link to the foodscape in the email
            "autotext": true,
            "track_opens": true,
            "track_clicks": true,
            "merge_vars": [{
                "rcpt": "iring.ma@gmail.com",
                "vars": [
                            {
                            "name": "HOST",
                            "content": "Mary"
                            },
                            {
                            "name": "NAME",
                            "content": "Irene"
                            }
                        ]
                },
                {
                "rcpt": "grace.yasukawa@gmail.com",
                "vars": [
                            {
                            "name": "HOST",
                            "content": "Mary"
                            },
                            {
                            "name": "NAME",
                            "content": "Grace"
                            }
                        ]
                }
                ]
        }
    };
    console.log("PARAMS:: ", params);
    return params;
  } // end makeUpdateEmail function

  function sendTheMail(params) {
  // Send the email!

      m.messages.send(params, function(res) {
          console.log("email response, " , res);
      }, function(err) {
          console.log("error:: ", err);
      });
  }

}) // end controller

;
