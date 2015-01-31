komFramISLApp.factory('smartFactory', ['$localStorage',
        function smartFactory($localStorage) {
        'use strict';

        var test1 = [];

        var update = function (searchStr, storage) {
            var item = _.find(storage, function (item) {
                return item.station === searchStr;
            });
            if (item) {
                item.counter++;
            } else {
                storage.push({
                    station: searchStr,
                    counter: 1
                });
            }
        };


        var atSearch = function (search) {
            if (!$localStorage.from) {
                $localStorage.from = [];
            }
            if (!$localStorage.to) {
                $localStorage.to = [];
            }
            if (search.from.type === 0) {
                update(search.from.str, $localStorage.from);
            }
            if (search.from.type === 0) {
                update(search.to.str, $localStorage.to);
            }
        }

        return {
            stationFrom: $localStorage.from,
            stationTo: $localStorage.to,
            atSearch: atSearch,
            history: test1,
        };
}]);