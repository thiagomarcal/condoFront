angular.module('usuario.controller', [])

.controller('UsuarioCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, usuario, usuarios, UsuarioService) {

	$scope.permissoes = ["ADMIN", "ROOT", "USER", "PUBLIC"];

	$scope.usuarios = usuarios;
	$scope.usuario = usuario;

	$rootScope.$on('listaUsuarioAlterada', function() {
    	UsuarioService.getLista().then(function (data) {
    		$scope.usuarios = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.usuarioAdicionar');
	};

	$scope.editar = function(username) {
		$state.go('app.usuarioEditar', {username: username});
	};

	$scope.excluir = function(username) {
		UsuarioService.deletar(username).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Usuario removido com sucesso!'
			});
			$scope.$emit('listaUsuarioAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};


	$scope.enviarEdicao = function () {
		UsuarioService.put($scope.usuario).then(function (usuario) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Usuario Alterado com sucesso!'
			});
			$scope.$emit('listaUsuarioAlterada');
			$state.go('app.usuario', {username: usuario.username});
		});
	};

	$scope.enviarAdicao = function () {
		UsuarioService.adicionar($scope.usuario).then(function (usuario) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Usuario Criado com sucesso!'
			});
			$scope.$emit('listaUsuarioAlterada');
			$state.go('app.usuarios', {}, {
				reload: true});
		});
	};


});