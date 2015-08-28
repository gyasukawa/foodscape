angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.signup',
  'ngBoilerplate.login',
  'ngBoilerplate.new-garden',
  'ngBoilerplate.existing-garden',
  'ngBoilerplate.thank-you',
  'ngBoilerplate.show-garden',
  'ngBoilerplate.create-garden',
  'ngBoilerplate.edit-garden',
  'ngBoilerplate.following',
  'ui.router',
  'angular-carousel',
  'ngCookies',
])
.factory('Auth', ['$cookieStore', function ($cookieStore) {

  var _user = {};

  return {
      user : _user,
      set: function (_user) {
        // console.log("setting!");
          // you can retrive a user setted from another page, like login sucessful page.
          existing_cookie_user = $cookieStore.get('current.user');
          _user =  _user || existing_cookie_user;
          $cookieStore.put('current.user', _user);
          // console.log("I am the user? ", _user);
      },
      remove: function () {
          $cookieStore.remove('current.user', _user);
      }
  };
}])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run (Auth, UserRestService) {
  var _user = UserRestService.requestCurrentUser();
  Auth.set(_user);
})

.service("UserRestService", function UserRestService ($http, $location, $q){
    return service = {
      requestCurrentUser: function() {
        return $http.get('/users.json').then(function(response) {
          service.currentUser = response.data.user;
          console.log(service.currentUser);
          return service.currentUser;
        });
      }
    }
    // currentUser: null,
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http,  $anchorScroll, $window ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Scape' ;
    }
  });


  $scope.scrollTo = function(id) {
    // $location.hash(id);
    $window.location.href = '/UI/index.html#/home#' + id;
    // console.log($location.hash());
    // $anchorScroll();
  };

  var current_user = null;

  // GETS CURRENT USER. AUTH for navbar
  $scope.userLoggedOut = false;
  $scope.userLoggedIn = false;
  var checkAuth = function(){
    $http.get('/the_current_user.json').then(
      function(response){
        console.log("current user from app.js ", response);
        current_user = response.data;
      $scope.userLoggedIn = true;

      }, function(response){
      console.log("nope from app.js current user ", response);
      $scope.userLoggedOut = true;
      current_user = null;
    });
  }
  checkAuth();



  $scope.myFoodscape = function(){
    $http({
      url: "/foodscapes.json",
          method: "GET",
          data: {}
      }).success(function(data, status, headers, config) {
          console.log("all foodscampes, maybe ", data);
          //This is going to have a dedicated route
          //called foodscapes/by_user/:userID or something soon
          //to avoid dumbass for loops.
          for(var i = 0; i < data.length; i++){
            if (data[i].user_id === current_user.id){
              var thisUserFoodscape = i;
              $window.location.href = '/UI/index.html#/foodscapes/' + (i+1);
              return i;
            } else {
              $window.location.href = '/UI/index.html#/foodscape/new';

            }
          }
      }).error(function(data, status, headers, config) {
          // $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
          $scope.status = status;
      });
  }

  $scope.logout = function(){
    console.log("trying to log out");
    $http({
          url: "/users/sign_out.json",
          method: "DELETE",
          data: {}
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          console.log("Successfully logged out, we think")
          // $scope.$apply(function() { $location.path("/new-garden"); });
          $window.location.href = '/UI/index.html#/login';
      }).error(function(data, status, headers, config) {
          $scope.error_message = true;
          // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
          $scope.status = status;
      });
      checkAuth();
  };
  

}) //end AppCtrl

.directive('modalDialog', [ function () {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width) {
          scope.dialogStyle.width = attrs.width;
      }
      if (attrs.height) {
          scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
}])
// <button ng-click="hideModal()" class="btn get-started-btn">Close</button>
;

