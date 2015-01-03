komFramISLApp.factory('searchFactory', ['$http',
    function searchFactory($http) {
        'use strict'

        var searchResult;
        var searchFn = function (from, to, successCb, errorCb) {
            $http.get('http://komframisl.my.local/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad&originId=' + from + '&destId=' + to)
            /*$http.get('http://komframisl.my.local/fidde/sl?origin=' + from + '&destination=' + to)*/


            .success(function (data, status, headers, config) {
                _.each(data.TripList.Trip, function (trip) {

                    if (!angular.isArray(trip.LegList.Leg)) {
                        var temp = trip.LegList.Leg;
                        trip.LegList.Leg = [temp];
                    }
                    trip.StartTime = trip.LegList.Leg[0].Origin.time;
                    trip.ArrivalTime = trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination.time;
                    _.each(trip.LegList.Leg, function (leg) {
                        leg.samePlace = leg.Origin.name === leg.Destination.name;
                    });
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