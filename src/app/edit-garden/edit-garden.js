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

  $scope.plants = [];

  // GET GET GET GET GET
  $http.get('/foodscapes/9.json').then(function(response){

    var resData = response.data;
    console.log("worked: ", response);
    $scope.scapeName = resData.name;

    // For produce checkboxes. Arrange to go onto the page.
    var produce = angular.fromJson(resData.produce);
    $scope.extraProduce = produce[5];

    for(var i = 0; i < 6; i++){
      $scope.plants.push(produce[i]);
    }

    $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];

    // GET LOCATION
    $scope.address1 = resData.address_line_1;
    $scope.address2 = resData.address_line_2;
    $scope.city = resData.city;
    $scope.state = resData.state;
    $scope.zip = resData.zip;

    // GET GOALS
    var myGoals = angular.fromJson(resData.goalsneeds);
    $scope.extraGoals = myGoals[4].text;
    $scope.goals = [];
    for(var i = 0; i < 4; i++){
      $scope.goals.push(myGoals[i]);
    }

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
  }); /// END GET


  $scope.isSelected = [];


  $scope.toggleClass = function (the_id) {
    console.log(the_id);
    console.log($scope.plants[the_id]);
    var plantObj = $scope.plants[the_id];
    plantObj.selected == "selected"? plantObj.selected = "": plantObj.selected = "selected";
     console.log($scope.plants);
  };

  // $scope.goals = [{ "id":"1",
  //                   "text":"Have a place to share updates and photos with my friends and neighbors",
  //                     "bool":false},
  //                   { "id":"2",
  //                   "text":"Get help with foodscape chores such as weeding and harvesting",
  //                     "bool":false},
  //                   { "id":"3",
  //                   "text":"Earn extra money to support my foodscape",
  //                     "bool":false},
  //                   { "id":"4",
  //                   "text":"I'm not sure yet",
  //                     "bool":false}];

  $scope.submitGardenForm = function(scapeName, growingText, address1, address2, city, state, zip, extraGoals, otherDetails){

    // if(scapeInfo){ // make sure it's not blank
      var goalsAndNeeds = $scope.goals;

      // console.log("My goals", $scope.goals);
      // $scope.goals.forEach(function(goal){
      //   if (goal.bool){
      //     var str = (goal.text).toLowerCase();
      //     goalsAndNeeds += str + ", ";
      //     console.log("goals and needs", goalsAndNeeds);
      //   }
      // })
      if($scope.extraGoals){
        goalsAndNeeds[4] = {"text":$scope.extraGoals}
      }
      var produce = $scope.plants;
      console.log( $scope.plants);
      produce = JSON.stringify(produce);
      console.log("should be produce: ", produce);


      var data = {foodscape: {"name": scapeName,
                "address_line_1": address1,
                "address_line_2": address2,
                "city": city,
                "state": state,
                "zip_code": zip,
                "goalsneeds": goalsAndNeeds,
                "produce": produce,
                "other_details": otherDetails
              }};

      console.log("This is what I passed through! Aren't you proud? ", data);
      $http.put("/foodscapes/9.json", data)
      .success(function(data, status, headers){console.log("put success! ", data)})
      .error(function(data, status, headers){
        console.log("FAIL to put");
      })
      // $http({
      //     url: "/foodscapes.json",
      //     method: "PUT",
      //     data: data
      // }).success(function(data, status, headers, config) {
      //     $scope.data = data;
      //     // $scope.$apply(function() { $location.path("/new-garden"); });
      // }).error(function(data, status, headers, config) {
      //     $scope.error_message = true;
      //     // $scope.error_message = "One or more of these fields is incorrect. Please make sure your email is valid and unique and that your passwords match."
      //     $scope.status = status;
      // });

    // } else {
    //   console.log("nope. You didnt put in enough stuff to make this go through.");
    // }
  }
}])
  
;
