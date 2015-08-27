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

.controller( 'SignupCtrl', ['$scope', '$http', function ($scope, $http) {



// This one works
  // var data = {user: {"name": "Allie",
  //             "email": "cbc@cbc.com",
  //             "password": "hellodave",
  //             "password_confirmation":"hellodave"}};
$scope.error_message = false;
  $scope.postIt = function(the_user){
    console.log("trying to work");

    var data = {user: {"name": the_user.name,
              "email": the_user.email,
              "password": the_user.password,
              "password_confirmation": the_user.password_confirmation,
              "zip_code": the_user.zip_code}};

    console.log("This is what I passed through! Aren't you proud? ", data);

    $http({
        url: "/users.json",
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
  };

  $scope.auth = function() {
    console.log("trying to execute Facebook OAuth");

    $http({
      url: "/my_engine/users/auth/facebook",
      method: "POST"
    }).success(function(status, headers, config) {
      console.log("success!")
    }).error(function(status, headers, config) {
      console.log("failure...")
      $scope.error_message = true;
    });

  };



}]) // end controller

;
