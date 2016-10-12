angular.module('reserva.controller', [])

.controller('ReservaCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reserva, reservas, areas, ReservaService, ReservaSocketService) {

	$scope.reservas = reservas;
	$scope.eventSource = [];

	angular.forEach(reservas, function (item) {
		parseEvento(item);		 
	});

	$scope.reserva = reserva;
	$scope.areas = areas;

	$rootScope.$on('listaReservaAlterada', function() {
    	ReservaService.getLista().then(function (data) {
    		$scope.reservas = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.reservaAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.reservaEditar', {reservaId: id});
	};

	$scope.excluir = function(id) {
		ReservaService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reserva removida com sucesso!'
			});
			$scope.$emit('listaReservaAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		ReservaService.put($scope.reserva).then(function (reserva) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reserva Alterada com sucesso!'
			});
			$scope.$emit('listaReservaAlterada');
			$state.go('app.reserva', {reservaId: reserva.id});
		});
	};

	$scope.enviarAdicao = function () {
		ReservaService.adicionar($scope.reserva).then(function (reserva) {

			ReservaSocketService.send(reserva);

			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reserva criada com sucesso!'
			});
			$scope.$emit('listaReservaAlterada');
			$state.go('app.reservas', {}, {
				reload: true});
		});
	};


	$scope.onTimeSelected = function (selectedTime, events) {

   	 	console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
	};

	ReservaSocketService.receive().then(null, null, function(item) {
	    parseEvento(item); 
  	});


  	function parseEvento(item) {
  		var event = {};
		event.title = item.area.nome + ' - ' + item.morador.apartamento.nome;
		event.startTime =  new Date(item.dataInicio);
		event.endTime =  new Date(item.dataFim);
		event.allDay = false;
		$scope.eventSource.push(event);
		$scope.$broadcast('eventSourceChanged',$scope.eventSource);
  	}

	

});