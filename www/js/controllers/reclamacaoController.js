angular.module('reclamacao.controller', [])

.controller('ReclamacaoCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, $stateParams, reclamacao, reclamacoes, blocos, areas, ReclamacaoService, EdificioService, ApartamentoService, UserSocketService) {

	$scope.reclamacoes = reclamacoes;
	$scope.reclamacao = reclamacao;

	$scope.blocos = blocos;
	$scope.areas = areas;
	
	$scope.tiposReclamacao = ['Area', 'Apartamento', 'Outros'];

	$rootScope.$on('listaReclamacaoAlterada', function() {
    	ReclamacaoService.getLista().then(function (data) {
    		$scope.reclamacoes = data;
    	});	
	});

	$rootScope.$on('minhasReclamaAlt', function(event, item) {
    	ReclamacaoService.getListaMorador().then(function (data) {
    		$scope.reclamacoes = data;
    	});	
	});

	$scope.adicionar = function() {
		$state.go('app.reclamacaoAdicionar');
	};

	$scope.editar = function(id) {
		$state.go('app.reclamacaoEditar', {reclamacaoId: id});
	};

	$scope.excluir = function(id) {
		ReclamacaoService.deletar(id).then(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reclamacão removida com sucesso!'
			});
			$scope.$emit('listaReclamacaoAlterada');	
			$state.go($state.current, {}, {
				reload: true});
		});
	};

	$scope.carregarApartamentos = function(edificio) {
		if (edificio !== undefined) {
			ApartamentoService.getListaEdificio(edificio.id).then(function (data) {
				$scope.apartamentos = data;
			});	
		}
	};

	$scope.carregarEdificios = function(bloco) {
		if (bloco !== undefined) {
			EdificioService.getListaBloco(bloco.id).then(function (data) {
				$scope.edificios = data;
			});	  
		}
	};

	$scope.enviarEdicao = function () {
		ReclamacaoService.put($scope.reclamacao).then(function (reclamacao) {
			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reclamação Alterada com sucesso!'
			});
			$scope.$emit('listaReclamacaoAlterada');
			$state.go('app.reclamacao', {reclamacaoId: reclamacao.id});
		});
	};

	$scope.enviarAdicao = function () {
		$scope.reclamacao.dataEnvio = new Date();
		ReclamacaoService.adicionar($scope.reclamacao).then(function (reclamacao) {

			var notificacao = {};
			notificacao.titulo = 'Reclamacao CondoApp';
			notificacao.descricao = 'Existem Reclamações Pendentes'; 

			UserSocketService.sendSindico(notificacao);

			var alertPopup = $ionicPopup.alert({
				title: 'CondoApp',
				template: 'Reclamação criada com sucesso!'
			});
			
			$scope.$emit('minhasReclamaAlt');

			// $rootScope.$emit('novaReclamacao', {novaReclamacao: reclamacao}); 
			 $state.go('app.minhasreclamacoes', {}, {
			 	reload: true});
		});
	};


	$scope.postarImagem = function(mensagem) {

		var options = {
	        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
	        width: 800,
	        height: 800,
	        quality: 100            // Higher is better
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


});