angular.module('sportivation')
.controller('ProfileCtrl', ['$scope', '$state', 'flash', '$http', 'ProfileService', '$aside',
  function($scope, $state, flash, $http, ProfileService, $aside) {
    $scope.eventData = {};


    $scope.loadData = function () {
      ProfileService.getProfile($scope.user).then(function(res) {
         $scope.user = res.data;
       });
    };

    // initial Load
    $scope.loadData();

    // Address Autocomplete
    $scope.getAddress = function(viewValue) {
      var params = {address: viewValue, sensor: false};
      return ProfileService.getAddress(params).then(function(res) {
        return res.data.results;
      });
    };

    $scope.updateProfile = function(user) {
      return ProfileService.updateProfile(user).then(function(res) {
        if (res.data.txn_success)
          flash.success = "Profile was updated successfully";
        else
          flash.error = "Profile update was not successful"
      });
    }

    // Sports Profile Tabs
    $scope.tabs = [
      {
        title: "calendar",
        name: "Events & Tournaments",
        controllerName: "UserEventCtrl",
        show: true, //this is so this tab shows by default
        templateUrl: "user_events/user_events_list.html"
      },
      {
        title: "video-camera",
        name: "Press & Media",
        controllerName: "UserMediaCtrl",
        templateUrl: "user_media/user_media_list.html"
      },
      {
        title: "trophy",
        name: "Records & Acheivements",
        controllerName: "UserRecordCtrl",
        templateUrl: "user_records/user_records_list.html"
      }
    ];
    $scope.selectedSportsTab = $scope.tabs[0].title;
  }]);
