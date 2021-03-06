// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ui.rCalendar', 'starter.controllers', 'login.controller', 'auth.services', 'interceptor.factory', 'condominio.controller', 'condominio.service',
                'bloco.controller', 'bloco.service', 'area.controller', 'area.service', 'usuario.controller', 'usuario.service', 'mural.controller', 'mural.service',
                  'visitante.controller', 'visitante.service', 'apartamento.controller', 'apartamento.service',
                  'edificio.service', 'edificio.controller', 'morador.controller', 'morador.service', 'pessoa.service', 'mensagem.controller', 'mensagem.service', 'socket.service', 'reservasocket.service', 'controlesocket.service', 'usersocket.service',  
                   'veiculo.service', 'veiculo.controller', 'reserva.service', 'reserva.controller', 'controle.controller', 'cadastro.controller', 'encomenda.service', 'encomenda.controller', 'reclamacao.service', 'reclamacao.controller'])


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

      .state('app.murais', {
        url: '/murais',
        views: {
          'menuContent': {
            templateUrl: 'templates/murais.html',
            resolve: {
              murais: function(MuralService){
                return MuralService.getLista();
              },
              mural: function(){
                return {};
              },
              condominio: function(){
                return {};
              },
              condominios: function(){
                return {};
              },
              bloco: function(){
                return {};
              },
              blocos: function(){
                return {};
              }
            },
            controller: 'MuralCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.usuarios', {
        url: '/usuarios',
        views: {
          'menuContent': {
            templateUrl: 'templates/usuarios.html',
            resolve: {
              usuarios: function(UsuarioService){
                return UsuarioService.getLista();
              },
              usuario: function(){
                return {};
              }
            },

            controller: 'UsuarioCtrl'
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

      .state('app.mural', {
        url: '/murais/:muralId',
        views: {
          'menuContent': {
            templateUrl: 'templates/mural.html',
            resolve: {
              murais: function(){
                return {};
              },
              mural: function(MuralService, $stateParams){
                return MuralService.get($stateParams.muralId);
              },
              condominio: function(){
                return {};
              },
              condominios: function(){
                return {};
              },
              bloco: function(){
                return {};
              },
              blocos: function(){
                return {};
              }
            },
            controller: 'MuralCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.usuario', {
        url: '/usuarios/:username',
        views: {
          'menuContent': {
            templateUrl: 'templates/usuario.html',
            resolve: {
              usuarios: function(){
                return {};
              },
              usuario: function(UsuarioService, $stateParams){
                return UsuarioService.get($stateParams.username);
              }
            },
            controller: 'UsuarioCtrl'
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

      .state('app.muralEditar', {
        url: '/murais/editar/:muralId',
        views: {
          'menuContent': {
            templateUrl: 'templates/mural_editar.html',
            resolve: {
              murais: function(){
                return {};
              },
              mural: function(MuralService, $stateParams){
                return MuralService.get($stateParams.muralId);
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              },
              condominio: function(){
                return {};
              },
              blocos: function(BlocoService){
                return BlocoService.getLista();
              },
              bloco: function(){
                return {};
              }

            },
            controller: 'MuralCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.usuarioEditar', {
        url: '/usuarios/editar/:username',
        views: {
          'menuContent': {
            templateUrl: 'templates/usuario_editar.html',
            resolve: {
              usuarios: function(){
                return {};
              },
              usuario: function(UsuarioService, $stateParams){
                return UsuarioService.get($stateParams.username);
              }
            },
            controller: 'UsuarioCtrl'
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

      .state('app.muralAdicionar', {
        url: '/murais/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/mural_adicionar.html',
            resolve: {
              mural: function(MuralService, $stateParams){
                return {};
              },
              murais: function(MuralService){
                return {};
              },
              condominio: function(){
                return {};
              },
              condominios: function(CondominioService){
                return CondominioService.getLista();
              },
              bloco: function(){
                return {};
              },
              blocos: function(BlocoService){
                return BlocoService.getLista();
              }
            },
            controller: 'MuralCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })


      .state('app.usuarioAdicionar', {
        url: '/usuarios/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/usuario_adicionar.html',
            resolve: {
              usuario: function(UsuarioService, $stateParams){
                return {};
              },
              usuarios: function(UsuarioService){
                return {};
              }
            },
            controller: 'UsuarioCtrl'
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
            templateUrl: 'templates/visitante/visitantes.html',
            resolve: {
              visitantes: function (VisitanteService) {
                return VisitanteService.getListaDeVisitantes();
              },
              visitante: function () {
                return {};
              },
              blocos: function () {
                return {};
              },
              apartamento : function () {
                return {};
              },
              apartamentos: function() {
                return {};
              }

            },
            controller: 'VisitanteCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })
      .state('app.visitanteEditar', {
        url: '/visitantes/editar/:visitanteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitante/visitante_editar.html',
            resolve: {
              visitantes: function () {
                return {};
              },
              visitante: function (VisitanteService, $stateParams) {
                return VisitanteService.get($stateParams.visitanteId);
              },
              blocos: function (BlocoService) {
                return BlocoService.getLista();
              },
              apartamento : function () {
                return {};
              },
              apartamentos: function (ApartamentoService) {
                return ApartamentoService.getLista();
              }
            },
            controller: 'VisitanteCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin]}
      })
      .state('app.visitante', {
        url: '/visitantes/:visitanteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/visitante/visitante.html', resolve: {
              visitantes: function () {
                return {};
              }, visitante: function (VisitanteService, $stateParams) {
                return VisitanteService.get($stateParams.visitanteId);
              }, blocos: function () {
                return {};
              },
              apartamento : function () {
                return {};
              },
              apartamentos: function() {
                return {};
              }
            }, controller: 'VisitanteCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.visitanteAdicionar', {
      url: '/visitantes/adicionar/',
      views: {
        'menuContent': {
          templateUrl: 'templates/visitante/visitante_adicionar.html',
          resolve: {
            visitantes: function () {
              return {};
            }, visitante: function (VisitanteService, $stateParams) {
              return {};
            }, blocos: function (BlocoService) {
              return BlocoService.getLista();
            },
            apartamento : function () {
              return {};
            },
            apartamentos: function (ApartamentoService) {
              return ApartamentoService.getLista();
            }
          },
          controller: 'VisitanteCtrl'
        }
      },
      data: {authorizedRoles: [USER_ROLES.admin]}
    })
      .state('app.apartamentos', {
        url: '/apartamentos',
        views: {
          'menuContent': {
            templateUrl: 'templates/apartamento/apartamentos.html',
            resolve: {
              apartamentos: function (ApartamentoService) {
                return ApartamentoService.getLista();
              },
              apartamento: function () {
                return {};
              },
              edificios: function () {
                return {};
              }
            },
            controller: 'ApartamentoCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.apartamentoEditar', {
        url: '/apartamentos/editar/:apartamentoId',
        views: {
          'menuContent': {
            templateUrl: 'templates/apartamento/apartamento_editar.html',
            resolve: {
              apartamentos: function(){
                return {};
              },
              apartamento: function(ApartamentoService, $stateParams){
                return ApartamentoService.get($stateParams.apartamentoId);
              },
              edificios: function(EdificioService){
                return EdificioService.getLista();
              }
            },
            controller: 'ApartamentoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .state('app.apartamento', {
        url: '/apartamentos/:apartamentoId',
        views: {
          'menuContent': {
            templateUrl: 'templates/apartamento/apartamento.html', resolve: {
              apartamentos: function () {
                return {};
              },
              apartamento: function (ApartamentoService, $stateParams) {
                return ApartamentoService.get($stateParams.apartamentoId);
              },
              edificios: function () {
                return {};
              }
            }, controller: 'ApartamentoCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin]}
      })


      .state('app.apartamentoAdicionar', {
        url: '/apartamentos/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/apartamento/apartamento_adicionar.html',
            resolve: {
              apartamentos: function(){
                return {};
              },
              apartamento: function(ApartamentoService, $stateParams){
                return {};
              },
              edificios: function(EdificioService){
                return EdificioService.getLista();
              }
            },
            controller: 'ApartamentoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.edificios', {
        url: '/edificios',
        views: {
          'menuContent': {
            templateUrl: 'templates/edificio/edificios.html',
            resolve: {
              edificios: function (EdificioService) {
                return EdificioService.getLista();
              },
              edificio: function () {
                return {};
              },
              blocos: function () {
                return {};
              }
            },
            controller: 'EdificioCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.edificioEditar', {
        url: '/edificios/editar/:edificioId',
        views: {
          'menuContent': {
            templateUrl: 'templates/edificio/edificio_editar.html',
            resolve: {
              edificios: function(){
                return {};
              },
              edificio: function(EdificioService, $stateParams){
                return EdificioService.get($stateParams.edificioId);
              },
              blocos: function(BlocoService){
                return BlocoService.getLista();
              }
            },
            controller: 'EdificioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.edificio', {
        url: '/edificio/:edificioId',
        views: {
          'menuContent': {
            templateUrl: 'templates/edificio/edificio.html', resolve: {
              edificios: function () {
                return {};
              },
              edificio: function (EdificioService, $stateParams) {
                return EdificioService.get($stateParams.edificioId);
              },
              blocos: function () {
                return {};
              }
            }, controller: 'EdificioCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin]}
      })
      .state('app.edificioAdicionar', {
        url: '/edificio/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/edificio/edificio_adicionar.html',
            resolve: {
              edificios: function(){
                return {};
              },
              edificio: function(EdificioService, $stateParams){
                return {};
              },
              blocos: function(BlocoService){
                return BlocoService.getLista();
              }
            },
            controller: 'EdificioCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.moradores', {
        url: '/moradores',
        views: {
          'menuContent': {
            templateUrl: 'templates/morador/moradores.html',
            resolve: {
              moradores: function (MoradorService) {
                return MoradorService.getLista();
              },
              morador: function () {
                return {};
              },
              pessoas: function(){
                return {};
              },
              apartamentos: function(){
                return {};
              }
            },
            controller: 'MoradorCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.morador', {
        url: '/moradores/:moradorId',
        views: {
          'menuContent': {
            templateUrl: 'templates/morador/morador.html', resolve: {
              moradores: function () {
                return {};
              },
              morador: function (MoradorService, $stateParams) {
                return MoradorService.get($stateParams.moradorId);
              },
              pessoas: function () {
                return {};
              },
              apartamentos: function () {
                return {};
              }
            }, controller: 'MoradorCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.moradorEditar', {
        url: '/moradores/editar/:moradorId',
        views: {
          'menuContent': {
            templateUrl: 'templates/morador/morador_editar.html',
            resolve: {
              moradores: function(){
                return {};
              },
              morador: function(MoradorService, $stateParams){
                return MoradorService.get($stateParams.edificioId);
              },
              pessoas: function(PessoaService){
                return PessoaService.getLista();
              },
              apartamentos: function(ApartamentoService){
                return ApartamentoService.getLista();
              }
            },
            controller: 'MoradorCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.moradorAdicionar', {
        url: '/morador/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/morador/morador_adicionar.html',
            resolve: {
              moradores: function(){
                return {};
              },
              morador: function(EdificioService, $stateParams){
                return {};
              },
              pessoas: function(PessoaService){
                return PessoaService.getLista();
              },
              apartamentos: function(ApartamentoService){
                return ApartamentoService.getLista();
              }
            },
            controller: 'MoradorCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

       .state('app.mensagens', {
        url: '/mensagens',
        views: {
          'menuContent': {
            templateUrl: 'templates/mensagem/mensagens.html',
            resolve: {
              mensagens: function (MensagemService) {
                return MensagemService.getLista();
              },
              mensagem: function () {
                return {};
              },
              murais: function(){
                return {};
              }
            },
            controller: 'MensagemCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      })

      .state('app.mensagem', {
        url: '/mensagens/:mensagemId',
        views: {
          'menuContent': {
            templateUrl: 'templates/mensagem/mensagem.html', resolve: {
              mensagens: function () {
                return {};
              },
              mensagem: function (MensagemService, $stateParams) {
                return MensagemService.get($stateParams.mensagemId);
              },
              murais: function () {
                return {};
              }
            }, controller: 'MensagemCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      })

      .state('app.mensagemEditar', {
        url: '/mensagens/editar/:mensagemId',
        views: {
          'menuContent': {
            templateUrl: 'templates/mensagem/mensagem_editar.html',
            resolve: {
              mensagens: function(){
                return {};
              },
              mensagem: function(MoradorService, $stateParams){
                return MensagemService.get($stateParams.mensagemId);
              },
              murais: function () {
                return {};
              }
            },
            controller: 'MensagemCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.mensagemAdicionar', {
        url: '/mensagem/adicionar/',
        views: {
          'menuContent': {
            templateUrl: 'templates/mensagem/mensagem_adicionar.html',
            resolve: {
              mensagens: function(){
                return {};
              },
              mensagem: function(MensagemService, $stateParams){
                return {};
              },
              murais: function(MuralService){
                return MuralService.getLista();
              }
            },
            controller: 'MensagemCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })

      .state('app.veiculos', {
        url: '/veiculos',
        views: {
          'menuContent': {
            templateUrl: 'templates/veiculo/veiculos.html',
            resolve: {
              veiculos: function (VeiculoService) {
                return VeiculoService.getLista();
              },
              veiculo: function () {
                return {};
              },
              morador: function () {
                return {};
              },
              moradores: function () {
                return {};
              }
            },
            controller: 'VeiculoCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })
        .state('app.veiculoEditar', {
          url: '/veiculo/editar/:veiculoId',
          views: {
            'menuContent': {
              templateUrl: 'templates/veiculo/veiculo_editar.html',
              resolve: {
                veiculos: function () {
                  return {};
                },
                veiculo: function (VeiculoService, $stateParams) {
                  return VeiculoService.get($stateParams.veiculoId);
                },
                morador: function () {
                  return {};
                },
                moradores: function (MoradorService) {
                  return MoradorService.getLista();
                }
              },
              controller: 'VeiculoCtrl'
            }
          },
          data: {authorizedRoles: [USER_ROLES.admin]}
        })
        .state('app.veiculo', {
          url: '/veiculo/:veiculoId',
          views: {
            'menuContent': {
              templateUrl: 'templates/veiculo/veiculo.html', resolve: {
                veiculos: function () {
                  return {};
                },
                veiculo: function (VeiculoService, $stateParams) {
                  return VeiculoService.get($stateParams.veiculoId);
                },
                morador: function () {
                  return {};
                },
                moradores: function () {
                  return {};
                }
              }, controller: 'VeiculoCtrl'
            }
          },
          data: {authorizedRoles: [USER_ROLES.admin]}
        })

        .state('app.veiculoAdicionar', {
          url: '/veiculo/adicionar/',
          views: {
            'menuContent': {
              templateUrl: 'templates/veiculo/veiculo_adicionar.html',
              resolve: {
                veiculos: function () {
                  return {};
                },
                veiculo: function (VeiculoService, $stateParams) {
                  return {};
                },
                morador: function () {
                  return {};
                },
                moradores: function (MoradorService) {
                  return MoradorService.getLista();
                }
              },
              controller: 'VeiculoCtrl'
            }
          },
          data: {authorizedRoles: [USER_ROLES.admin]}
        })

        .state('app.reservas', {
        url: '/reservas',
        views: {
          'menuContent': {
            templateUrl: 'templates/reserva/reservas.html',
            resolve: {
              reservas: function (ReservaService) {
                return ReservaService.getLista();
              },
              minhasReservas: function (ReservaService) {
                return ReservaService.getListaMorador();
              },
              reserva: function () {
                return {};
              },
              areas: function(){
                return {};
              }
            },
            controller: 'ReservaCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      })

      .state('app.reserva', {
        url: '/reservas/:reservaId',
        views: {
          'menuContent': {
            templateUrl: 'templates/reserva/reserva.html', resolve: {
              reservas: function () {
                return {};
              },
              minhasReservas: function () {
                return {};
              },
              reserva: function (ReservaService, $stateParams) {
                return ReservaService.get($stateParams.reservaId);
              },
              areas: function(){
                return {};
              }
            }, controller: 'ReservaCtrl'
          }
        },
        data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      })

      .state('app.reservaAdicionar', {
        url: '/reserva/adicionar/',
        params: {
            dataReserva: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/reserva/reserva_adicionar.html',
            resolve: {
              reservas: function(){
                return {};
              },
              minhasReservas: function(){
                return {};
              },
              reserva: function(){
                return {};
              },
              areas: function(AreaService){
                return AreaService.getLista();
              }
            },
            controller: 'ReservaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      })

      .state('app.controles', {
        url: '/controles',
        views: {
          'menuContent': {
            templateUrl: 'templates/controle/controles.html',
            resolve: {
              reservas: function (ReservaService) {
                return ReservaService.getListaPendentes();
              },
              reserva: function(){
                return {};
              },
              encomendas: function (EncomendaService) {
                return EncomendaService.getListaPendentes();
              },
              encomenda: function(){
                return {};
              },
              reclamacoes: function (ReclamacaoService) {
                return ReclamacaoService.getListaPendentes();
              },
              reclamacao: function(){
                return {};
              }
            },
            controller: 'ControleCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.controlesReservas', {
        url: '/controlesReservas',
        params: {
            reservasPendentes: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/controle/reservas.html',
            resolve: {
              reservas: function () {
                return {};
              },
              reserva: function () {
                return {};
              },
              encomenda: function () {
                return {};
              },
              encomendas: function () {
                return {};
              },
              reclamacao: function () {
                return {};
              },
              reclamacoes: function () {
                return {};
              }
            },
            controller: 'ControleCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.cadastros', {
        url: '/cadastros',
        views: {
          'menuContent': {
            templateUrl: 'templates/cadastro/cadastros.html',
            resolve: {
              
            },
            controller: 'CadastroCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.encomendas', {
        url: '/encomendas',
        views: {
          'menuContent': {
            templateUrl: 'templates/encomenda/encomendas.html',
            resolve: {
              encomendas: function (EncomendaService) {
                return EncomendaService.getLista();
              },
              encomenda: function () {
                return {};
              },
              moradores: function () {
                return {};
              }
            },
            controller: 'EncomendaCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })


      .state('app.minhasencomendas', {
        url: '/minhasencomendas',
        views: {
          'menuContent': {
            templateUrl: 'templates/encomenda/minhasencomendas.html',
            resolve: {
              encomendas: function (EncomendaService) {
                return EncomendaService.getListaMorador();
              },
              encomenda: function () {
                return {};
              },
              moradores: function () {
                return {};
              }
            },
            controller: 'EncomendaCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      })


      

      .state('app.encomenda', {
        url: '/encomenda/:encomendaId',
        views: {
          'menuContent': {
            templateUrl: 'templates/encomenda/encomenda.html', 
            resolve: {
              encomendas: function () {
                return {};
              },
              encomenda: function (EncomendaService, $stateParams) {
                return EncomendaService.get($stateParams.encomendaId);
              },
              moradores: function () {
                return {};
              }
            }, controller: 'EncomendaCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.encomendaAdicionar', {
        url: '/encomenda/adicionar/',
        params: {
            dataReserva: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/encomenda/encomenda_adicionar.html',
            resolve: {
              encomendas: function(){
                return {};
              },
              encomenda: function(){
                return {};
              },
              moradores: function (MoradorService) {
                return MoradorService.getLista();
              }
            },
            controller: 'EncomendaCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
       .state('app.controlesEncomendas', {
        url: '/controlesEncomendas',
        params: {
            encomendasPendentes: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/controle/encomendas.html',
            resolve: {
              reservas: function () {
                return {};
              },
              reserva: function () {
                return {};
              },
              encomendas: function () {
                return {};
              },
              encomenda: function () {
                return {};
              },
              reclamacoes: function () {
                return {};
              },
              reclamacao: function () {
                return {};
              }
            },
            controller: 'ControleCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.reclamacoes', {
        url: '/reclamacoes',
        views: {
          'menuContent': {
            templateUrl: 'templates/reclamacao/reclamacoes.html',
            resolve: {
              reclamacoes: function (ReclamacaoService) {
                return ReclamacaoService.getLista();
              },
              reclamacao: function () {
                return {};
              },
              areas: function () {
                return {};
              },
              blocos: function () {
                return {};
              }
            },
            controller: 'ReclamacaoCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

       .state('app.reclamacao', {
        url: '/reclamacao/:reclamacaoId',
        views: {
          'menuContent': {
            templateUrl: 'templates/reclamacao/reclamacao.html', 
            resolve: {
              reclamacoes: function () {
                return {};
              },
              reclamacao: function (ReclamacaoService, $stateParams) {
                return ReclamacaoService.get($stateParams.reclamacaoId);
              },
              areas: function () {
                return {};
              },
              blocos: function () {
                return {};
              }
            }, controller: 'ReclamacaoCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.reclamacaoAdicionar', {
        url: '/reclamacao/adicionar/',
        params: {
            dataReserva: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/reclamacao/reclamacao_adicionar.html',
            resolve: {
              reclamacoes: function(){
                return {};
              },
              reclamacao: function(){
                return {};
              },
              areas: function (AreaService) {
                return AreaService.getLista();
              },
              blocos: function (BlocoService) {
                return BlocoService.getLista();
              }
            },
            controller: 'ReclamacaoCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      })
       .state('app.controlesReclamacoes', {
        url: '/controlesReclamacoes',
        params: {
            reclamacoesPendentes: null
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/controle/reclamacoes.html',
            resolve: {
              reservas: function () {
                return {};
              },
              reserva: function () {
                return {};
              },
              encomendas: function () {
                return {};
              },
              encomenda: function () {
                return {};
              },
              reclamacoes: function () {
                return {};
              },
              reclamacao: function () {
                return {};
              }
            },
            controller: 'ControleCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin]}
      })

      .state('app.minhasreclamacoes', {
        url: '/minhasreclamacoes',
        views: {
          'menuContent': {
            templateUrl: 'templates/reclamacao/minhasreclamacoes.html',
            resolve: {
              reclamacoes: function (ReclamacaoService) {
                return ReclamacaoService.getListaMorador();
              },
              reclamacao: function(){
                return {};
              },
              areas: function () {
                return {};
              },
              blocos: function () {
                return {};
              }
            },
            controller: 'ReclamacaoCtrl'
          }
        }, data: {authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]}
      });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get("$state");
      $state.go("app.playlists");
    });

  });
