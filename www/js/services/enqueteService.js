angular.module('enquete.service', [])


.service("EnqueteService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/enquetes')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(enqueteId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/enquete/'+enqueteId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    // function getListaPendentes() {

    //     var deferred = $q.defer();

    //     $http.get('http://'+SERVIDOR.endereco+'/api/encomendaspendentes')
    //      .success(function(data) {
    //        deferred.resolve(data);
    //      })
    //      .error(function(response) {
    //        deferred.reject(response);
    //      });

    //      return deferred.promise;
    // }

    // function getListaMorador() {

    //     var deferred = $q.defer();

    //     $http.get('http://'+SERVIDOR.endereco+'/api/minhasencomendas')
    //      .success(function(data) {
    //        deferred.resolve(data);
    //      })
    //      .error(function(response) {
    //        deferred.reject(response);
    //      });

    //      return deferred.promise;
    // }

    function put(enquete) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/enquete/', enquete)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(enqueteId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/enquete/'+ enqueteId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(enquete) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/enquete/', enquete)
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
        // getListaPendentes: getListaPendentes,
        // getListaMorador: getListaMorador,
        get: get,
        put: put,
        deletar: deletar,
        adicionar: adicionar,
    };
});