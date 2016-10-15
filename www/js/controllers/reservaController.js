angular.module('reserva.controller', [])

.controller('ReservaCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reserva, reservas, minhasReservas, areas, ReservaService, ReservaSocketService) {

	$scope.reservas = reservas;
	$scope.minhasReservas = minhasReservas;
	$scope.eventSource = [];

	angular.forEach(reservas, function (item) {
		parseEvento(item);		 
	});

	$scope.reserva = reserva;
	$scope.areas = areas;

	$scope.reserva.dataInicio = $stateParams.dataReserva; 
	$scope.reserva.dataFim = $stateParams.dataReserva;

	$rootScope.$on('listaReservaAlterada', function() {
    	ReservaService.getLista().then(function (data) {
    		$scope.reservas = data;

    	});
    	ReservaService.getListaMorador().then(function (data) {
    		$scope.minhasReservas = data;
    	});
	});

	$scope.adicionar = function() {
		$state.go('app.reservaAdicionar', {dataReserva: $scope.dataReserva});
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
		$scope.dataReserva = selectedTime;
   	 	console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
	};

	$scope.onEventSelected = function (event) {

	  $scope.reserva = event.reserva;	

	  var myPopup = $ionicPopup.show({
	    templateUrl: '/templates/reserva/reserva.html',
	    title: 'Reserva',
	    subTitle: event.reserva.area.nome,
	    scope: $scope,
	    buttons: [
	      { text: 'Fechar' },
	    ]
	  });

    	console.log(event.title);
    	console.log(event.reserva);
	};

	ReservaSocketService.receive().then(null, null, function(item) {
	    parseEvento(item); 
  	});


  	function parseEvento(item) {
  		var event = {};
		event.title = item.area.nome + ' - ' + item.situacao;
		// event.title = item.area.nome + ' - Ap: ' + item.morador.apartamento.numero + ' - Bl: ' + item.morador.apartamento.edificio.bloco.nome + ' - ' + item.situacao;
		event.startTime =  new Date(item.dataInicio);
		event.endTime =  new Date(item.dataFim);
		event.allDay = false;
		event.reserva = item;
		$scope.eventSource.push(event);
		$scope.$broadcast('eventSourceChanged',$scope.eventSource);
  	}

	

});