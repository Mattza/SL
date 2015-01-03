komFramISLApp.controller('HistoryCtrl', ['smartFactory',
    function SearchCtrl(smartFactory) {
        var history = this;
        history.history = smartFactory.history;

}]);