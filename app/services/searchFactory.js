komFramISLApp.factory('searchFactory', ['$http',

    function searchFactory($http) {
        'use strict';

        var searchResult;
        var getDotUrl = function (dot, prefix) {
            var ret = '&';
            if (dot.type === 0) {
                ret += prefix + 'Id=' + dot.str;
            } else if (dot.type === 1) {
                ret += prefix + 'CoordLat=' + dot.coord.latitude +
                    '&' + prefix + 'CoordLong=' + dot.coord.longitude +
                    '&' + prefix + 'CoordName=Min position'
            }
            return ret;
        }

        var searchFn = function (searchObj, position, successCb, errorCb, append) {
            var origin = getDotUrl(searchObj.from, 'origin')
            var destination = getDotUrl(searchObj.to, 'dest');
            var url = '/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad' + origin + destination;
            if (searchObj.time) {
                url += '&time=' + searchObj.time
            }
            var shObj = searchObj;

            /*$http.get('
                    http : //fredriklowenhamn.se/slappi/api/sl/?origin=' + from + '&destination=' + to + '&coord=' + position)*/
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