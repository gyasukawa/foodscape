angular.module( 'ngBoilerplate.edit-garden', [
  'ui.router',
  'ui.bootstrap'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'edit-garden', {
    url: '/foodscapes/edit/:scapeId',
    views: {
      "main": {
        controller: 'EditGardenCtrl',
        templateUrl: 'edit-garden/edit-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit Garden' }
  });
})

.controller( 'EditGardenCtrl', [ "$scope", "$http", "$stateParams", "$window", "$location" , "Upload", "$timeout", function ( $scope , $http, $stateParams, $window, $location, Upload, $timeout ) {
  // console.log("TO THE WINDOW!" ,$window);

  $scope.checkAuth = function(){
    $http.get('/the_current_user.json').then(
        function(response){
          // console.log("current user from following", response);
          $scope.current_user = response.data;
          $scope.loadFoodscape($window);

        }, function(response){
        console.log("nope from app.js current user ", response);
        $scope.current_user = null;
      });
  }

 $scope.checkAuth();

  var scape_id = $stateParams.scapeId;

  $scope.current_user;
  console.log("edit page current user:: ", current_user);

  //IMAGE STUFF

    $scope.uploadFile = function (file) {
      // console.log(":::::FILES ", file);
      // for (var i = 0; i < files.length; i++) {
          // var file = files[i];
          console.log("FILE::::: ", file);
          $scope.upload = Upload.upload({
              url: '/foodscapes/' + scape_id + '/pictures.json',
              method: 'POST',
              fields: { 'picture[main]' : false },
              file: file,
              fileFormDataName: 'picture[image]'
          });
      // }
    }

    $scope.uploadAvatar = function (file) {
      console.log("FILE::::: ", file);
      $scope.upload = Upload.upload({
          url: '/users/' + $scope.current_user.id + "/avatar.json" , // slash what
          method: 'PATCH',
          file: file,
          fileFormDataName: 'user[avatar]'
      });
    }

    //avatar image

// END IMAGE STUFF


  $scope.plants = [];
  $scope.loadFoodscape = function($window){

    // GET GET GET GET GET
    $http.get('/foodscapes/' + scape_id + '.json').then(function(response){
      var resData = response.data;

      if (resData.foodscape.user_id == $scope.current_user.id){
        // console.log("worked: ", response);
        resData = resData.foodscape;

        $scope.scapeName = resData.name;



        // For produce checkboxes. Arrange to go onto the page.
        var produce = angular.fromJson(resData.produce);
        $scope.growingText = produce[5].growingText;

        for(var i = 0; i < 6; i++){
          $scope.plants.push(produce[i]);
        }

        $scope.gardenImages = ["assets/images/community-2.png","assets/images/community-1.jpeg","assets/images/community-3.jpeg"];

        // GET LOCATION
        $scope.address1 = resData.address_line_1;
        $scope.address2 = resData.address_line_2;
        $scope.city = resData.city;
        $scope.state = resData.state;
        $scope.zip = resData.zip_code;

        // GET GOALS
        var myGoals = angular.fromJson(resData.goalsneeds);
        $scope.extraGoals = myGoals[4]? myGoals[4].text : "";
        $scope.goals = [];
        for(var i = 0; i < 4; i++){
          $scope.goals.push(myGoals[i]);
        }

        $scope.otherDetails = resData.other_details;
      } else {
          $window.location.href = '/UI/index.html#/home';

      }
    }, function(response){
      console.log("nope");
    }); /// END GET
  }


  $scope.isSelected = [];


  $scope.toggleClass = function (the_id) {
    console.log(the_id);
    console.log($scope.plants[the_id]);
    var plantObj = $scope.plants[the_id];
    plantObj.selected == "selected"? plantObj.selected = "": plantObj.selected = "selected";
     console.log($scope.plants);
  };


  $scope.submitGardenForm = function(scapeName, growingText, address1, address2, city, state, zip, goals, extraGoals, otherDetails, file_attachment){

    // $scope.uploadImageHopefully(file_attachment)

    console.log("about to scope.upload hopefully");
    $scope.uploadFile(file_attachment);

    // if(scapeInfo){ // make sure it's not blank
       var goalsAndNeeds = goals;

      // console.log("My goals", $scope.goals);
      // $scope.goals.forEach(function(goal){
      //   if (goal.bool){
      //     var str = (goal.text).toLowerCase();
      //     goalsAndNeeds += str + ", ";
      //     console.log("goals and needs", goalsAndNeeds);
      //   }
      // })
      if(extraGoals){
        goalsAndNeeds[4] = {"text": extraGoals}
      }
      goalsAndNeeds = JSON.stringify(goalsAndNeeds);
      var produce = $scope.plants;
      produce[5] = {"growingText": growingText};
      produce = JSON.stringify(produce);


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

      // console.log("This is what I passed through to edit! ", data);
      $http.put('/foodscapes/' + scape_id + '.json', data)
      .success(function(data, status /*,  headers */){
        // console.log("put success! ", data)
        $window.location.href = '/UI/index.html#/foodscapes/' + scape_id;

      })
      .error(function(data, status, headers){
        console.log("FAIL to put");
      })

  }
}])

;
