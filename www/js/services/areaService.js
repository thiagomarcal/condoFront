angular.module('area.service', [])


.service("AreaService", function($http, $q, SERVIDOR) {

    function getLista() {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/areas')
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function get(areaId) {

        var deferred = $q.defer();

        $http.get('http://'+SERVIDOR.endereco+'/api/area/'+areaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function put(area) {

        var deferred = $q.defer();

        $http.put('http://'+SERVIDOR.endereco+'/api/area/', area)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function deletar(areaId) {

        var deferred = $q.defer();

        $http.delete('http://'+SERVIDOR.endereco+'/api/area/'+ areaId)
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(response) {
           deferred.reject(response);
         });

         return deferred.promise;
    }

    function adicionar(area) {

        var deferred = $q.defer();

        $http.post('http://'+SERVIDOR.endereco+'/api/area/', area)
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