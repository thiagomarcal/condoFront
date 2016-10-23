angular.module('login.controller', [])

.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicPopup, AuthService) {

	$scope.$on("$ionicView.enter", function () {
   		$ionicHistory.clearCache();
   		$ionicHistory.clearHistory();
	});

	$scope.data = {};

	$scope.login = function(data) {
		AuthService.login(data.username, data.password).then(function(authenticated) {

			$state.go('app.playlists', {}, {
				reload: true
			});
			//$scope.setCurrentUsername(data.username);
		}, function(err) {
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please check your credentials!'
			});
		});
	};
});