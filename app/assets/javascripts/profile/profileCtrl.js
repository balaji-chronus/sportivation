angular.module('sportivation')
.controller('ProfileCtrl', ['$scope', '$state', 'flash', '$http', 'ProfileService',
  function($scope, $state, flash, $http, ProfileService) {

    //remove provider information
    var keyArr = ["uid", "oauth_token", "provider", "oauth_expires_at"];
    for(var i =0; i < keyArr.length; i++)
    {
      delete $scope.user[keyArr[i]];
    }

    // Datepicker related methods
    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.minDate = null;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    // Address Autocomplete
    $scope.getAddress = function(viewValue) {
      var params = {address: viewValue, sensor: false};
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
      .then(function(res) {
        return res.data.results;
      });
    };

    $scope.updateProfile = function(user) {
      return ProfileService.updateProfile(user).then(function(data) {
        if (data.txnSuccess)
          flash.success = "Update Successful";
        else
          flash.error = "Update Failed."
      });
    }
  }]);
