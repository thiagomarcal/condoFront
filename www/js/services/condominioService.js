angular.module('condominio.service', [])


.service("CondominioService", function($http, $q) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/condominios')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(condominioId) {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/condominio/'+condominioId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(condominio) {

        var deferred = $q.defer();

        $http.put('http://localhost:8080/api/condominio/', condominio)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(condominioId) {

        var deferred = $q.defer();

        $http.delete('http://localhost:8080/api/condominio/'+ condominioId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(condominio) {

        var deferred = $q.defer();

        $http.post('http://localhost:8080/api/condominio/', condominio)
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