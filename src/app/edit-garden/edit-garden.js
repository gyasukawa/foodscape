angular.module( 'ngBoilerplate.edit-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'edit-garden', {
    url: '/edit-garden',
    views: {
      "main": {
        controller: 'EditGardenCtrl',
        templateUrl: 'edit-garden/edit-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit Garden' }
  });
})

.controller( 'EditGardenCtrl', [ "$scope", "$http",function ( $scope , $http ) {


  $http.get('/foodscapes/4.json').then(function(response){

    var resData = response.data;

    console.log("worked: ", response);
    $scope.scapeName = resData.name;
    $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];
    // This stuff goes in the white box under the orange labels
    $scope.location = resData.city;
    $scope.produce = angular.fromJson(resData.produce);
    console.log("Parsed produce", $scope.produce);
    $scope.goalsAndNeeds = resData.goalsneeds;
    $scope.otherDetails = resData.other_details;
    $scope.updates = [{
                        "date": "4/15/15"
                      , "content": "Watered today."
                      }
                      ,{
                        "date": "5/30/15"
                      , "content": "I planted tomatoes!"
                      }];
  }, function(response){
    console.log("nope");
  });

// for the ng-repeat for the veggie bools
  $scope.plants = [{  "id":1
                      ,"type":"Veggies"
                      ,"img":"assets/images/forms/veggies.png"
                      ,"selected":""
                    }
                    ,{"id":2
                      ,"type":"Herbs"
                      ,"img":"assets/images/forms/herbs.png"
                      ,"selected":""
                    }
                    ,{"id":3
                      ,"type":"Fruit"
                      ,"img":"assets/images/forms/fruit.png"
                      ,"selected":""
                    }
                    ,{"id":4
                    , "type":"Flowers"
                      ,"img":"assets/images/forms/flowers.png"
                      ,"selected":""
                    }
                    ,{"id":5
                      ,"type":"Other"
                    ,"img":"assets/images/forms/whatevergrowsbest.png"
                    ,"selected":""
                    }];
                  console.log($scope.plants);

        $scope.isSelected = [];

  $scope.toggleClass = function (the_id) {
    console.log(the_id);
    console.log($scope.plants[the_id]);
    var plantObj = $scope.plants[the_id];
    plantObj.selected == "selected"? plantObj.selected = "": plantObj.selected = "selected";
     console.log($scope.plants);
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

    if(scapeInfo){ // make sure it's not blank
      var goalsAndNeeds = $scope.goals;

      // console.log("My goals", $scope.goals);
      // $scope.goals.forEach(function(goal){
      //   if (goal.bool){
      //     var str = (goal.text).toLowerCase();
      //     goalsAndNeeds += str + ", ";
      //     console.log("goals and needs", goalsAndNeeds);
      //   }
      // })
      if(scapeInfo.shareText){
        goalsAndNeeds[4] = {"text":scapeInfo.shareText,
        "bool": true}
      }
      var produce = $scope.plants;
      console.log( $scope.plants);
      produce = produce.toString();
      console.log("should be produce: ", produce);

      var data = {foodscape: {"name": scapeInfo.name,
                "address_line_1": scapeInfo.address1,
                "address_line_2": scapeInfo.address2,
                "city": scapeInfo.city,
                "state": scapeInfo.state,
                "zip_code":scapeInfo.zip,
                "goalsneeds": goalsAndNeeds,
                "produce": produce,
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

    } else {
      console.log("nope. You didnt put in enough stuff to make this go through.");
    }
  }
}])
  
;
