/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('veiculo.controller', [])

  .controller('VeiculoCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, VeiculoService, veiculos, veiculo, moradores, morador) {

    $scope.veiculos = veiculos;
    $scope.veiculo = veiculo;
    $scope.morador = morador;
    $scope.moradores = moradores;

    $rootScope.$on('listaVeiculoAlterada', function() {
      VeiculoService.getLista().then(function (data) {
        $scope.veiculos = data;
      });
    });


    $scope.editarVeiculo = function(id) {
      $state.go('app.veiculoEditar', {veiculoId: id});
    };


    $scope.excluirVeiculo = function(id) {
      VeiculoService.deletar(id).then(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Veiculo removido com sucesso!'
        });
        $scope.$emit('listaVeiculoAlterada');
        $state.go($state.current, {}, {
          reload: true});
      });
    };

    $scope.adicionarVeiculo = function() {
      $state.go('app.veiculoAdicionar');
    };

    $scope.enviarEdicaoDeVeiculo = function () {
      VeiculoService.put($scope.veiculo).then(function (veiculo) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Veiculo Alterado com sucesso!'
        });
        $scope.$emit('listaVeiculoAlterada');
        $state.go('app.veiculos', {veiculoId: veiculo.id});
      });
    };


    $scope.novoVeiculo = function () {
      VeiculoService.adicionar($scope.veiculo).then(function (veiculo) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Veiculo Criado com sucesso!'
        });
        $scope.$emit('listaVeiculoAlterada');
        $state.go('app.veiculos', {}, {
          reload: true});
      });
    };


  });
