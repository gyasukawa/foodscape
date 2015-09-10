angular.module( 'ngBoilerplate.signup', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'signup', {
    url: '/signup',
    views: {
      "main": {
        controller: 'SignupCtrl',
        templateUrl: 'signup/signup.tpl.html'
      }
    },
    data:{ pageTitle: 'Get Started' }
  });
})

.controller( 'SignupCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {



// This one works
  // var data = {user: {"name": "Allie",
  //             "email": "cbc@cbc.com",
  //             "password": "hellodave",
  //             "password_confirmation":"hellodave"}};
$scope.error_message = false;
  $scope.signUp = function(the_user){
    // console.log("trying to work");

    var data = {user: {"name": the_user.name,
              "email": the_user.email,
              "password": the_user.password,
              "password_confirmation": the_user.password_confirmation,
              "zip_code": the_user.zip_code}};
    $scope.redirect_path = the_user.radio;
    // console.log("redirect path?", $scope.redirect_path);

    // console.log("This is what I passed through! Aren't you proud? ", data);

    $http({
        url: "/users.json",
        method: "POST",
        data: data
    }).success(function(data, status, headers, config) {
        $scope.data = data;
        if($scope.redirect_path == "host"){
          $window.location.href = '/UI/index.html#/foodscape/new';

        }else{
          $window.location.href = '/UI/index.html#/home';
        }
        // $scope.$apply(function() { $location.path("/new-garden"); });
    }).error(function(data, status, headers, config) {
        $scope.error_message = true;
        // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
        $scope.status = status;
    });
  };

  $scope.auth = function(event) {
    event.preventDefault();

    // console.log("trying to execute Facebook OAuth");

    $http({
      url: "/users/auth/facebook",
      method: "POST"
    }).success(function(status, headers, config) {
      // console.log("success!")
    }).error(function(status, headers, config) {
      // console.log("failure...")
      $scope.error_message = true;
    });

  };

  // Mandrill Send Confirmation
  var m = new mandrill.Mandrill('55zOecDadI2ajt-66mNoXQ');
  var params = {
    "template_name": "Thanks for signing up - send to Foodscape hosts after sign up",
    "template_content": [
        {
            "name": "example name",
            "content": "example content"
        }
    ],

    "message": {
        "from_email":"admin@myfoodscape.com",
        "to":[{"email":"iring.ma@gmail.com"}],
        "subject": "Subject line",
        "text": "text in the message"
    }
  };

  function sendTheMail() {
    // Send the email!

    m.messages.sendTemplate(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
  }
  // End Mandrill setup

  $scope.send = function(){
    // This is where the confirmation actually sent
      sendTheMail();
  };

}]) // end controller

;
