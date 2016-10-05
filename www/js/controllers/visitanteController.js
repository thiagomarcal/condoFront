/**
 * Created by marcomarques on 21/09/16.
 */
angular.module('visitante.controller', [])

.controller('VisitanteCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, visitante, visitantes,VisitanteService, blocos, BlocoService, apartamento, apartamentos) {

  $scope.visitantes = visitantes;
  $scope.visitante = visitante;
  $scope.apartamento = apartamento;
  $scope.apartamentos = apartamentos;
  $scope.blocos = blocos;

  $rootScope.$on('listaVisitanteAlterada', function() {
    VisitanteService.getListaDeVisitantes().then(function (data) {
      $scope.visitantes = data;
    });
  });


  $scope.editarVisitante = function(id) {
    $state.go('app.visitanteEditar', {visitanteId: id});
  };


  $scope.excluirVisitante = function(id) {
    VisitanteService.deletar(id).then(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'CondoApp',
        template: 'Visitante removido com sucesso!'
      });
      $scope.$emit('listaVisitanteAlterada');
      $state.go($state.current, {}, {
        reload: true});
    });
  };


  $scope.adicionarVisitante = function() {
    $state.go('app.visitanteAdicionar');
  };

  $scope.enviarEdicaoDeVisitante = function () {
    VisitanteService.put($scope.visitante).then(function (visitante) {
      var alertPopup = $ionicPopup.alert({
        title: 'CondoApp',
        template: 'Visitante Alterado com sucesso!'
      });
      $scope.$emit('listaVisitanteAlterada');
      $state.go('app.visitantes', {visitanteId: visitante.id});
    });
  };

  $scope.novoVisitante = function () {
    VisitanteService.adicionar($scope.visitante).then(function (visitante) {
      var alertPopup = $ionicPopup.alert({
        title: 'CondoApp',
        template: 'Visitante Criado com sucesso!'
      });
      $scope.$emit('listaVisitanteAlterada');
      $state.go('app.visitantes', {}, {
        reload: true});
    });
  };


});
