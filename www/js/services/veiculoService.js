angular.module('veiculo.service', [])


  .service("VeiculoService", function($http, $q) {


    function getLista() {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/veiculos')
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

      $http.get('http://localhost:8080/api/veiculo/'+ veiculoId)
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

      $http.put('http://localhost:8080/api/veiculo/', veiculo)
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

      $http.delete('http://localhost:8080/api/veiculo/'+ veiculoId)
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

      $http.post('http://localhost:8080/api/veiculo/', veiculo)
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
