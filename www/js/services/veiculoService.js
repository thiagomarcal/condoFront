angular.module('veiculo.service', [])


  .service("VeiculoService", function($http, $q, SERVIDOR) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/veiculos')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function get(veiculoId) {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/veiculo/'+ veiculoId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }



    function put(veiculo) {

      var deferred = $q.defer();

      $http.put('http://'+SERVIDOR.endereco+'/api/veiculo/', veiculo)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function deletar(veiculoId) {

      var deferred = $q.defer();

      $http.delete('http://'+SERVIDOR.endereco+'/api/veiculo/'+ veiculoId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function adicionar(veiculo) {

      var deferred = $q.defer();

      $http.post('http://'+SERVIDOR.endereco+'/api/veiculo/', veiculo)
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
