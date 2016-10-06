angular.module('visitante.service', [])


.service("VisitanteService", function($http, $q, SERVIDOR) {


  function getListaDeVisitantes() {

    var deferred = $q.defer();

    $http.get('http://'+SERVIDOR.endereco+'/api/visitantes')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  }


  function get(visitanteId) {

    var deferred = $q.defer();

    $http.get('http://'+SERVIDOR.endereco+'/api/visitante/'+visitanteId)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  }


  function put(visitante) {

    var deferred = $q.defer();

    $http.put('http://'+SERVIDOR.endereco+'/api/visitante/', visitante)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  }


  function deletar(visitanteId) {

    var deferred = $q.defer();

    $http.delete('http://'+SERVIDOR.endereco+'/api/visitante/'+ visitanteId)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  }


  function adicionar(visitante) {

    var deferred = $q.defer();

    $http.post('http://'+SERVIDOR.endereco+'/api/visitante/', visitante)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  }


  return {
    getListaDeVisitantes: getListaDeVisitantes,
    get: get,
    put: put,
    deletar: deletar,
    adicionar: adicionar,
  };



});
