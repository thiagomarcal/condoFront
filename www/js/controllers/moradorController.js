/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('morador.controller', [])

  .controller('MoradorCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, morador, moradores, MoradorService) {



    $scope.moradores = moradores;
    $scope.morador = morador;


    $rootScope.$on('listaMoradorAlterada', function () {
      EdificioService.getLista().then(function (data) {
        $scope.moradores = data;
      });
    });


    $scope.adicionaMorador = function() {
      $state.go('app.moradorAdicionar');
    };

    $scope.editarMorador = function(id) {
      $state.go('app.moradorEditar', {moradorId: id});
    };

    $scope.excluirMorador = function(id) {
      MoradorService.deletar(id).then(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Morador removido com sucesso!'
        });
        $scope.$emit('listaMoradorAlterada');
        $state.go($state.current, {}, {
          reload: true});
      });
    };


    $scope.enviarEdicao = function () {
      MoradorService.put($scope.morador).then(function (morador) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Morador Alterado com sucesso!'
        });
        $scope.$emit('listaMoradorAlterada');
        $state.go('app.morador', {moradorId: morador.id});
      });
    };


    $scope.enviarMoradorAdicao = function () {
      MoradorService.adicionar($scope.morador).then(function (morador) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Morador ' + morador.pessoa.nome + ' Criado com sucesso!'
        });
        $scope.$emit('listaMoradorAlterada');
        $state.go('app.moradores', {}, {
          reload: true});
      });
    };


  });
