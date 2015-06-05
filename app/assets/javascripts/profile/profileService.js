angular.module('sportivation')
.factory('ProfileService', ['apiService', function(apiService) {
  return {
    updateProfile: function(user) {
      return apiService.put('/profile/' + user.id, {"user": user});
    },

    getAddress: function(params) {
      return apiService.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params});
    },

    getProfile: function(user) {
      return apiService.get('/profile/' + user.id, {});
    }
  }
}]);
