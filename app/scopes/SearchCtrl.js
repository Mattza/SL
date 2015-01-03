komFramISLApp.controller('SearchCtrl', ['searchFactory', 'smartFactory', 'positionFactory', '$state',
    function SearchCtrl(searchFactory, smartFactory, positionFactory, $state) {
        var search = this;
        search.from = 'Skanstull';
        search.to = 'TCE';
        search.doit = function () {
            var successCb = function (data) {
                search.isSearching = false;
                $state.go('result');
            };
            var errorCb = function () {
                search.isError = true;
                search.isSearching = false;
            };
            var position = positionFactory.getPosition();
            search.waitingPosition = true;
            position.promise.then(function () {
                searchFactory.searchFn(search.from, search.to, position, successCb, errorCb);
                search.isSearching = true;
                search.waitingPosition = false;
            });
        }
        search.smartPicker = {
            show: false,
            open: function (field, suggestions) {
                search.smartPicker.show = true;
                search.smartPicker.current = field;
                search.smartPicker.currentSuggestions = suggestions;
            },
            select: function (stationName) {
                search[search.smartPicker.current] = stationName;
                search.smartPicker.show = false;
            },
            cancel: function () {
                search.smartPicker.show = false;
            },
            fromSuggestions: smartFactory.stationFrom,
            toSuggestions: smartFactory.stationTo
        }

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
        }
}]);