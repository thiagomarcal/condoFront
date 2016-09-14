angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicModal, $timeout, $state, $ionicPopup) {
		$scope.data = {};

		$scope.login = function() {
				LoginService.loginUser($scope.data.username, $scope.data.password).success(function(argument) {
						$state.go('app.playlists');
				}).error(function (argument) {
						var alertPopup = $ionicPopup.alert({
								title: 'Login failed!',
								template: 'Por Favor cheque suas credenciais!'
						});
				});
		};

});