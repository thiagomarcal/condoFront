angular.module('mensagem.controller', [])

.controller('MensagemCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, mensagem, mensagens, MensagemService, murais, MuralService, SocketService) {

	$scope.mensagens = mensagens;

	verificaNovasMensagens(MensagemService.getNovasMensagens());

	$scope.mensagem = mensagem;

	$scope.murais = murais;

	$scope.tipoMurais = [{'nome': 'Condominio'}, {'nome': 'Bloco'}, {'nome': 'Edificio'}];

	$rootScope.$on('listaMensagemAlterada', function() {
    	MensagemService.getLista().then(function (data) {
    		$scope.mensagens = data;
    	});	
	});



	$scope.adicionar = function() {
		$state.go('app.mensagemAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.mensagemEditar', {mensagemId: id});
	};

	$scope.excluir = function(id) {
		MensagemService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mensagem removida com sucesso!'
			});
			$scope.$emit('listaMensagemAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};

	$scope.enviarAdicao = function () {
		$scope.mensagem.dataEnvio = new Date();
		$scope.mensagem.lida = false;

		MensagemService.adicionar($scope.mensagem).then(function (mensagem) {

			SocketService.send(mensagem);

			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mensagem Criada com sucesso!'
			});
			$scope.$emit('listaMensagemAlterada');
			$state.go('app.mensagens', {}, {
				reload: true});
		});
	};

	function verificaNovasMensagens(novasMensagens) {
		if (novasMensagens.length > 0) {
			angular.forEach($scope.mensagens, function(mensagem) {
				angular.forEach(novasMensagens, function(novaMensagem) {
					if (mensagem.id === novaMensagem.id) {
						mensagem.lida = false;
					}
				});
			});
		}
	}

	$scope.detalhe = function (mensagem) {
		mensagem.lida = true;
		$state.go('app.mensagem', {mensagemId: mensagem.id}, {
				reload: true});
	};


});