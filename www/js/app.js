// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers', 'login.controller', 'auth.services', 'interceptor.factory', 'condominio.controller', 'condominio.service', 'bloco.controller',
                'bloco.service', 'area.controller', 'area.service', 'visitante.controller', 'visitante.service'])
//angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

      if ('data' in next && 'authorizedRoles' in next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          $state.go($state.current, {}, {reload: true});
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      }

      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }

      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.condominios', {
        url: '/condominios',
        views: {
          'menuContent': {
            templateUrl: 'templates/condominios.html',
            resolve: {
              condominios: function(CondominioService){
                return CondominioService.getLista();
              },
              condominio: function(){
                return {};
              }
            },

            controller: 'CondominioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.blocos', {
        url: '/blocos',
        views: {
          'menuContent': {
            templateUrl: 'templates/blocos.html',
            resolve: {
              blocos: function(BlocoService){
                return BlocoService.getLista();
              },
              bloco: function(){
                return {};
              },
              condominios: function(){
                return {};
              }
            },

            controller: 'BlocoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.areas', {
        url: '/areas',
        views: {
          'menuContent': {
            templateUrl: 'templates/areas.html',
            resolve: {
              areas: function(AreaService){
                return AreaService.getLista();
              },
              area: function(){
                return {};
              },
              condominios: function(){
                return {};
              }
            },

            controller: 'AreaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      })

      .state('app.condominio', {
        url: '/condominios/:condominioId',
        views: {
          'menuContent': {
            templateUrl: 'templates/condominio.html',
            resolve: {
              condominios: function(){
                return {};
              },
              condominio: function(CondominioService, $stateParams){
                return CondominioService.get($stateParams.condominioId);
              }
            },
            controller: 'CondominioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.bloco', {
        url: '/blocos/:blocoId',
        views: {
          'menuContent': {
            templateUrl: 'templates/bloco.html',
            resolve: {
              blocos: function(){
                return {};
              },
              bloco: function(BlocoService, $stateParams){
                return BlocoService.get($stateParams.blocoId);
              },
              condominios: function(){
                return {};
              }
            },
            controller: 'BlocoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })


      .state('app.area', {
        url: '/areas/:areaId',
        views: {
          'menuContent': {
            templateUrl: 'templates/area.html',
            resolve: {
              areas: function(){
                return {};
              },
              area: function(AreaService, $stateParams){
                return AreaService.get($stateParams.areaId);
              },
              condominios: function(){
                return {};
              }
            },
            controller: 'AreaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.condominioEditar', {
        url: '/condominios/editar/:condominioId',
        views: {
          'menuContent': {
            templateUrl: 'templates/condominio_editar.html',
            resolve: {
              condominios: function(){
                return {};
              },
              condominio: function(CondominioService, $stateParams){
                return CondominioService.get($stateParams.condominioId);
              }
            },
            controller: 'CondominioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.blocoEditar', {
        url: '/blocos/editar/:blocoId',
        views: {
          'menuContent': {
            templateUrl: 'templates/bloco_editar.html',
            resolve: {
              blocos: function(){
                return {};
              },
              bloco: function(BlocoService, $stateParams){
                return BlocoService.get($stateParams.blocoId);
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              }
            },
            controller: 'BlocoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.areaEditar', {
        url: '/areas/editar/:areaId',
        views: {
          'menuContent': {
            templateUrl: 'templates/area_editar.html',
            resolve: {
              areas: function(){
                return {};
              },
              area: function(AreaService, $stateParams){
                return AreaService.get($stateParams.areaId);
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              }
            },
            controller: 'AreaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.condominioAdicionar', {
        url: '/condominios/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/condominio_adicionar.html',
            resolve: {
              condominio: function(CondominioService, $stateParams){
                return {};
              },
              condominios: function(CondominioService){
                return {};
              }
            },
            controller: 'CondominioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.blocoAdicionar', {
        url: '/blocos/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/bloco_adicionar.html',
            resolve: {
              blocos: function(){
                return {};
              },
              bloco: function(BlocoService, $stateParams){
                return {};
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              }
            },
            controller: 'BlocoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.areaAdicionar', {
        url: '/areas/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/area_adicionar.html',
            resolve: {
              areas: function(){
                return {};
              },
              area: function(AreaService, $stateParams){
                return {};
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              }
            },
            controller: 'AreaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .state('app.visitantes', {
        url: '/visitantes',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitantes.html',
            resolve: {
              visitantes: function (VisitanteService) {
                return VisitanteService.getListaDeVisitantes();
              },
              visitante: function () {
                return {};app.visitanteEditar
              }
            },

            controller: 'VisitanteCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .state('app.visitanteEditar', {
        url: '/visitantes/editar/:visitanteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitante_editar.html',
            resolve: {
              visitantes: function () {
                return {};
              },
              visitante: function (VisitanteService, $stateParams) {
                return VisitanteService.get($stateParams.visitanteId);
              }
            },
            controller: 'VisitanteCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.visitante', {
        url: '/visitantes/:visitanteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitante.html',
            resolve: {
              visitantes: function () {
                return {};
              },
              visitante: function (VisitanteService, $stateParams) {
                return VisitanteService.get($stateParams.visitanteId);
              }
            },
            controller: 'VisitanteCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.visitanteAdicionar', {
        url: '/visitantes/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitante/visitante_adicionar.html',
            resolve: {
              visitantes: function () {
                return {};
              },
              visitante: function (VisitanteService, $stateParams) {
                return {};
              }
            },
            controller: 'VisitanteCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      });


    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get("$state");
      $state.go("app.playlists");
    });

  });
