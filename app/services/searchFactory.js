komFramISLApp.factory('searchFactory', ['$http',
    function searchFactory($http) {
        'use strict';

        var searchResult;
        var searchFn = function (from, to, position, successCb, errorCb) {
            $http.get('http://fredriklowenhamn.se/slappi/api/sl/?origin=' + from + '&destination=' + to + '&coord=' + position)
                .success(function (data, status, headers, config) {
                    _.each(data.TripList.Trip, function (trip) {

                        if (!angular.isArray(trip.LegList.Leg)) {
                            var temp = trip.LegList.Leg;
                            trip.LegList.Leg = [temp];
                        }
                        trip.StartTime = trip.LegList.Leg[0].Origin.time;
                        trip.ArrivalTime = trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination.time;
                    });
                    searchResult = data;
                    successCb(data);

                })
                .error(function () {
                    errorCb();
                });
        }

        return {
            searchFn: searchFn,
            getSearchResult: function () {
                return searchResult;
            }
        }
}]);