/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('apartamento.service', [])


  .service("ApartamentoService", function($http, $q, SERVIDOR) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/apartamentos')
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

      $http.get('http://'+SERVIDOR.endereco+'/api/apartamento/' + apartamentoId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function getListaEdificio(edificioId) {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/apartamentos/edificio/'+edificioId)
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

      $http.put('http://'+SERVIDOR.endereco+'/api/apartamento/', apartamento)
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

      $http.delete('http://'+SERVIDOR.endereco+'/api/apartamento/'+ apartamentoId)
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

      $http.post('http://'+SERVIDOR.endereco+'/api/apartamento/', apartamento)
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
      getListaEdificio: getListaEdificio,
      get: get,
      put: put,
      deletar: deletar,
      adicionar: adicionar,

    };

  });
