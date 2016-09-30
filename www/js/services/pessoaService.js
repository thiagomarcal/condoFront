/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('pessoa.service', [])


  .service("PessoaService", function($http, $q) {



    function getLista() {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/pessoas')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }



    function get(pessoaId) {

      var deferred = $q.defer();

      $http.get('http://localhost:8080/api/pessoa/' + pessoaId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function put(pessoa) {

      var deferred = $q.defer();

      $http.put('http://localhost:8080/api/pessoa/', pessoa)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function deletar(pessoaId) {

      var deferred = $q.defer();

      $http.delete('http://localhost:8080/api/pessoa/'+ pessoaId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }


    function adicionar(pessoa) {

      var deferred = $q.defer();

      $http.post('http://localhost:8080/api/pessoa/', pessoa)
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
