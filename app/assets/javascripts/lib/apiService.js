angular.module('sportivation')
.service("apiService", ["$state", "$http", "$q",
  function($state, $http, $q) {
    this.get = function(serverPath, config){
      var request = $http.get(serverPath, config);
      return this.postProcess(request);
    }

    this.delete = function(serverPath, config){
      var request = $http.delete(serverPath, config)
      return this.postProcess(request);
    }

    this.post = function(serverPath, data, config){
      var request = $http.post(serverPath, data, config);
      return this.postProcess(request);
    }

    this.put = function(serverPath, data, config){
      var request = $http.put(serverPath, data, config);
      return this.postProcess(request);
    }

    this.postProcess = function(request) {
      var deferred = $q.defer();

      request.then(function(res){
        deferred.resolve(res);
      }, function(res){
        deferred.reject(res);
      })

      return deferred.promise;
    }

    function serializeData(data, prefix) {
      if (!angular.isObject(data)) {
        return((data == null) ? "" : data.toString());
      }
      var buffer = [];
      for (var key in data) {
        if (!data.hasOwnProperty(key)) {
          continue;
        }
        var k = prefix ? prefix + "[" + key + "]" : key, value = data[key];
        buffer.push(typeof value == "object"
          ? serializeData(value, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent((value == null) ? "" : value));
      }
      return buffer.join("&");
    }
  }]
)
