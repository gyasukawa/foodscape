angular.module( 'ngBoilerplate.show-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'show-garden', {
    // Going to need to mess with this URL in order to have the individual one to show.
    url: '/show-garden',
    views: {
      "main": {
        controller: 'ShowGardenCtrl',
        templateUrl: 'show-garden/show-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Show Garden' }
  });
})

.controller( 'ShowGardenCtrl', function ShowGardenCtrl( $scope ) {
  

  // Profile page info
  $scope.scapeName = "Mary's Foodscape";
  $scope.status = "Hello from the show-garden.js. This will be a status message.";
  $scope.username = "Mary L.";
  $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];
  // This stuff goes in the white box under the orange labels
  $scope.location = "The Sunset, San Francisco, CA";
  $scope.produce = "veggies, fruites, etc.";
  $scope.goalsAndNeeds = "I need a hoe. I'm going to build a planter box.";
  $scope.otherDetails = "I have a friendly dog.";
  $scope.updates = [{
                      "date": "4/15/15"
                    , "content": "Watered today."
                    }
                    ,{
                      "date": "5/30/15"
                    , "content": "I planted tomatoes!"
                    }]

})

;
