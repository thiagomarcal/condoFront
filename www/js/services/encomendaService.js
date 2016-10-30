angular.module('encomenda.service', [])


.service("EncomendaService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/encomendas')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(encomendaId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/encomenda/'+encomendaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function getListaPendentes() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/encomendaspendentes')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function getListaMorador() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/minhasencomendas')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(encomenda) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/encomenda/', encomenda)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(encomendaId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/encomenda/'+ encomendaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(encomenda) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/encomenda/', encomenda)
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
        getListaPendentes: getListaPendentes,
        getListaMorador: getListaMorador,
        get: get,
        put: put,
        deletar: deletar,
        adicionar: adicionar,
    };
});