angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $scope, $http ) {

  $scope.login = function(){

    var data = {user: {
        "email": user.email,
        "password": user.password
    }}

    $http({
          url: "/users/sign_in.json",
          method: "POST",
          payload: data
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          console.log("logged in!");
          // $scope.$apply(function() { $location.path("/new-garden"); });
      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
          $scope.status = status;
          console.log("not logged in");
      });
  }
})

;
