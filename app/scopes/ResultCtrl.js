komFramISLApp.controller('ResultCtrl', ['searchFactory', '$state',
    function (searchFactory, $state) {
        var result = this;
        result.result = searchFactory.getSearchResult();
        if (!result.result) {
            $state.go('index');
        }
}]);