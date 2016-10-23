angular.module('reserva.controller', [])

.controller('ReservaCtrl', function($scope, $ionicHistory, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reserva, reservas, minhasReservas, areas, ReservaService, ReservaSocketService, ControleSocketService, UserSocketService) {

	$scope.reservas = reservas;
	$scope.reserva = reserva;

	$scope.minhasReservas = minhasReservas;
	$scope.areas = areas;

	$scope.eventSource = [];
	if ($scope.reservas.length) {
		$scope.reservas.forEach(function (item) {
			parseEvento(item);
		});
	}

	$scope.reserva.dataInicio = $stateParams.dataReserva; 
	$scope.reserva.dataFim = $stateParams.dataReserva;

	$rootScope.$on('listaReservaAlterada', function() {
    	
    	ReservaService.getLista().then(function (data) {
    		$scope.reservas = data;
    		$scope.eventSource = [];
			if ($scope.reservas.length) {
				$scope.reservas.forEach(function (item) {
					parseEvento(item);
				});
			}
    	});
    	ReservaService.getListaMorador().then(function (data) {
    		$scope.minhasReservas = data;
    	});
	});

	$rootScope.$on('listaReservaMoradorAlterada', function(event, data) {
    	
    	$scope.eventSource.forEach(function (evento) {
	    	if (data.id === evento.reserva.id) {
	    		evento.title = data.area.nome + ' - ' + data.situacao;
	    		evento.reserva = data;
	    	}
	    });

	    $scope.minhasReservas.forEach(function(minha) {
	    	if (minha.id === data.id) {
	    		minha.situacao = data.situacao; 
	    	}
	    });

	    $scope.$broadcast('eventSourceChanged',$scope.eventSource);

	});

	$scope.adicionar = function() {
		$state.go('app.reservaAdicionar', {dataReserva: $scope.dataReserva});
	};

	$scope.editar = function(id) {
		$state.go('app.reservaEditar', {reservaId: id});
	};

	$scope.teste = function() {
		console.log('teste');
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

			var notificacao = {};
			notificacao.titulo = 'Reservas CondoApp';
			notificacao.descricao = 'Existem Reservas Pendentes'; 

			UserSocketService.sendSindico(notificacao);

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

  	$rootScope.$on("novaReserva", function(event, item) {
  		parseEvento(item.novaReserva);
  	});
	
	$rootScope.$on("novoControleReserva", function(event, item) {
  		$scope.$emit('listaReservaMoradorAlterada', item.novoControleReserva);
  	});

  	function parseEvento(item) {
  		var event = {};
		event.title = item.area.nome + ' - ' + item.situacao;
		event.startTime =  new Date(item.dataInicio);
		event.endTime =  new Date(item.dataFim);
		event.allDay = false;
		event.reserva = item;
		$scope.eventSource.push(event);
		$scope.$broadcast('eventSourceChanged',$scope.eventSource);
  	}

	

});