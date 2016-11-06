angular.module('mensagem.controller', [])

.controller('MensagemCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, mensagem, mensagens, MensagemService, murais, MuralService, SocketService, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, USER_ROLES) {

	$scope.mensagens = mensagens;

	verificaNovasMensagens(MensagemService.getNovasMensagens());

	$scope.mensagem = mensagem;

	if (mensagem !== null) {
		var image = document.getElementById('myImageMessage');
		if (image !== null) {
			image.src = "data:image/jpeg;base64," + mensagem.picture;
		}
	}

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

	$scope.postarImagem = function(mensagem) {

		var options = {
	        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
	        width: 800,
	        height: 800,
	        quality: 80            // Higher is better
    	};

		$ionicPlatform.ready(function () {


			 var options = {
		      quality: 50,
		      destinationType: Camera.DestinationType.DATA_URL,
		      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		      allowEdit: true,
		      encodingType: Camera.EncodingType.JPEG,
		      targetWidth: 100,
		      targetHeight: 100,
		      saveToPhotoAlbum: false
		    };

		    $cordovaCamera.getPicture(options).then(function(imageData) {
		    	var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
		      	mensagem.picture = imageData;

		    }, function(err) {
		      // error
		    });


		});

	};


	function dataURItoBlob(dataURI, callback) {
	    // convert base64 to raw binary data held in a string
	    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	    var byteString = atob(dataURI.split(',')[1]);
	 
	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	 
	    // write the bytes of the string to an ArrayBuffer
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	 
	    // write the ArrayBuffer to a blob, and you're done
	    var bb = new BlobBuilder();
	    bb.append(ab);
	    return bb.getBlob(mimeString);
	}

	function base64toBlob(base64Data, contentType) {
		  contentType = contentType || '';
		  var sliceSize = 1024;
		  var byteCharacters = atob(base64Data.split(',')[1]);
		  var bytesLength = byteCharacters.length;
		  var slicesCount = Math.ceil(bytesLength / sliceSize);
		  var byteArrays = new Array(slicesCount);

		for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		    var begin = sliceIndex * sliceSize;
		    var end = Math.min(begin + sliceSize, bytesLength);

		    var bytes = new Array(end - begin);
		    for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
		        bytes[i] = byteCharacters[offset].charCodeAt(0);
		    }
		    byteArrays[sliceIndex] = new Uint8Array(bytes);
		}
		return new Blob(byteArrays, { type: contentType });
		//return byteArrays[0];
		}

	$scope.validaUsuario = function () {
		return AuthService.isAuthorized([USER_ROLES.admin]);
	};


});