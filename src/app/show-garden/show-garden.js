/*global $ */
angular.module( 'ngBoilerplate.show-garden', [
  'ui.router',
  'ui.bootstrap',
  'angular-carousel',
  'angularPayments'
])

.config(function config( $stateProvider) {
  $stateProvider.state( 'show-garden', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/foodscapes/:scapeId',
    views: {
      "main": {
        controller: 'ShowGardenCtrl',
        templateUrl: 'show-garden/show-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Foodscape' }
  });
})

.controller( 'ShowGardenCtrl', function ShowGardenCtrl( $scope, $http, $stateParams, $location, $window ) {


  var scape_id = $stateParams.scapeId; //grabs the scape that we want

  var current_user; // inits a current_user variable so that we can use it outside the http request

  $scope.followerEmails = [];

// THIS IS TO PUT STUFF ON THE PAGE ///////////////////////////////////////

  //This request gets the information for this specific foodscape
  $http.get('/foodscapes/' + scape_id + '.json').then(function(response){

    $scope.hostEmail = response.data.host.email;

    var resData = angular.fromJson(response.data.foodscape);
    console.log("Response: ", response);
    // console.log("ResData: ", resData);

    for(var i = 0; i < response.data.followers.length; i++){
      $scope.followerEmails.push({"email" : response.data.followers[i].email});
    }

    //current_user is sent over when the page loads
    current_user = response.data.current_user;


    var usFoll = response.data.following;
    $scope.usersScape = false;
    $scope.userFollowing = false;
    $scope.userNotFollowing = true;
    $scope.showMessageButton = false;
    //AUTH STUFF
    // console.log("here is the current user", current_user);
    if (current_user){
      // console.log("The IDs, scape and then user ", resData.user_id , current_user.id);
      if(current_user.id == resData.user_id){
        $scope.usersScape = true;
        $scope.userNotFollowing = false;
      } else if(usFoll){//current_user is following the foodscape
        $scope.showMessageButton = true;
        $scope.userFollowing = true;
        $scope.userNotFollowing = false;
      } else{
        $scope.showMessageButton = true;
      }
    }

    //Loading foodscape data onto page//////////////////
    var goalsAndNeeds = angular.fromJson(resData.goalsneeds);
    // console.log("PLEASE WORK", goalsAndNeeds);
    $scope.myGoals = [];
    // if(goalsAndNeeds){
      for(var i = 0; i < 4; i++){
        if(goalsAndNeeds[i].bool){
          var theText = goalsAndNeeds[i].text;
          theText = theText.toLowerCase();
          $scope.myGoals.push(theText);
        }
      }
    // }
    $scope.extraGoal = goalsAndNeeds[4] ? goalsAndNeeds[4].text : "";


    $scope.username = response.data.host.name;


    // Pulls from our random veggie pix
    // console.log("avatar url maybe ", response.data.host.avatar_url);
    $scope.avatarUrl = (response.data.host.avatar_url != "/images/original/missing.png")? response.data.host.avatar_url : $scope.avatarUrl = defaultProfilePhotos[randomNum]; //change to current_user.avatar_file_name with any other S3 specifications
    $scope.scapeName = resData.name;

    $scope.gardenImages = ["assets/images/Foodscape-DefaultPhoto-Cartoon.jpg"];



  var pullPhotos = function(){ // take this out of the greater function
      $http.get("/foodscapes/" + scape_id + "/pictures.json").then(function(response){
          // console.log("PICTURES RESPONSE ", response);
          var upData = response.data;
          // console.log("updates: ", upData);
          $scope.gardenImages = [];
          // Backwards to put the updates in reverse chron order
          for(var i = upData.length-1, eqPosition = 0; i > -1; i--, eqPosition++){
            var widthBool = true;
            // $scope.gardenImages.push(upData[i].image_url);
            $scope.gardenImages.push({"url" : upData[i].image_url,
              "id": i, "wide": widthBool });

          }

        if ($scope.gardenImages.length == 0){
          $scope.gardenImages = [{"url": "assets/images/Foodscape-DefaultPhoto-Cartoon.jpg", "wide" : true}];
        }
        $scope.carouselIndex = 0;
        $scope.slides = $scope.gardenImages;


        // $scope.updates = updateArray;
        // if(updateArray[0]){
        //   $scope.statusBar = updateArray[0].content;
        // }
      }, function(response){
        // console.log("no photos");
        $scope.gardenImages = ["assets/images/Foodscape-DefaultPhoto-Cartoon.jpg"];
      });

  }// end pull updates function
  pullPhotos();

  $scope.imgClass = function(image){
    return gardenImages.wide;

    // ng-class="{gardenImage.wide ? 'wide-image' : 'tall-image'}"
  }




// DEFAULT ROTATING PHOTO
    //["assets/images/Foodscape-DefaultPhoto-Cartoon.jpg"]
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
    // console.log("nope");
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
      if(updateArray[0]){
        $scope.statusBar = updateArray[0].content;
      }
    }, function(response){
      console.log("no updates");
    });
  }// end pull updates function
  // Pulls updates when the page loads
  pullUpdates();

    // PULL PHOTOS
  // var pullPhotos = function(){
  //   $http.get("/foodscapes/" + scape_id  + "/pictures/1.json").then(function(response){
  //       console.log(" IMAGE RESPONSE ", response);
  //       // var image = response.data;

  //   }, function(response){
  //     console.log("no updates");
  //   });
  // } //end pull photos
  // pullPhotos();


////////// END GET REQUESTS TO PUT THINGS ON SHOW PAGE //////////////

  var defaultProfilePhotos = ["assets/images/default_profile_pix/profileicon-watermelon.png",
                              "assets/images/default_profile_pix/profileicon-lemon.png",
                              "assets/images/default_profile_pix/profileicon-eggplant.png",
                              "assets/images/default_profile_pix/profileicon-carrot.png"];
  var randomNum = Math.floor((Math.random() * 4));
                  // }];

$scope.edit = function(){
  // console.log("I'm clicking edit ", scape_id);
  $window.location.href = '/UI/index.html#/foodscapes/edit/' + scape_id;

}

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
            "to":$scope.followerEmails, // This needs to be subscribers
            "subject": "Update from " + userName + "'s Foodscape",
            "html": "<h4>You have an update from " + userName + "'s Foodscape</h4><p>" + update + "</p><br>Please visit the <a href='http://myfoodscape.com'>foodscape</a> to see more details</br>",//I'm going to actually put the link to the foodscape in the email
            "autotext": true,
            "track_opens": true,
            "track_clicks": true //,
            // "merge_vars": [{
            //     "rcpt": "iring.ma@gmail.com",
            //     "vars": [
            //                 {
            //                 "name": "HOST",
            //                 "content": "Mary"
            //                 },
            //                 {
            //                 "name": "NAME",
            //                 "content": "Irene"
            //                 }
            //             ]
            //     },
            //     {
            //     "rcpt": "grace.yasukawa@gmail.com",
            //     "vars": [
            //                 {
            //                 "name": "HOST",
            //                 "content": "Mary"
            //                 },
            //                 {
            //                 "name": "NAME",
            //                 "content": "Grace"
            //                 }
            //             ]
            //     }
            //     ]
        }
    };
    console.log("PARAMS:: ", params);
    return params;
  } // end makeUpdateEmail function

  var makeMessageEmail = function(message){
    var userName = current_user.name;
    // console.log("makeMessageEmail username:: ", userName);
    //
    // console.log("current user email", current_user.email);
    var params = {
        "message": {
            "from_email":"admin@myfoodscape.com",
            "to":[{"email": $scope.hostEmail}], // This needs to be subscribers
            "subject": "Message from " + userName+"!",
            "html": "<h4>You have message from " + userName + ".</h4><p>" + message + "</p><br> You can reply using their email (for now): <a href='"+ current_user.email +"'>" + current_user.email + "</a></br>",
            "autotext": true,
            "track_opens": true,
            "track_clicks": true //,
            // "merge_vars": [{
            //     "rcpt": "iring.ma@gmail.com",
            //     "vars": [
            //                 {
            //                 "name": "HOST",
            //                 "content": "Mary"
            //                 },
            //                 {
            //                 "name": "NAME",
            //                 "content": "Irene"
            //                 }
            //             ]
            //     },
            //     {
            //     "rcpt": "grace.yasukawa@gmail.com",
            //     "vars": [
            //                 {
            //                 "name": "HOST",
            //                 "content": "Mary"
            //                 },
            //                 {
            //                 "name": "NAME",
            //                 "content": "Grace"
            //                 }
            //             ]
            //     }
            //     ] allxiecleary@gmail.com,grace.yasukawa@gmail.com,iring.ma@gmail.com
        }
    };
    // console.log("PARAMS:: ", params);
    return params;
  } // end makeUpdateEmail function

  var makeShareEmail = function(emails, message){

    var emailArray = emails.split(",");
    // console.log("email array, pre objectification: ", emailArray);
    var emailParams = [];
    for(var i = 0; i < emailArray.length; i++){
      emailParams.push({"email" : emailArray[i]});
    }

    // console.log("Here are the email addresses", emailParams);

    var userName = current_user.name;
    // console.log("makeMessageEmail username:: ", userName);
    //
    // console.log("current user email", current_user.email);
    var params = {
        "message": {
            "from_email":"admin@myfoodscape.com",
            "to": emailParams, //hopefully what the user passed in.
            "subject":  userName + " shared a foodscape with you!",
            "html": "<h4>" + userName + " shared the foodscape " + $scope.scapeName + ".</h4><p>" + message + "</p><br> Check it out here: <a href='" + window.location.href + "'>" + $scope.scapeName + "</a></br>",
            "autotext": true,
            "track_opens": true,
            "track_clicks": true
        }
    };
    // console.log("PARAMS:: ", params);
    return params;
  } // end makeShareEmail function

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
    // console.log("trying to work ", scape_id);

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
  $scope.shareInput = false;
  $scope.sentShare = false;


/////// This is for when you want to send a message
  //this opens a messsage box
  $scope.message = function(){
    $scope.toggleModal();
    $scope.showMessage = true;
    // console.log("show message ", $scope.showMessage);
  };
  // for the message box to show the already sent thank you message
  $scope.send = function(messageText){
    // This is where the message is put together and then actually sent
    if(messageText){
      var messageParams = makeMessageEmail(messageText);
      sendTheMail(messageParams);
      //and then show the thank you box.
      $scope.showMessage = false;
      $scope.sent = true;
    }
  };

////// This shows up to confirm that you've followed someone
  $scope.follow = function (){
    if (current_user) {
      $scope.toggleModal();
      $scope.showFollow = true;
      $scope.userFollowing = true;
      $scope.userNotFollowing = false;
    } else {
      $window.location.href = '/UI/index.html#/login';
    };

    // this is the data to send when following someone
    var data = {
      subscriptions : {
      // "foodscape": scape_id
      "foodscape_id": Number(scape_id),
      "user_id": Number(current_user.id)
      }
    };

    ///the follow post request
    $http({
          url: "/foodscapes/" + scape_id + "/follow.json",
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
    $http({
          url: "/foodscapes/" + scape_id + "/unfollow.json",
          method: "DELETE",
          data: {}
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          console.log("Successfully unfollowed")
          $scope.userNotFollowing = true;
          $scope.userFollowing = false;
          // $scope.$apply(function() { $location.path("/new-garden"); });
          // $window.location.href = '/UI/index.html#/login';
      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
      }); // end delete request
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = true;
  };

  $scope.shareScape = function(){
    $scope.toggleModal();
    $scope.shareInput = true;
  }

  $scope.shared = function(emails, message){
    if(emails){
      console.log("emails in shared", emails);
      var messageParams = makeShareEmail(emails, message);
      sendTheMail(messageParams);
      //and then show the thank you box.
      $scope.shareInput = false;
      $scope.sentShare = true;
    }
  }

  // Payment modal stuff ========================================================
  $scope.showPaymentModal = function(){
    $scope.toggleModal();
    $scope.shouldShowPaymentForm = true;
    // FIXIT - get the payment amount...
    $scope.paymentAmountInDollars = 15.00;
  }

  $scope.getStripeToken = function(status, response) {
    console.log('handling Stripe payment...');
    if(response.error) {
      console.log('Error!  There was an error processing your payment: ', response.error);
      $window.alert('Error!  There was an error processing your payment: '+response.error);
    } else {
      console.log('Got Stripe token!');
      // got stripe token, now store it.
      $scope.stripeToken = response.id;
      $scope.shouldShowPaymentForm = false; // Hide the credit card form
      $scope.shouldShowPaymentConfirmation = true; // Show the payment confirmation form.
    }
  }

  $scope.confirmStripePaymentAndCharge = function() {
    var paymentAmountInCents = $scope.paymentAmountInDollars * 100;
    data = {stripe_token: $scope.stripeToken, payment_amount_in_cents: paymentAmountInCents};
    $http({
          url: "/charges",
          method: "POST",
          data: data
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          $scope.shouldShowPaymentConfirmation = false; // Hide the confirmation form.
          $scope.shouldShowPaymentThankYou = true; // Show the thank you form.
      }).error(function(data, status, headers, config) {
          console.log('There was an error submitting this request to the server!');
          $scope.error_message = true;
          $scope.status = status;
      });
  }

 // Lightbox stuff -- there is a custom directive for the lightbox in app.js
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    // console.log("toggling modal");
    $scope.modalShown = !$scope.modalShown;
    $scope.sent = false;
    $scope.showFollow = false;
    $scope.showMessage = false;
    $scope.unfollowConfirmBox = false;
    $scope.unfollowedMessage = false;
    $scope.shareInput = false;
    $scope.sentShare = false;
    $scope.shouldShowPaymentForm = false; // Hide the credit card form
    $scope.shouldShowPaymentConfirmation = false;
    $scope.shouldShowPaymentThankYou = false;
  };



  //  End modals!






}) // end controller

;
