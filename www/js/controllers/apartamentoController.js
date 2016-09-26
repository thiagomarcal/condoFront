/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('apartamento.controller', [])

  .controller('ApartamentoCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, apartamento, apartamentos, ApartamentoService, blocos, BlocoService) {



    $scope.apartamentos = apartamentos;
    $scope.apartamento = apartamento;
    $scope.blocos = blocos;

    $rootScope.$on('listaApartamentoAlterada', function() {
      ApartamentoService.getLista().then(function (data) {
        $scope.apartamentos = data;
      });
    });


    $scope.adicionar = function() {
      $state.go('app.apartamentoAdicionar');
    };

    $scope.editar = function(id) {
      $state.go('app.apartamentoEditar', {apartamentoId: id});
    };

    $scope.excluir = function(id) {
      ApartamentoService.deletar(id).then(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Apartamento removido com sucesso!'
        });
        $scope.$emit('listaApartamentoAlterada');
        $state.go($state.current, {}, {
          reload: true});
      });
    };

    $scope.enviarEdicao = function () {
      ApartamentoService.put($scope.apartamento).then(function (apartamento) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Apartamento Alterado com sucesso!'
        });
        $scope.$emit('listaApartamentoAlterada');
        $state.go('app.apartamento', {apartamentoId: apartamento.id});
      });
    };


    $scope.enviarAdicao = function () {
      ApartamentoService.adicionar($scope.apartamento).then(function (apartamento) {
        var alertPopup = $ionicPopup.alert({
          title: 'CondoApp',
          template: 'Apartamento' + apartamento.nome + ' Criado com sucesso!'
        });
        $scope.$emit('listaApartamentoAlterada');
        $state.go('app.apartamentos', {}, {
          reload: true});
      });
    };



  });
