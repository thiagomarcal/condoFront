angular.module('condominio.service', [])


.service("CondominioService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/condominios')
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

        $http.get('http://'+SERVIDOR.endereco+'/api/condominio/'+condominioId)
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

        $http.put('http://'+SERVIDOR.endereco+'/api/condominio/', condominio)
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

        $http.delete('http://'+SERVIDOR.endereco+'/api/condominio/'+ condominioId)
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

        $http.post('http://'+SERVIDOR.endereco+'/api/condominio/', condominio)
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