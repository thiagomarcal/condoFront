/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('edificio.service', [])


  .service("EdificioService", function($http, $q) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/edificios')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }



    function get(edificioId) {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/edificio/' + edificioId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function put(edificio) {

      var deferred = $q.defer();

      $http.put('http://localhost:8080/api/edificio/', edificio)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function deletar(edificioId) {

      var deferred = $q.defer();

      $http.delete('http://localhost:8080/api/edificio/'+ edificioId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function adicionar(edificio) {

      var deferred = $q.defer();

      $http.post('http://localhost:8080/api/edificio/', edificio)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }



    return {
      getLista: getLista,
      get: get,
      put: put,
      deeletar: deletar,
      adicionar: adicionar,

    };

  });
