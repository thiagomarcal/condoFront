/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('morador.service', [])


  .service("MoradorService", function($http, $q, SERVIDOR) {



    function getLista() {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/moradores')
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

      $http.get('http://'+SERVIDOR.endereco+'/api/morador/' + moradorId)
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

      $http.put('http://'+SERVIDOR.endereco+'/api/morador/', morador)
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

      $http.delete('http://'+SERVIDOR.endereco+'/api/morador/'+ moradorId)
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

      $http.post('http://'+SERVIDOR.endereco+'/api/morador/', morador)
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
