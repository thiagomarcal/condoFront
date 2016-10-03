angular.module('mensagem.service', [])


.service("MensagemService", function($http, $q) {

    var mensagens= [];

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/mensagens')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(mensagemId) {

        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/mensagem/'+mensagemId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(mensagem) {

        var deferred = $q.defer();

        $http.put('http://localhost:8080/api/mensagem/', mensagem)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(mensagemId) {

        var deferred = $q.defer();

        $http.delete('http://localhost:8080/api/mensagem/'+ mensagemId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(mensagem) {

        var deferred = $q.defer();

        $http.post('http://localhost:8080/api/mensagem/', mensagem)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function getNovasMensagens() {
        return mensagens;
    }

    function setNovasMensagens(novasMensagem) {
        mensagens = novasMensagem;
    }

    return {
        getLista: getLista,
        get: get,
        put: put,
        deletar: deletar,
        adicionar: adicionar,
        getNovasMensagens: getNovasMensagens,
        setNovasMensagens: setNovasMensagens,
    };
});