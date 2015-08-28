angular.module( 'ngBoilerplate.show-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'show-garden', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/foodscapes/:scapeId',
    views: {
      "main": {
        controller: 'ShowGardenCtrl',
        templateUrl: 'show-garden/show-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Show Garden' }
  });
})

.controller( 'ShowGardenCtrl', function ShowGardenCtrl( $scope, $http, $stateParams, $location ) {

  var scape_id = $stateParams.scapeId; //grabs the scape that we want

  var current_user; // inits a current_user variable so that we can use it outside the http request

// THIS IS TO PUT STUFF ON THE PAGE ///////////////////////////////////////

  //This request gets the information for this specific foodscape
  $http.get('/foodscapes/' + scape_id + '.json').then(function(response){

    var resData = response.data.foodscape;
    console.log("RESponse: ", response);

    //current_user is sent over when the page loads
    current_user = response.data.current_user;

    var usFoll = false;
    $scope.usersScape = false;
    $scope.userFollowing = false;
    $scope.userNotFollowing = false;
    $scope.showMessageButton = false;
    //AUTH STUFF
    console.log("here is the current user", current_user);
    if (current_user){
      console.log("The IDs, scape and then user ", resData.user_id , current_user.id);
      if(current_user.id == resData.user_id){
        $scope.usersScape = true;
      } else if(usFoll){//current_user is following the foodscape
        $scope.showMessageButton = true;
        $scope.userFollowing = true;
      } else{
        $scope.showMessageButton = true;
        $scope.userNotFollowing = true;
      }
    }

    //Loading foodscape data onto page//////////////////
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

    //Get correct username for this!!
    $scope.username = response.data.host.name;


    // Pulls from our random veggie pix
    $scope.profilePix = defaultProfilePhotos[randomNum];
    $scope.scapeName = resData.name;
    $scope.gardenImages = ["assets/images/Foodscape-DefaultPhoto-Cartoon.jpg"]
    // ["assets/images/community-1.jpeg","assets/images/community-3.jpeg"];
    // This stuff goes in the white box under the orange labels
    $scope.location = resData.city;

    var produce = angular.fromJson(resData.produce);
    // console.log("produce", produce);
    $scope.myProduce = [];
    for(var i = 0; i < 5; i++){
      if(produce[i].selected == "selected"){
        var theText = produce[i].type;
        $scope.myProduce.push(theText);
      }
    }

    $scope.extraProduce = (produce[5])? produce[5].growingText : "";

    // $scope.goalsAndNeeds = resData.goalsneeds;
    $scope.otherDetails = resData.other_details;

  }, function(response){
    console.log("nope");
    //Need to add error handling here
  });


  // Get updates and put them on the page. This is in a function cause it needs to run again after we post.
  var pullUpdates = function(){
    $http.get("/foodscapes/" + scape_id + "/updates.json").then(function(response){
        // console.log("UPDATE RESPONSE ", response);
        var upData = response.data;
        // console.log("updates: ", upData);
        var updateArray = [];
        // Backwards to put the updates in reverse chron order
        for(var i = upData.length-1; i > -1; i--){
          var date = upData[i].created_at;
          var year = date.slice(0,4);
          var month = date.slice(5,7);
          var day = date.slice(8,10);
          updateArray.push({"date" : day + "/" + month + "/" + year,
                            "content": upData[i].description});
        }

      $scope.updates = updateArray;
      $scope.statusBar = updateArray[0].content;
        }, function(response){
      console.log("no updates");
    });
  }
  // Pulls updates when the page loads
  pullUpdates();


////////// END GET REQUESTS TO PUT THINGS ON SHOW PAGE //////////////

  var defaultProfilePhotos = ["assets/images/default_profile_pix/profileicon-watermelon.png",
                              "assets/images/default_profile_pix/profileicon-lemon.png",
                              "assets/images/default_profile_pix/profileicon-eggplant.png",
                              "assets/images/default_profile_pix/profileicon-carrot.png"];
  var randomNum = Math.floor((Math.random() * 4));
                  // }];


/////////////// MAILER FOR UPDATES /////////////////////
// start Mandrill API function and params
      // Create a function to log the response from the Mandrill API
      // function log(obj) {
      //     $('#response').text(JSON.stringify(obj));
      // }

      // create a new instance of the Mandrill class with your API key
  var m = new mandrill.Mandrill('55zOecDadI2ajt-66mNoXQ');

      // create a variable for the API call parameters

  var makeUpdateEmail = function(update){
    var userName = current_user.name;
    console.log("makeUpdateEmail username:: ", userName);
    //
    var params = {
        "message": {
            "from_email":"admin@myfoodscape.com",
            "to":[{"email":"iring.ma@gmail.com"},{"email":"grace.yasukawa@gmail.com"},{"email":"allxiecleary@gmail.com"}], // This needs to be subscribers
            "subject": "Update from " + userName + "'s Foodscape",
            "html": "<h4>You have an update from " + userName + "'s Foodscape</h4><p>" + update + "</p><br>Please visit the <a href='http://myfoodscape.com'>foodscape</a> to see more details</br>",//I'm going to actually put the link to the foodscape in the email
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


// ///////end Mandrill mailer API stuff //////

  // Add posting updates
  $scope.postIt = function(post){
    console.log("trying to work ", scape_id);

    if (post.text != ""){
      var data = {update: {
        "foodscape_id": Number(scape_id),
                          "description": post.text
                  }};

      var updateMessage = makeUpdateEmail(post.text);
      sendTheMail(updateMessage);

      $http({
          url: "/foodscapes/" + Number(scape_id) + "/updates.json",
          method: "POST",
          data: data
      }).success(function(data, status, headers) {
          $scope.data = data;
          $scope.update.text = "";
          pullUpdates();
          // $scope.$apply(function() { $location.path("/new-garden"); });
      }).error(function(data, status, headers) {
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
  //this opens a messsage box
  $scope.message = function(){
    $scope.toggleModal();
    $scope.showMessage = true;
    console.log("show message ", $scope.showMessage);
  };
  // for the message box to show the already sent thank you message
  $scope.send = function(messageText){
    // This is where the message is put together and then actually sent
    var messageParams = makeMessageEmail(messageText);
    sendTheMail(messageParams);
    //and then show the thank you box.
    $scope.showMessage = false;
    $scope.sent = true;
  };

////// This shows up to confirm that you've followed someone
  $scope.follow = function (){
    $scope.toggleModal();
    $scope.showFollow = true;

    //this is the data to send when following someone
    // var data = {
    //   subscriptions : {
    //   // "foodscape": scape_id
    //   "foodscape_id": Number(scape_id),
    //   "user_id": Number(current_user.id)
    //   }
    // };

    ///the follow post request
    $http({
          url: "/foodscapes/" + Number(scape_id) + "/follow.json",
          method: "POST"
          // data: data
      }).success(function( status, headers) {
          // $scope.data = data;
      }).error(function( status, headers) {
          $scope.error_message = true;
          $scope.status = status;
      }); //end follow post
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






}) // end controller

;
