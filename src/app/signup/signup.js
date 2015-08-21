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


  // var data = {name: "My new name test",
  //             email: "abc@abc.com",
  //             password: "hellodave"};

  var data = {"name": "My new name test",
              "email": "abc@abc.com",
              "password": "hellodave"};

  $scope.postIt = function(){
    console.log("trying to work");

    $http({
        url: "/users",
        method: "POST",
        data: data
    }).success(function(data, status, headers, config) {
        $scope.data = data;
    }).error(function(data, status, headers, config) {
        $scope.status = status;
    });
  }



}]) // end controller

;
