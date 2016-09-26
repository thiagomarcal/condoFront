angular.module('usuario.service', [])


.service("UsuarioService", function($http, $q) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/users')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(username) {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/user/?username='+username)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(usuario) {

        var deferred = $q.defer();

        $http.put('http://localhost:8080/api/user/', usuario)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(usuario) {

        var deferred = $q.defer();

        $http.delete('http://localhost:8080/api/user?username=' + usuario)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(usuario) {

        var deferred = $q.defer();

        $http.post('http://localhost:8080/api/user/', usuario)
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