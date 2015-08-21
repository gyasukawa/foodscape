angular.module( 'ngBoilerplate.create-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'create-garden', {
    url: '/create-garden',
    views: {
      "main": {
        controller: 'CreateGardenCtrl',
        templateUrl: 'create-garden/create-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Garden' }
  });
})

.controller( 'CreateGardenCtrl', function CreateGardenCtrl( $scope ) {


  $scope.plants = [{  "id":1
                      ,"type":"Veggies"
                      ,"img":"assets/images/forms/veggies.png"
                    }
                    ,{"id":2
                      ,"type":"Herbs"
                      ,"img":"assets/images/forms/herbs.png"
                    }
                    ,{"id":3
                      ,"type":"Fruit"
                      ,"img":"assets/images/forms/fruit.png"
                    }
                    ,{"id":4
                    , "type":"Flowers"
                      ,"img":"assets/images/forms/flowers.png"
                    }
                    ,{"id":5
                      ,"type":"Other"
                    ,"img":"assets/images/forms/whatevergrowsbest.png"
                    }];
                  console.log($scope.plants);

        $scope.isSelected = [];

        $scope.toggleClass = function (id) {
          console.log(id);
           $scope.isSelected[id] = $scope.isSelected[id]=='selected'?'':'selected';
        };
})
  
;
