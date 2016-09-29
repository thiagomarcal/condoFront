angular.module('interceptor.factory', [])

.factory('customeInterceptor',['$timeout','$injector', '$q',function($timeout, $injector, $q) {
  
  var requestInitiated;

  function showLoadingText() {
    $injector.get("$ionicLoading").show({
      template: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true
    });
  }
  
  function hideLoadingText(){
    $injector.get("$ionicLoading").hide();
  }

  return {
    request : function(config) {
      requestInitiated = true;
      showLoadingText();
      console.log('Request Initiated with interceptor');
      return config;
    },
    response : function(response) {
      requestInitiated = false;
        
      // Show delay of 300ms so the popup will not appear for multiple http request
      $timeout(function() {

        if(requestInitiated) return;
        hideLoadingText();
        console.log('Response received with interceptor');

      },600);
      
      return response;
    },
    requestError : function (err) {
      hideLoadingText();
      console.log('Request Error logging via interceptor');
      return err;
    },
    responseError : function (err) {
      hideLoadingText();
      console.log('Response error via interceptor');
      return $q.reject(err);
    }
  };
}])

.config(function ($urlRouterProvider,$httpProvider) {
    $httpProvider.interceptors.push('customeInterceptor');
});

