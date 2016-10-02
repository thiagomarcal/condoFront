angular.module('mensagem.controller', [])

.controller('MensagemCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, mensagem, mensagens, MensagemService, murais, MuralService) {

	$scope.mensagens = mensagens;
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

		MensagemService.adicionar($scope.mensagem).then(function (mensagem) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Mensagem Criada com sucesso!'
			});
			$scope.$emit('listaMensagemAlterada');
			$state.go('app.mensagens', {}, {
				reload: true});
		});
	};


});