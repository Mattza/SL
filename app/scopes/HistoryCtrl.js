komFramISLApp.controller('HistoryCtrl', ['smartFactory', 'searchFactory', '$state',
    function SearchCtrl(smartFactory, searchFactory, $state) {
        var history = this;
        history.history = smartFactory.history;
        history.search = function (historyObj) {
            var successCb = function (data) {
                //                search.trips = data.TripList.Trip;
                //                search.isSearching = false;
                $state.go('result');
            };
            var errorCb = function () {
                search.isError = true;
                search.isSearching = false;
            };

            searchFactory.searchFn(historyObj.from, historyObj.to, successCb, errorCb);
        }

        // TODO
        history.remove = function(historyObj) {
            //Remove this object from the list?
        }   
}]);