angular.module('reserva.service', [])


.service("ReservaService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/reservas')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(reservaId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/reserva/'+reservaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(reserva) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/reserva/', reserva)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(reservaId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/reserva/'+ reservaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(reserva) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/reserva/', reserva)
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