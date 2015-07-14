angular.module( 'ngBoilerplate.new-garden', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'new-garden', {
    url: '/new-garden',
    views: {
      "main": {
        controller: 'NewGardenCtrl',
        templateUrl: 'new-garden/new-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'New Garden' }
  });
})

.controller( 'NewGardenCtrl', function NewGardenCtrl( $scope ) {

})

;
