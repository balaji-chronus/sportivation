angular.module('sportivation')
.controller('UserEventCtrl', ['$scope', '$state', 'flash', '$http', 'apiService', '$aside',
  function($scope, $state, flash, $http, apiService, $aside) {

    $scope.user_tournament = {};
    $scope.createUpdateEvent = function(operation){
      if (operation == 'add')
      {
        apiService.post('/user_tournaments/', {"user_tournament": $scope.user_tournament}).then(function(res) {
          $scope.user.user_tournaments.push(res.data);
          flash.success = "Event added successfully";
        });
      }
    }

    var newEditEventAside = $aside({scope: $scope, template: 'user_events/new_edit_user_event.html', show: false, container: '#form-views'});
    $scope.showNewEventAside = function() {
      $scope.eventData = {
        operation: 'add'
      };
      $scope.user_tournament = {};
      newEditEventAside.$promise.then(newEditEventAside.show());
    }

    $scope.showEditEventAside = function(user_tournament){
      $scope.eventData = {
        operation: 'edit'
      }

      $scope.user_tournament = user_tournament;
      newEditEventAside.$promise.then(newEditEventAside.show());
    }
}]);
