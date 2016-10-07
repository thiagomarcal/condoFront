angular.module('usuario.service', [])


.service("UsuarioService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/users')
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

        $http.get('http://'+SERVIDOR.endereco+'/api/user/?username='+username)
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

        $http.put('http://'+SERVIDOR.endereco+'/api/user/', usuario)
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

        $http.delete('http://'+SERVIDOR.endereco+'/api/user?username=' + usuario)
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

        $http.post('http://'+SERVIDOR.endereco+'/api/user/', usuario)
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