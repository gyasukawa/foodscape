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

.controller( 'CreateGardenCtrl', [ "$scope", "$http",function ( $scope , $http ) {

// for the ng-repeat for the veggie bools
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

  $scope.goals = [{ "id":"1",
                    "text":"Have a place to share updates and photos with my friends and neighbors",
                      "bool":false},
                    { "id":"2",
                    "text":"Get help with foodscape chores such as weeding and harvesting",
                      "bool":false},
                    { "id":"3",
                    "text":"Earn extra money to support my foodscape",
                      "bool":false},
                    { "id":"4",
                    "text":"I'm not sure yet",
                      "bool":false}];

  $scope.submitGardenForm = function(scapeInfo){

    console.log("trying to work");
    var goalsAndNeeds = "I would like to...";

    console.log("My goals", $scope.goals);
    $scope.goals.forEach(function(goal){
      if (goal.bool){
        var str = (goal.text).toLowerCase();
        goalsAndNeeds += str + ", ";
        console.log("goals and needs", goalsAndNeeds);
      }
    })
    goalsAndNeeds += scapeInfo.shareText;

    var data = {foodscape: {"name": scapeInfo.name,
              "address_line_1": scapeInfo.address1,
              "address_line_2": scapeInfo.address2,
              "city": scapeInfo.city,
              "state": scapeInfo.state,
              "zip_code":scapeInfo.zip,
              "goalsneeds": goalsAndNeeds,
              "other_details": scapeInfo.otherInfo
            }};

    console.log("This is what I passed through! Aren't you proud? ", data);

    $http({
        url: "/foodscapes.json",
        method: "POST",
        data: data
    }).success(function(data, status, headers, config) {
        $scope.data = data;
        // $scope.$apply(function() { $location.path("/new-garden"); });
    }).error(function(data, status, headers, config) {
        $scope.error_message = true;
        // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
        $scope.status = status;
    });

  }
}])
  
;
