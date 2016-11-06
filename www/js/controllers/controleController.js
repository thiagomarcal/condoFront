angular.module('controle.controller', [])

.controller('ControleCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reservas, reserva, ReservaService, encomenda, encomendas, EncomendaService, reclamacao, reclamacoes, ReclamacaoService, ControleSocketService, UserSocketService) {

	//Inicio Reserva

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

    //Fim Reserva



    //Inicio Encomenda

	$scope.encomendas = encomendas;
	$scope.encomenda = encomenda;


 	$rootScope.$on("novaEncomenda", function(item) {
  		$scope.$emit('listaControleEncomendaAlterada'); 
  	});

	$rootScope.$on('listaControleEncomendaAlterada', function() {
    	EncomendaService.getListaPendentes().then(function (data) {
    		$scope.encomendas = data;
    	});	
	});

	if (angular.isDefined($stateParams.encomendasPendentes)) {
		$scope.encomendas = $stateParams.encomendasPendentes;
	}

	$scope.verEncomendas = function() {
		$state.go('app.controlesEncomendas', {encomendasPendentes: $scope.encomendas});
	};


    $scope.notificarEncomenda = function (encomenda) {
    	
		var notificacao = {};
		notificacao.titulo = 'Encomenda CondoApp';
		notificacao.descricao = 'Sua encomenda chegou! Favor dirigir-se a Administração';
		notificacao.morador =  encomenda.morador.id;

		UserSocketService.sendMorador(notificacao);
		var alertPopup = $ionicPopup.alert({
							title: 'CondoApp',
							template: 'Encomenda notificada ao morador!'
						});
		$scope.$emit('listaControleEncomendaAlterada');

    };

    $scope.encomendaEntregue = function (encomenda) {
    	encomenda.situacao = 'Entregue';
    	encomenda.dataEntregue = new Date();
    	EncomendaService.put(encomenda).then(function(data) {
    		
    		var notificacao = {};
			notificacao.titulo = 'Encomenda CondoApp';
			notificacao.descricao = 'Confirmação de entrega da encomenda! ';
			notificacao.morador =  data.morador.id; 

    		UserSocketService.sendMorador(notificacao);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Encomenda entregue com sucesso!'
							});
			$scope.$emit('listaControleEncomendaAlterada');	
		});
    };

    //Fim Encomenda


	//Inicio Reclamacao

	$scope.reclamacoes = reclamacoes;
	$scope.reclamacao = reclamacao;


 	$rootScope.$on("novaReclamacao", function(item) {
  		$scope.$emit('listaControleReclamacaoAlterada'); 
  	});

	$rootScope.$on('listaControleReclamacaoAlterada', function() {
    	ReclamacaoService.getListaPendentes().then(function (data) {
    		$scope.reclamacoes = data;
    	});	
	});

	if (angular.isDefined($stateParams.reclamacoesPendentes)) {
		$scope.reclamacoes = $stateParams.reclamacoesPendentes;
	}

	$scope.verReclamacoes = function() {
		$state.go('app.controlesReclamacoes', {reclamacoesPendentes: $scope.reclamacoes});
	};


    $scope.notificarReclamacao = function (reclamacao) {
    	
		var notificacao = {};
		notificacao.titulo = 'Reclamacao CondoApp';
		notificacao.descricao = 'Sua reclamacao está sendo verificada! Em breve daremos um retorno!';
		notificacao.morador =  reclamacao.morador.id;

		UserSocketService.sendMorador(notificacao);
		var alertPopup = $ionicPopup.alert({
							title: 'CondoApp',
							template: 'Relamacao notificada ao morador!'
						});
		$scope.$emit('listaControleReclamacaoAlterada');

    };

    $scope.reclamacaoAtendida = function (reclamacao) {
    	reclamacao.situacao = 'Atendida';
    	reclamacao.dataAtendimento = new Date();
    	ReclamacaoService.put(reclamacao).then(function(data) {
    		
    		var notificacao = {};
			notificacao.titulo = 'Reclamacao CondoApp';
			notificacao.descricao = 'Sua reclamação foi atendida! ';
			notificacao.morador =  data.morador.id; 

    		UserSocketService.sendMorador(notificacao);
			var alertPopup = $ionicPopup.alert({
								title: 'CondoApp',
								template: 'Reclamacao atendida com sucesso!'
							});
			$scope.$emit('listaControleReclamacaoAlterada');	
		});
    };

    //Fim Reclamacao

});