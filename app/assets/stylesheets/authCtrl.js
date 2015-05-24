angular.module('sportivation')
.controller('AuthCtrl', ['$scope', '$state', 'Auth', '$modal', 'flash',
  function($scope, $state, Auth, $modal, flash) {

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
        headerText:'Content Header',
        text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        buttonText:'Get Started'
      },{
        headerText:'Content Header 1',
        text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        buttonText:'Get Started'
      },{
        headerText:'Content Header 2',
        text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        buttonText:'Get Started'
      },{
        headerText:'Content Header 3',
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
