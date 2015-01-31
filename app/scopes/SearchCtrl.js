komFramISLApp.controller('SearchCtrl', ['searchFactory', 'smartFactory', 'positionFactory', '$state',
    function SearchCtrl(searchFactory, smartFactory, positionFactory, $state) {
        var search = this;
        search.from = {
            str: '',
            type: 0
        };
        search.to = {
            str: '',
            type: 0
        };
        var position = positionFactory.getPosition();

        var callSearch = function () {
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
        };

        search.doit = function () {

            if (search.from.type === 1 || search.to.type === 1) {
                position.promise.then(function (data) {
                    if (search.from.type === 1) {
                        search.from.coord = data.coords;
                    }
                    if (search.to.type === 1) {
                        search.to.coord = data.coords;
                    }
                    callSearch();
                });
            } else {
                callSearch();
            }
        };
        search.selectFrom = function (dot) {
            search.from = dot;

        }
        search.selectTo = function (dot) {
            search.to = dot;
            if (search.from.str === '') {
                search.from = {
                    type: 1,
                    str: 'Min position'
                }
            }
            search.doit();
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