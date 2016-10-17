angular.module('controlesocket.service', [])


.service("ControleSocketService", function($http, $q, SERVIDOR) {

    var service = {};
    var listener = $q.defer();
    var socket = {
        client: null,
        stomp: null
    };

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = 'http://'+SERVIDOR.endereco+'/api/socket';
    service.CHAT_TOPIC = "/topic/controle";
    service.CHAT_BROKER = "/app/controle";


    service.receive = function() {
        return listener.promise;
    };

    service.send = function(message) {
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify(message));
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getReserva = function(data) {
      var reserva = JSON.parse(data);
      return reserva;
    };

    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getReserva(data.body));
      });
    };

    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      //socket.stomp.connect({'X-Auth-Token': window.localStorage.getItem('yourTokenKey')}, startListener);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };

    initialize();
    return service;


});