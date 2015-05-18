angular.module('sportivation')
.controller('AuthCtrl', ['$scope', '$state', 'Auth', '$modal', 'flash',
  function($scope, $state, Auth, $modal, flash) {

    $scope.openRegister = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'RegisterModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: "md"
      });
    };

    $scope.register = function() {
     Auth.register($scope.user).then(function(){
       $state.go('complete_profile');
       flash.success = 'Your registration was successful. Please tell us more about the sportsperson in you !';
     }, function(error){
       flash.error = "";
       for (var k in error.data.errors) {
          // use hasOwnProperty to filter out keys from the Object.prototype
          if (error.data.errors.hasOwnProperty(k)) {
            flash.error +=  k + " " + error.data.errors[k] + "; ";
          }
        }
     });
    };

    // Hero Carousel Content
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

    // Portal Features Content
    $scope.portalFeatures = [
      {
        title:  "Feature A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien. Phasellus ultrices gravida massa luctus ornare. Suspendisse blandit quam elit, eu imperdiet neque semper",
      },
      {
        title:  "Feature B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien. Phasellus ultrices gravida massa luctus ornare. Suspendisse blandit quam elit, eu imperdiet neque semper",
      },
      {
        title:  "Feature C",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lobortis nisl, vitae iaculis sapien. Phasellus ultrices gravida massa luctus ornare. Suspendisse blandit quam elit, eu imperdiet neque semper",
      }
    ];
}]);
