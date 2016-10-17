angular.module('controle.controller', [])

.controller('ControleCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reservas, reserva, ReservaService, ReservaSocketService, ControleSocketService) {

	$scope.reservas = reservas;
	$scope.reserva = reserva;

	ReservaSocketService.receive().then(null, null, function(item) {
	    $scope.reservas.push(item); 
  	});

	$rootScope.$on('listaControleReservaAlterada', function() {
    	ReservaService.getListaPendentes().then(function (data) {
    		$scope.reservas = data;
    	});	
	});

	if (angular.isDefined($stateParams.reservasPendentes)) {
		$scope.reservas = $stateParams.reservasPendentes;
	}

	$scope.verReservas = function() {
		$state.go('app.controlesReservas', {reservasPendentes: $scope.reservas});
	};

    $scope.aprovarReserva = function (reserva) {
    	reserva.situacao = 'Aprovado';
    	ReservaService.put(reserva).then(function(data) {
    		ControleSocketService.send(data);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Reserva Aprovada com sucesso!'
							});
			$scope.$emit('listaControleReservaAlterada');	
		});
    };

    $scope.rejeitarReserva = function (reserva) {
    	reserva.situacao = 'Rejeitado';
    	ReservaService.put(reserva).then(function(data) {
    		ControleSocketService.send(data);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Reserva Rejeitada com sucesso!'
							});
			$scope.$emit('listaControleReservaAlterada');	
		});
    };

});