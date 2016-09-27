angular.module('mural.service', [])


.service("MuralService", function($http, $q) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/murais')
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

        $http.get('http://localhost:8080/api/mural/'+muralId)
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

        $http.put('http://localhost:8080/api/mural/', mural)
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

        $http.delete('http://localhost:8080/api/mural/'+ muralId)
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

        $http.post('http://localhost:8080/api/mural/', mural)
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