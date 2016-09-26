/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('apartamento.service', [])


  .service("ApartamentoService", function($http, $q) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/apartamentos')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function get(apartamentoId) {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/apartamento/' + apartamentoId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function put(apartamento) {

      var deferred = $q.defer();

      $http.put('http://localhost:8080/api/apartamento/', apartamento)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function deletar(apartamentoId) {

      var deferred = $q.defer();

      $http.delete('http://localhost:8080/api/apartamento/'+ apartamentoId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function adicionar(apartamento) {

      var deferred = $q.defer();

      $http.post('http://localhost:8080/api/apartamento/', apartamento)
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
