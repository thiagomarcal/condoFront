angular.module('auth.services', [])


.service("AuthService", function($http, $q, USER_ROLES, $state) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var LOCAL_USERNAME = 'yourUsername';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        var user = window.localStorage.getItem(LOCAL_USERNAME);
        if (token && user) {
            useCredentials(token, user);
        }
    }

    function storeUserCredentials(token, userT) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        window.localStorage.setItem(LOCAL_USERNAME, userT);
        useCredentials(token, userT);
    }

    function useCredentials(token, userT) {
        username = userT;
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common['X-Auth-Token'] = token;

        obterRole().then(function (argument) {
             $state.go('app.playlists');
        });
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(LOCAL_USERNAME);
    }

    var obterRole = function() {
        var deferred = $q.defer();

        $http.get('http://localhost:8080/api/user/roles')
         .success(function(user) {
            role = user.roles;
            deferred.resolve(); 
         })
         .error(function(response) {
           deferred.reject('Login Failed.');
         });

        return deferred.promise; 
    };

    var login = function(name, pw) {

        var authenticationRequest = {username: name, password: pw};

        var deferred = $q.defer();

        $http.post('http://localhost:8080/api/auth', authenticationRequest)
         .success(function(data) {
           storeUserCredentials(data.token, name);
           deferred.resolve('Login success.');
         })
         .error(function(response) {
           deferred.reject('Login Failed.');
         });

         return deferred.promise;
    };


    var logout = function() {
        destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {
            return isAuthenticated;
        },
        username: function() {
            return username;
        },
        role: function() {
            return role;
        }
    };

});