angular.module( 'ngBoilerplate.terms', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'terms', {
    url: '/terms',
    views: {
      "main": {
        controller: 'TermsCtrl',
        templateUrl: 'terms/terms.tpl.html'
      }
    },
    data:{ pageTitle: 'Terms of Service' }
  });
})

.controller( 'TermsCtrl', ['$scope', function ($scope) {

}]) // end controller

;
