angular.module('sportivation', ['ui.router', 'templates', 'Devise',  'ui.bootstrap', 'mgcrea.ngStrap', 'angular-flash.service', 'angular-flash.flash-alert-directive','duScroll', 'facebook', 'ngAnimate'])
.config([
'$stateProvider',
'$urlRouterProvider',
'flashProvider',
'FacebookProvider',
'$modalProvider',
function($stateProvider, $urlRouterProvider, flashProvider, FacebookProvider, $modalProvider) {

  // Set your appId through the setAppId method or
  // use the shortcut in the initialize method directly.
  FacebookProvider.init('819356764767622');

  // Support bootstrap 3.0 "alert-danger" class with error flash types
  flashProvider.errorClassnames.push('alert-danger');

  // Modal Defaults
  angular.extend($modalProvider.defaults, {
    animation: 'am-flip-x'
  });

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      data: {
        requireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      data: {
        requireLogin: false
      },
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
      data: {
        requireLogin: false
      },
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('complete_profile', {
      url: '/complete_profile',
      templateUrl: 'profile/_complete_profile.html',
      controller: 'ProfileCtrl',
      data: {
        requireLogin: true
      }
    })
    .state('complete_profile.personal_info', {
      url: '/personal_info',
      templateUrl: 'profile/_personal_info.html'
    })
    .state('complete_profile.sports_profile_info', {
      url: '/sports_profile_info',
      templateUrl: 'profile/_sports_profile_info.html'
    })
    .state('complete_profile.interests', {
      url: '/interests',
      templateUrl: 'profile/_interests.html'
    });

    $urlRouterProvider.otherwise('login');
}]).run(function ($rootScope, $state, Auth, flash) {
  var bypass;
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin) {
      if (bypass)
      {
        bypass = false;
        return;
      }

      event.preventDefault();
      Auth.currentUser().then(function(){
        bypass = true;
        $state.go(toState, toParams)
      }, function(){
        flash.error = 'Authorization error. Please login to continue';
        return $state.go("login");
      });
    }
  })
}).directive('requiredFieldBlock', function($compile) {
  return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        var x = angular.element('<div class="required-icon" title="Required Field" bs-tooltip><div class="text text-danger">*</div></div>');
        elem.append(x);
        $compile(x)(scope);
      }
  };
});;
