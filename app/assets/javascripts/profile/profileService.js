angular.module('sportivation')
.factory('ProfileService', function($http, $log, $q) {
    return {
      updateProfile: function(user) {
        var deferred = $q.defer();
        $http.put('/profile/' + user.id, {"user": user}).success(function(data){
          deferred.resolve({txnSuccess: data.txn_success});
        }).error(function(msg, code){
          deferred.reject(msg);
          $log.error(msg, code);
        });
        return deferred.promise;
      }
    }
  });
