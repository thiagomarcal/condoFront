/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('edificio.service', [])


  .service("EdificioService", function($http, $q, SERVIDOR) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/edificios')
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

      $http.get('http://'+SERVIDOR.endereco+'/api/edificio/' + edificioId)
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

      $http.put('http://'+SERVIDOR.endereco+'/api/edificio/', edificio)
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

      $http.delete('http://'+SERVIDOR.endereco+'/api/edificio/'+ edificioId)
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

      $http.post('http://'+SERVIDOR.endereco+'/api/edificio/', edificio)
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
