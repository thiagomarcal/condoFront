angular.module('bloco.controller', [])

.controller('BlocoCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, bloco, blocos,BlocoService, condominios, CondominioService) {

	$scope.blocos = blocos;
	$scope.bloco = bloco;
	$scope.condominios = condominios;

	$rootScope.$on('listaBlocoAlterada', function() {
    	BlocoService.getLista().then(function (data) {
    		$scope.blocos = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.blocoAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.blocoEditar', {blocoId: id});
	};

	$scope.excluir = function(id) {
		BlocoService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Bloco removido com sucesso!'
			});
			$scope.$emit('listaBlocoAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		BlocoService.put($scope.bloco).then(function (bloco) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Bloco Alterado com sucesso!'
			});
			$scope.$emit('listaBlocoAlterada');
			$state.go('app.bloco', {blocoId: bloco.id});
		});
	};

	$scope.enviarAdicao = function () {
		BlocoService.adicionar($scope.bloco).then(function (bloco) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Bloco Criado com sucesso!'
			});
			$scope.$emit('listaBlocoAlterada');
			$state.go('app.blocos', {}, {
				reload: true});
		});
	};


});