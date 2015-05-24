angular.module('sportivation')
.controller('ProfileCtrl', ['$scope', '$state', 'flash', '$http',
  function($scope, $state, flash, $http) {

    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };

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

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.selectedAddress = '';
    $scope.getAddress = function(viewValue) {
      var params = {address: viewValue, sensor: false};
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
      .then(function(res) {
        return res.data.results;
      });
    };
  }]);
