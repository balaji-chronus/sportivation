angular.module('sportivation')
.controller('NavCtrl', ['$scope', '$state', 'Auth', '$modal', 'flash', 'Facebook', '$http',
  function($scope, $state, Auth, $modal, flash, Facebook, $http) {
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  var myOtherModal = $modal({scope: $scope, template: 'auth/_login_modal_content.html', show: false});
  $scope.showModal = function() {
    myOtherModal.$promise.then(myOtherModal.show);
  };

  $scope.login = function() {
   Auth.login($scope.user).then(function(){
     $state.go('home');
   }, function(error){
     flash.error = 'Login failed - Invalid Username/Password';
   });
  };

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $state.go('login');
  });

  // Flash hide
  $scope.hideflash = function(){
    angular.element(document.querySelector('.flash_message')).removeClass("alert");
  }

  // FACEBOOK LOGIN

  /**
   * Watch for Facebook to be ready.
   * There's also the event that could be used
   */

  $scope.$watch(
    function() {
      return Facebook.isReady();
    },
    function(newVal) {
      if (newVal)
        $scope.facebookReady = true;
    }
  );

  var userIsConnected = false;

  Facebook.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      userIsConnected = true;
    }
  });

  $scope.flogin = function() {
    // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        if (response.status == 'connected') {
            $scope.signedIn = true;
            $scope.me();
          }
          else {
            $scope.signedIn = false;
          }
      }, {scope: 'email'});
  };

  $scope.me = function() {
    Facebook.api('/me', function(response) {
      $http({
        url: '/auth/facebook/callback',
        method: 'GET'
      }).success(function(data) {
        window.location.reload(true);
      }).error(function(msg) {
        $scope.user = {};
        flash.error = msg;
      });
    });
  };
}]);
