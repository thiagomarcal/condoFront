angular.module('bloco.service', [])


.service("BlocoService", function($http, $q) {

    function getLista() {

        var deferred = $q.defer();

      $http.get('http://localhost:8080/api/blocos')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function get(blocoId) {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/bloco/'+blocoId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(bloco) {

        var deferred = $q.defer();

        $http.put('http://localhost:8080/api/bloco/', bloco)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(blocoId) {

        var deferred = $q.defer();

        $http.delete('http://localhost:8080/api/bloco/'+ blocoId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(bloco) {

        var deferred = $q.defer();

        $http.post('http://localhost:8080/api/bloco/', bloco)
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
