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

.controller( 'LoginCtrl', function LoginCtrl( $scope, $http, $window) {


var checkAuth = function(){
    $http.get('/the_current_user.json').then(
      function(response){
        // console.log("current user from app.js ", response);
        $scope.current_user = response.data;
        $window.location.href = '/UI/index.html#/home';

      }, function(response){
      // console.log("nope from app.js current user ", response);
      $scope.current_user = null;
    });
  }
  checkAuth();


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
          // console.log("logged in!", data);
          $window.location.reload();

          // checkAuth();

          //this still isn't getting the logged in navbar yet.

          // $window.location.href = '/UI/index.html#/home';

      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
          $scope.status = status;
          // console.log("not logged in");
      });
  };
});
