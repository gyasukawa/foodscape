angular.module( 'ngBoilerplate.existing-garden', [
  'ui.router',
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
  $scope.selectedSection = 1;
  $scope.backButtonVisible = false;
  $scope.submitButtonText = "Continue"

  $scope.chooseSection = function(num) {
    if(num == 3)
      $scope.submitButtonText = "Book";
    else
      $scope.submitButtonText = "Continue";

    if(num == 1)
      $scope.backButtonVisible = false;
    else
      $scope.backButtonVisible = true;

    $scope.selectedSection = num;
  }

  $scope.backButtonClicked = function() {
    $scope.chooseSection($scope.selectedSection - 1);
  }

  $scope.continueButtonClicked = function() {
    if($scope.selectedSection < 3)
      $scope.chooseSection($scope.selectedSection + 1);
  }
})

;
