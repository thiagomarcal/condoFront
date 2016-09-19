angular.module('condominio.controller', [])

.controller('CondominioCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, condominio, condominios,CondominioService) {

	$scope.condominios = condominios;
	$scope.condominio = condominio;

	$rootScope.$on('listaCondominioAlterada', function() {
    	CondominioService.getLista().then(function (data) {
    		$scope.condominios = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.condominioAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.condominioEditar', {condominioId: id});
	};

	$scope.excluir = function(id) {
		CondominioService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Condominio removido com sucesso!'
			});
			$scope.$emit('listaCondominioAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		CondominioService.put($scope.condominio).then(function (condominio) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Condominio Alterado com sucesso!'
			});
			$scope.$emit('listaCondominioAlterada');
			$state.go('app.condominio', {condominioId: condominio.id});
		});
	};

	$scope.enviarAdicao = function () {
		CondominioService.adicionar($scope.condominio).then(function (condominio) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Condominio Criado com sucesso!'
			});
			$scope.$emit('listaCondominioAlterada');
			$state.go('app.condominios', {}, {
				reload: true});
		});
	};


});