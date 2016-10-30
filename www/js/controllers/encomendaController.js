angular.module('encomenda.controller', [])

.controller('EncomendaCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, encomenda, encomendas, moradores, EncomendaService) {

	$scope.encomendas = encomendas;
	$scope.encomenda = encomenda;
	$scope.moradores = moradores;

	$rootScope.$on('listaEncomendaAlterada', function() {
    	EncomendaService.getLista().then(function (data) {
    		$scope.encomendas = data;
    	});	
	});

	$rootScope.$on('minhasEncoAlt', function(event, item) {
    	EncomendaService.getListaMorador().then(function (data) {
    		$scope.encomendas = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.encomendaAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.encomendaEditar', {encomendaId: id});
	};

	$scope.excluir = function(id) {
		EncomendaService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Encomenda removida com sucesso!'
			});
			$scope.$emit('listaEncomendaAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		EncomendaService.put($scope.encomenda).then(function (encomenda) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Encomenda Alterada com sucesso!'
			});
			$scope.$emit('listaEncomendaAlterada');
			$state.go('app.encomenda', {encomendaId: encomenda.id});
		});
	};

	$scope.enviarAdicao = function () {
		EncomendaService.adicionar($scope.encomenda).then(function (encomenda) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Encomenda criada com sucesso!'
			});
			$scope.$emit('listaEncomendaAlterada');
			$rootScope.$emit('novaEncomenda', {novaEncomenda: encomenda}); 
			$state.go('app.encomendas', {}, {
				reload: true});
		});
	};


});