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

    $scope.addEvent = function(){
      $scope.user.user_tournaments.push($scope.eventData);
      $scope.updateProfile($scope.user);
    }

    var newEventAside = $aside({scope: $scope, template: 'events/new_event.html', show: false, container: '#form-views'});
    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showNewEventAside = function() {
      newEventAside.$promise.then(newEventAside.show());
    }
  }]);
