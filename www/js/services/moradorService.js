/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('morador.service', [])


  .service("MoradorService", function($http, $q) {



    function getLista() {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/moradores')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }



    function get(moradorId) {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/morador/' + moradorId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function put(morador) {

      var deferred = $q.defer();

      $http.put('http://localhost:8080/api/morador/', morador)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function deletar(moradorId) {

      var deferred = $q.defer();

      $http.delete('http://localhost:8080/api/morador/'+ moradorId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function adicionar(morador) {

      var deferred = $q.defer();

      $http.post('http://localhost:8080/api/morador/', morador)
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
      deletar: deletar,
      adicionar: adicionar,

    };


  });
