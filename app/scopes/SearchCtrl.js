komFramISLApp.controller('SearchCtrl', ['searchFactory', 'smartFactory', 'positionFactory', '$state',
    function SearchCtrl(searchFactory, smartFactory, positionFactory, $state) {
        var search = this;
        search.from = '';
        search.to = '';
        search.doit = function () {
            var successCb = function (data) {
                search.isSearching = false;
                $state.go('result');
                smartFactory.atSearch({
                    from: search.from,
                    to: search.to
                });
            };
            var errorCb = function () {
                search.isError = true;
                search.isSearching = false;
            };
            var position = positionFactory.getPosition();
            search.waitingPosition = true;
            //position.promise.then(function () {
            searchFactory.searchFn({
                    from: search.from,
                    to: search.to,
                    time: undefined
                },
                position, successCb, errorCb, false);
            search.isSearching = true;
            search.waitingPosition = false;
            //});
        };
        search.selectFrom = function (stationName) {
            search.from = stationName;
        }
        search.selectTo = function (stationName) {
            search.to = stationName;
        }
        search.smartStation = {

            cancel: function () {
                search.smartPicker.show = false;
            },
            fromSuggestions: smartFactory.stationFrom,
            toSuggestions: smartFactory.stationTo
        };

        search.history = {
            list: smartFactory.history,
            search: function (historyObj) {
                search.from = historyObj.from;
                search.to = historyObj.to;
                search.doit();

            },
            remove: function (historyObj) {
                _.remove(search.history.list, historyObj);
            }
        };
}]);