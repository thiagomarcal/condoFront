angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, $ionicHistory, AuthService, AUTH_EVENTS, SocketService, MensagemService, $ionicPlatform, $cordovaLocalNotification) {
  $scope.username = AuthService.username();

  $scope.messages = [];
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.logout = function () {
    AuthService.logout();
    $ionicHistory.clearCache().then(function(){
      $ionicHistory.clearHistory();
      $state.go('login', {}, {reload:true});
    });

  };

  SocketService.receive().then(null, null, function(message) {
    
    $ionicPlatform.ready(function () {
            $cordovaLocalNotification.schedule({
            id: 1,
            text: message.mensagem,
            title: message.assunto
          }).then(function () {
            $state.go('app.mensagem', {mensagemId: message.id}, {
              reload: true});
          });
    });

    $scope.messages.push(message);
  });

  $scope.mensagens = function() {
    MensagemService.setNovasMensagens($scope.messages);
    $scope.messages = [];   
    $state.go('app.mensagens');
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
