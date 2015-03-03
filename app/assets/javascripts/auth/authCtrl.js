angular.module('sportivation')
.controller('AuthCtrl', ['$scope', '$state', '$modal', 'Auth',
  function($scope, $state, $modal, Auth) {

  $scope.open = function(){
  var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'md'
    });
  };

    $scope.login = function() {
     Auth.login($scope.user).then(function(){
       $state.go('home');
     });
   };

   $scope.register = function() {
     Auth.register($scope.user).then(function(){
       $state.go('home');
     });
   };
   $scope.myInterval = 5000;
   $scope.slides = [{
      //image:'https://ourmaninproject.files.wordpress.com/2011/12/5174490944_6e407bc2ee_b.jpg',
      headerText:'Content Header',
      text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      buttonText:'Get Started'
    },{
      //image:'http://images.wallpapersmela.com/2014/08/Cricket-Ball-And-Bat-Wallpaper-2014.jpg',
      headerText:'Content Header',
      text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      buttonText:'Get Started'
    },{
      //image:'http://www.obilesky.com/wallpapers/allimg/c120729/13435563CK0-13J0.jpg',
      headerText:'Content Header',
      text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      buttonText:'Get Started'
    },{
      //image:'http://goodmenproject.com/wp-content/uploads/2011/03/basketball1.jpg',
      headerText:'Content Header',
      text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      buttonText:'Get Started'
    }
  ];
}]).controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
