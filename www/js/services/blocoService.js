angular.module('bloco.service', [])


.service("BlocoService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

      $http.get('http://'+SERVIDOR.endereco+'/api/blocos')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function get(blocoId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/bloco/'+blocoId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(bloco) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/bloco/', bloco)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(blocoId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/bloco/'+ blocoId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(bloco) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/bloco/', bloco)
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
