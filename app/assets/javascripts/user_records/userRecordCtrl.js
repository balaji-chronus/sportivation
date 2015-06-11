angular.module('sportivation')
.controller('UserRecordCtrl', ['$scope', '$state', 'flash', '$http', 'apiService', '$aside',
  function($scope, $state, flash, $http, apiService, $aside) {

    var newEditRecordAside = $aside({scope: $scope, template: 'user_records/new_edit_user_record.html', show: false, container: '#form-views'});
    $scope.showNewRecordAside = function() {
      $scope.recordData = {
        operation: 'add'
      };
      $scope.user_record = {};
      newEditRecordAside.$promise.then(newEditRecordAside.show());
    }

    $scope.showEditRecordAside = function(user_record){
      $scope.recordData = {
        operation: 'edit'
      }

      $scope.user_record = user_record;
      newEditRecordAside.$promise.then(newEditRecordAside.show());
    }
}]);
