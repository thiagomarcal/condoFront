angular.module('area.controller', [])

.controller('AreaCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, area, areas, AreaService, condominios, BlocoService) {

	$scope.areas = areas;
	$scope.area = area;
	$scope.condominios = condominios;

	$rootScope.$on('listaAreaAlterada', function() {
    	AreaService.getLista().then(function (data) {
    		$scope.areas = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.areaAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.areaEditar', {areaId: id});
	};

	$scope.excluir = function(id) {
		AreaService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Area removido com sucesso!'
			});
			$scope.$emit('listaAreaAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};

	$scope.enviarEdicao = function () {
		AreaService.put($scope.area).then(function (area) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Area Alterada com sucesso!'
			});
			$scope.$emit('listaAreaAlterada');
			$state.go('app.area', {areaId: area.id});
		});
	};

	$scope.enviarAdicao = function () {
		AreaService.adicionar($scope.area).then(function (area) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Area Criada com sucesso!'
			});
			$scope.$emit('listaAreaAlterada');
			$state.go('app.areas', {}, {
				reload: true});
		});
	};


});