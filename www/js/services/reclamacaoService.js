angular.module('reclamacao.service', [])


.service("ReclamacaoService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/reclamacao')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(reclamacaoId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/reclamacao/'+reclamacaoId)
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

        $http.get('http://'+SERVIDOR.endereco+'/api/reclamacoespendentes')
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

        $http.get('http://'+SERVIDOR.endereco+'/api/minhasreclamacoes')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(reclamacao) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/reclamacao/', reclamacao)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(reclamacaoId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/reclamacao/'+ reclamacaoId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(reclamacao) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/reclamacao/', reclamacao)
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