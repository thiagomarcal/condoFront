angular.module('condominios.controller', [])

.controller('CondominiosCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, CondominioService, condominios) {

	$rootScope.$on('listaCondominioAlterada', function() {
    	CondominioService.getLista().then(function (data) {
    		$scope.condominios = data;
    	});
	});


	$scope.condominios = condominios;

	$scope.editar = function(id) {
		$state.go('app.condominioEditar', {condominioId: id});
	};
	$scope.excluir = function(id) {
		CondominioService.deletar(id).then(function(data) {
			alert('Condominio removido com sucesso');
			$scope.$emit('listaCondominioAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};

	$scope.adicionar = function() {
		$state.go('app.condominioAdicionar');
	};

});