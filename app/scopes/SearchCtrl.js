komFramISLApp.controller('SearchCtrl', ['searchFactory', 'smartFactory', '$state',
    function SearchCtrl(searchFactory, smartFactory, $state) {
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

        search.showSmartPicker = false;
        search.openSmartPicker = function (field, suggestions) {
            search.showSmartPicker = true;
            search.currentSmartPicker = field;
            search.currentSuggestions = suggestions;
        };
        search.selectSmartPicker = function (stationName) {
            search[search.currentSmartPicker] = stationName;
            search.showSmartPicker = false;
        }
        search.cancelSmartPicker = function () {
            search.showSmartPicker = false;
        }
        search.smartStationFrom = smartFactory.stationFrom;
        search.smartStationTo = smartFactory.stationTo;
}]);