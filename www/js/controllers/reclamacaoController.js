/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('reclamacao.controller', [])

  .controller('ReclamacaoCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, ReclamacaoService, reclamacao, reclamacoes, moradores, apartamentos) {

    $scope.reclamacao = reclamacao;
    $scope.reclamacoes = reclamacoes;
    $scope.moradores = moradores;
    $scope.apartamentos = apartamentos;


    $rootScope.$on('listaReclamacaoAlterada', function() {
      ReclamacaoService.getLista().then(function (data) {
        $scope.reclamacoes = data;
      });
    });


    $scope.editarReclamacao = function(id) {
      $state.go('app.reclamacaoEditar', {reclamacaoId: id});
    };


    $scope.excluirReclamacao = function(id) {
      ReclamacaoService.deletar(id).then(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Reclamação removida com sucesso!'
        });
        $scope.$emit('listaReclamacaoAlterada');
        $state.go($state.current, {}, {
          reload: true});
      });
    };

    $scope.adicionarReclamacao = function() {
      $state.go('app.reclamacaoAdicionar');
    };

    $scope.enviarEdicaoDeReclamacao = function () {
      ReclamacaoService.put($scope.reclamacao).then(function (reclamacao) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Reclamação alterada com sucesso!'
        });
        $scope.$emit('listaReclamacaoAlterada');
        $state.go('app.reclamacoes', {reclamacaoId: reclamacao.id});
      });
    };


    $scope.novaReclamacao = function () {
      ReclamacaoService.adicionar($scope.reclamacao).then(function (reclamacao) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Reclamação Criada com sucesso!'
        });
        $scope.$emit('listaReclamacaoAlterada');
        $state.go('app.reclamacoes', {}, {
          reload: true});
      });
    };


  });
