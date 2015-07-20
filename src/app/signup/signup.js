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

.controller( 'SignupCtrl', function SignupCtrl( $scope ) {

})

;
