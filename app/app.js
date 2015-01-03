var komFramISLApp = angular
    .module('komFramISLApp', ['ngStorage', 'ui.router'])

.config(function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("home");
    $stateProvider.state('index', {
        url: '',
        controller: 'MainCtrl as main',
        templateUrl: 'app/scopes/Main.html',
    })
})

.controller('SearchCtrl', function SearchCtrl() {
    var search = this;
    search.taco = 'taco';

});
