angular.module('sportivation')
.controller('UserEventCtrl', ['$scope', '$state', 'flash', '$http', 'apiService', '$aside',
  function($scope, $state, flash, $http, apiService, $aside) {

    $scope.user_tournament = {};
    $scope.createUpdateEvent = function(operation){
      if (operation == 'add')
      {
        apiService.post('/user_tournaments/', {"user_tournament": $scope.user_tournament}).then(function(res) {
          $scope.user.user_tournaments.push(res.data.user_tournament);
          flash.success = "Event added successfully";
        });
      }
      else if(operation == 'edit')
      {
        apiService.put('/user_tournaments/'+ $scope.user_tournament.id, {"user_tournament": $scope.user_tournament}).then(function(res) {
          user_tournament = res.data.user_tournament
          for (var i = 0; i<= $scope.user.user_tournaments.length - 1; i++) {
            if ($scope.user.user_tournaments[i].id == res.data.user_tournament.id)
            {
              $scope.user.user_tournaments[i] = {
                name: user_tournament.name,
                team: user_tournament.team,
                summary: user_tournament.summary,
                tournament_date: user_tournament.tournament_date,
                location: user_tournament.location
              };
              break;
            }
          }
          flash.success = "Event updated successfully";
        })
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
