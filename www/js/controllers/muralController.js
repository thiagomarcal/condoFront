angular.module('mural.controller', [])

.controller('MuralCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, mural, murais, MuralService, condominio, condominios, CondominioService, bloco, blocos, BlocoService) {

	$scope.murais = murais;
	$scope.mural = mural;

	$scope.condominios = condominios;
	$scope.condominio = condominio;

	$scope.blocos = blocos;
	$scope.bloco = bloco;

	$rootScope.$on('listaMuralAlterada', function() {
    	MuralService.getLista().then(function (data) {
    		$scope.condominios = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.muralAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.muralEditar', {muralId: id});
	};

	$scope.excluir = function(id) {
		MuralService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mural removido com sucesso!'
			});
			$scope.$emit('listaMuralAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		MuralService.put($scope.mural).then(function (mural) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mural Alterado com sucesso!'
			});
			$scope.$emit('listaMuralAlterada');
			$state.go('app.mural', {muralId: mural.id});
		});
	};

	$scope.enviarAdicao = function () {
		MuralService.adicionar($scope.mural).then(function (mural) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mural Criado com sucesso!'
			});
			$scope.$emit('listaMuralAlterada');
			$state.go('app.murais', {}, {
				reload: true});
		});
	};


});