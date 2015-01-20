komFramISLApp.factory('searchFactory', ['$http',

    function searchFactory($http) {
        'use strict';

        var searchResult;
        var searchFn = function (searchObj, position, successCb, errorCb, append) {
            var url = '/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad&originId=' + searchObj.from + '&destId=' + searchObj.to;
            if (searchObj.time) {
                url += '&time=' + searchObj.time
            }
            var shObj = searchObj;

            /*$http.get('http://fredriklowenhamn.se/slappi/api/sl/?origin=' + from + '&destination=' + to + '&coord=' + position)*/
            $http.get(url)
                .success(function (data, status, headers, config) {
                    if (data.TripList.errorCode) {
                        errorCb();
                    } else {
                        _.each(data.TripList.Trip, function (trip) {

                            if (!angular.isArray(trip.LegList.Leg)) {
                                var temp = trip.LegList.Leg;
                                trip.LegList.Leg = [temp];
                            }
                            trip.StartTime = trip.LegList.Leg[0].Origin.time;
                            trip.ArrivalTime = trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination.time;
                        });
                        if (append) {
                            _.each(data.TripList.Trip, function (trip) {
                                searchResult.TripList.Trip.push(trip);
                            })
                        } else {
                            searchResult = data;
                        }
                        data.searchObj = shObj;
                        successCb(data);
                    }

                })
                .error(function (data) {
                    errorCb();
                });
        };

        return {
            searchFn: searchFn,
            getSearchResult: function () {
                return searchResult;
            }
        };
            }]);