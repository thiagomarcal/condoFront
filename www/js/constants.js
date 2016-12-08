angular.module('starter')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'ADMIN',
  root: 'ROOT',
  user: 'USER',
  public: 'PUBLIC'
})

.constant('SERVIDOR', {
  endereco: 'localhost:8080'
  //endereco: '192.168.1.133:8080'
});


