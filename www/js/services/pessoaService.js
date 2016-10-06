/**
 * Created by marcomarques on 25/09/16.
 */
angular.module('pessoa.service', [])


  .service("PessoaService", function($http, $q, SERVIDOR) {



    function getLista() {

      var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/pessoas')
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

      $http.get('http://'+SERVIDOR.endereco+'/api/pessoa/' + pessoaId)
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

      $http.put('http://'+SERVIDOR.endereco+'/api/pessoa/', pessoa)
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

      $http.delete('http://'+SERVIDOR.endereco+'/api/pessoa/'+ pessoaId)
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

      $http.post('http://'+SERVIDOR.endereco+'/api/pessoa/', pessoa)
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
