komFramISLApp.directive('searchBlock', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/searchBlock.html',
        scope: {
            placeholder: '@',
            model: '=',
            smartStation: '=',
            callbackFn: '&'
        }

    }

})