angular.module( 'ngBoilerplate.thank-you', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'thank-you', {
    url: '/thank-you',
    views: {
      "main": {
        controller: 'ThankYouCtrl',
        templateUrl: 'thank-you/thank-you.tpl.html'
      }
    },
    data:{ pageTitle: 'Thank You' }
  });
})

.controller( 'ThankYouCtrl', function ThankYouCtrl( $scope ) {

})

;
