angular.module( 'ngBoilerplate.new-garden', [
  'ui.router',
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

  $scope.foo = "New foo";

  $scope.plants = [{
                      "type":"Veggies"
                      ,"img":"assets/images/forms/veggies.png"
                    }
                    ,{
                      "type":"Herbs"
                      ,"img":"assets/images/forms/herbs.png"
                    }
                    ,{
                      "type":"Fruit"
                      ,"img":"assets/images/forms/fruit.png"
                    }
                    ,{
                      "type":"Flowers"
                      ,"img":"assets/images/forms/flowers.png"
                    }
                    ,{
                      "type":"Other"
                    ,"img":"assets/images/forms/other.png"
                    }];
                  console.log($scope.plants);
})

;
