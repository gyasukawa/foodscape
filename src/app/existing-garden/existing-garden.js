angular.module( 'ngBoilerplate.existing-garden', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'existing-garden', {
    url: '/existing-garden',
    views: {
      "main": {
        controller: 'ExistingGardenCtrl',
        templateUrl: 'existing-garden/existing-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Existing Garden' }
  });
})

.controller( 'ExistingGardenCtrl', function ExistingGardenCtrl( $scope ) {

})

;
