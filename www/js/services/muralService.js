angular.module('mural.service', [])


.service("MuralService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/murais')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(muralId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/mural/'+muralId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(mural) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/mural/', mural)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(muralId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/mural/'+ muralId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(mural) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/mural/', mural)
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