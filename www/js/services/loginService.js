angular.module('login.service', [])


.service("LoginService", function($http, $q) {

    function loginUser(name, pw) {

        var authenticationRequest = {usename: name, password: pw};

        var deferred = $q.defer();

        $http.post('localhost:8080/auth', authenticationRequest)
         .success(function(data) {
           deferred.resolve(response);
         })
         .error(function(response) {
           deferred.reject('Credenciais invalidas!');
         });

         return deferred.promise;
    }

    return {
        loginUser: loginUser
    };
});