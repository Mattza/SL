var komFramISLApp = angular
    .module('komFramISLApp', ['ngStorage','ui.router', 'ngTouch'])

.config(function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('index');
    $stateProvider.state('index', {
        url: '/index',
        controller: 'MainCtrl as main',
        templateUrl: 'app/scopes/Main.html',
    }).state('result', {
        url: '/result',
        controller: 'ResultCtrl as result',
        templateUrl: 'app/scopes/Result.html',
    });
});