/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('edificio.controller', [])

  .controller('EdificioCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, edificio, edificios, blocos, EdificioService) {

    $scope.edificios = edificios;
    $scope.edificio = edificio;
    $scope.blocos = blocos;

    $rootScope.$on('listaEdificioAlterada', function () {
      EdificioService.getLista().then(function (data) {
        $scope.edificios = data;
      });
    });

    $scope.adicionaEdificio = function() {
      $state.go('app.edificioAdicionar');
    };

    $scope.editarEdificio = function(id) {
      $state.go('app.edificioEditar', {edificioId: id});
    };

    $scope.excluirEdificio = function(id) {
      EdificioService.deletar(id).then(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Edificio removido com sucesso!'
        });
        $scope.$emit('listaEdificioAlterada');
        $state.go($state.current, {}, {
          reload: true});
      });
    };

    $scope.enviarEdicao = function () {
      EdificioService.put($scope.edificio).then(function (edificio) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Edificio Alterado com sucesso!'
        });
        $scope.$emit('listaEdificioAlterada');
        $state.go('app.edificio', {edificioId: edificio.id});
      });
    };


    $scope.enviarEdificioAdicao = function () {
      EdificioService.adicionar($scope.edificio).then(function (edificio) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Edificio ' + edificio.nome + ' Criado com sucesso!'
        });
        $scope.$emit('listaEdificioAlterada');
        $state.go('app.edificios', {}, {
          reload: true});
      });
    };


  });
