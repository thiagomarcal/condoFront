angular.module('enquete.controller', [])

.controller('EnqueteCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, enquete, enquetes, EnqueteService) {

	$scope.enquetes = enquetes;
	$scope.enquete = enquete;

	$scope.enquete.alternativas = [];
  
	$scope.addNewChoice = function() {
		var newItemNo = $scope.enquete.alternativas.length+1;
		$scope.enquete.alternativas.push({});
	};

	$scope.removeChoice = function() {
		var lastItem = $scope.enquete.alternativas.length-1;
		$scope.enquete.alternativas.splice(lastItem);
	};

	$rootScope.$on('listaEnqueteAlterada', function() {
    	EnqueteService.getLista().then(function (data) {
    		$scope.enquetes = data;
    	});
	});

	$scope.adicionar = function() {
		$state.go('app.enqueteAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.enqueteEditar', {enqueteId: id});
	};

	$scope.excluir = function(id) {
		EnqueteService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Enquete removida com sucesso!'
			});
			$scope.$emit('listaEnqueteAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		EnqueteService.put($scope.enquete).then(function (enquete) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Enquete Alterada com sucesso!'
			});
			$scope.$emit('listaEnqueteAlterada');
			$state.go('app.enquete', {enqueteId: enquete.id});
		});
	};

	$scope.enviarAdicao = function () {
		EnqueteService.adicionar($scope.enquete).then(function (enquete) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Enquete criada com sucesso!'
			});
			$scope.$emit('listaEnqueteAlterada');
			//$rootScope.$emit('novaEncomenda', {novaEncomenda: encomenda}); 
			$state.go('app.enquetes', {}, {
				reload: true});
		});
	};


});