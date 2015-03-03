angular.module('sportivation')
.controller('AuthCtrl', ['$scope', '$state', 'Auth',
  function($scope, $state, Auth){
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
      text:'First Slide'
    },{
      //image:'http://images.wallpapersmela.com/2014/08/Cricket-Ball-And-Bat-Wallpaper-2014.jpg',
      text:'Second Slide'
    },{
      //image:'http://www.obilesky.com/wallpapers/allimg/c120729/13435563CK0-13J0.jpg',
      text:'Third Slide'
    },{
      //image:'http://goodmenproject.com/wp-content/uploads/2011/03/basketball1.jpg',
      text:'Fourth Slide'
    }
  ];
}]);