angular.module('controle.controller', [])

.controller('ControleCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reservas, reserva, ReservaService, ControleSocketService, UserSocketService) {

	$scope.reservas = reservas;
	$scope.reserva = reserva;


 	$rootScope.$on("novaReserva", function(item) {
  		$scope.$emit('listaControleReservaAlterada'); 
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
    	ReservaService.controle(reserva).then(function(data) {
    		ControleSocketService.send(data);

    		var notificacao = {};
			notificacao.titulo = 'Reserva CondoApp';
			notificacao.descricao = 'Sua Reserva foi aprovada';
			notificacao.morador =  data.morador.id;

    		UserSocketService.sendMorador(notificacao);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Reserva Aprovada com sucesso!'
							});
			$scope.$emit('listaControleReservaAlterada');	
		});
    };

    $scope.rejeitarReserva = function (reserva) {
    	reserva.situacao = 'Rejeitado';
    	ReservaService.controle(reserva).then(function(data) {
    		ControleSocketService.send(data);

    		var notificacao = {};
			notificacao.titulo = 'Reserva CondoApp';
			notificacao.descricao = 'Sua Reserva foi negada';
			notificacao.morador =  data.morador.id; 

    		UserSocketService.sendMorador(notificacao);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Reserva Rejeitada com sucesso!'
							});
			$scope.$emit('listaControleReservaAlterada');	
		});
    };

});