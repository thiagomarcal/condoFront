angular.module('condominio.controller', [])

.controller('CondominioCtrl', function($scope, $state, $ionicPopup, AuthService, $stateParams, condominio, CondominioService) {

	$scope.condominio = condominio;

	$scope.enviarEdicao = function () {
		CondominioService.put($scope.condominio).then(function (condominio) {
			alert("Condominio Alterado com sucesso");
			$state.go('app.condominio', {condominioId: condominio.id});
		});
	};

	$scope.enviarAdicao = function () {
		CondominioService.adicionar($scope.condominio).then(function (condominio) {
			alert("Condominio Criado com sucesso");
			$scope.$emit('listaCondominioAlterada');
			$state.go('app.condominios', {}, {
				reload: true});
		});
	};


});