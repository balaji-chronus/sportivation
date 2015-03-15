angular.module('sportivation', ['ui.router', 'templates', 'Devise', 'ui.bootstrap','angular-flash.service', 'angular-flash.flash-alert-directive','duScroll', 'facebook'])
.config([
'$stateProvider',
'$urlRouterProvider',
'flashProvider',
'FacebookProvider',
function($stateProvider, $urlRouterProvider, flashProvider, FacebookProvider) {

  // Set your appId through the setAppId method or
  // use the shortcut in the initialize method directly.
  FacebookProvider.init('819356764767622');

  // Support bootstrap 3.0 "alert-danger" class with error flash types
  flashProvider.errorClassnames.push('alert-danger');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

    $urlRouterProvider.otherwise('login');
}]).controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
