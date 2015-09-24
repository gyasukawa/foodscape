angular.module( 'ngBoilerplate.create-garden', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'create-garden', {
    url: '/foodscape/new',
    views: {
      "main": {
        controller: 'CreateGardenCtrl',
        templateUrl: 'create-garden/create-garden.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Foodscape' }
  });
})

.controller( 'CreateGardenCtrl', [ "$scope", "$http", "$window", "Upload", "$timeout", function ( $scope , $http, $window, Upload, $timeout) {


  //IMAGE STUFF

  // $scope.uploadFiles = function(files, scape_id) {
  //   console.log("UPLOADING A FILE, BROSKI");
  //   $scope.files = files;
  //   angular.forEach(files, function(file) {
  //     if (file && !file.$error) {
  //       file.upload = Upload.upload({
  //             url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
  //             file: file
  //       });

  //       file.upload.then(function (response) {
  //         $timeout(function () {
  //           console.log("RESPONDEVOUX success! ", response);
  //           file.result = response.data;
  //         });
  //       }, function (response) {
  //         console.log("RESPONDEVOUX", response);
  //         if (response.status > 0)
  //           $scope.errorMsg = response.status + ': ' + response.data;
  //       });

  //       file.upload.progress(function (evt) {
  //         file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  //       });
  //     }
  //   });
  // }
// END IMAGE STUFF

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
    // console.log(the_id);
    // console.log($scope.plants[the_id]);
    var plantObj = $scope.plants[the_id];
    plantObj.selected == "selected"? plantObj.selected = "": plantObj.selected = "selected";
     // console.log($scope.plants);
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

  // IMAGE UPLOAD
  $scope.uploadFile = function (file, scape_id) {
      // console.log(":::::FILES ", file);
      // for (var i = 0; i < files.length; i++) {
          // var file = files[i];
    // console.log("FILE::::: ", file);
    $scope.upload = Upload.upload({
        url: '/foodscapes/' + scape_id + '/pictures.json',
        method: 'POST',
        fields: { 'picture[main]' : false },
        file: file,
        fileFormDataName: 'picture[image]'
    });
      // }
  }
  // END IMAGE UPLOAD

  $scope.submitGardenForm = function(scapeInfo){

    if(scapeInfo){ // make sure it's not blank

      // formatting goals and needs data
      var goalsAndNeeds = $scope.goals;
      //add the additional text as a final object in the array
      if(scapeInfo.shareText){
        goalsAndNeeds[4] = {"text":scapeInfo.shareText}
      }
      goalsAndNeeds = JSON.stringify(goalsAndNeeds);

      // Doing mostly the same stuff with the produce grown
      var produce = $scope.plants;
      // console.log("Scapeinfo.growingText:: ",scapeInfo.growingText);
      var growText = {"growingText": scapeInfo.growingText};
      produce.push(growText);
      // console.log("Produce to send to db", produce);
      produce = JSON.stringify(produce);

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


      $http({
          url: "/foodscapes.json",
          method: "POST",
          data: data
      }).success(function(data, status, headers, config) {
          $scope.data = data;
          // console.log("This is what I passed through!", data);

          if(scapeInfo.file_attachment){
            $scope.uploadFile(scapeInfo.file_attachment, data.id);
          }
          $window.location.href = '/UI/index.html#/foodscapes/' + data.id;

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
}])// end CreateGardenCtrl

;
