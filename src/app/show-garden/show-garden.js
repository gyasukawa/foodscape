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


  // Lightbox stuff...?
  $scope.modalShown = false;
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
  };

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
                    }];

})

// More lightbox stuff
.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>" // See below
  };
})

;
