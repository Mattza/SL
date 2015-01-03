komFramISLApp.controller('SearchCtrl', ['searchFactory', '$state',
    function SearchCtrl(searchFactory, $state) {
        var search = this;
        search.from = 'Skanstull';
        search.to = 'TCE';
        search.doit = function () {
            var successCb = function (data) {
                //                search.trips = data.TripList.Trip;
                //                search.isSearching = false;
                $state.go('result');
            };
            var errorCb = function () {
                search.isError = true;
                search.isSearching = false;
            };

            searchFactory.searchFn(search.from, search.to, successCb, errorCb);
            search.isSearching = true;


        }

}]);