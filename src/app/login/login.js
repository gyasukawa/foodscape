angular.module( 'ngBoilerplate.login', [
  'ng-token-auth',
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider, $authProvider ) {
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

  $authProvider.configure({
    apiUrl: 'http://localhost:3000'
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $scope, $http, $auth ) {

  $scope.login = function(loginInfo) {

    var data = {user: {
        "email": loginInfo.email,
        "password": loginInfo.password
    }}

    $http({
          url: "/users/sign_in.json",
          method: "POST",
          data: data
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
  };

  // Omniauth Sign In

  $scope.handleBtnClick = function() {
    $auth.authenticate('facebook')
    .then(function(resp) {
      alert('something successful happened')
    })
    .catch(function(resp) {
        // handle errors
        alert('something terrible happened')
    });
  };

});
