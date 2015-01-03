var komFramISLApp = angular.module('komFramISLApp', ['ngStorage'])

.controller('MainCtrl', ['$scope', '$http', '$localStorage',
	function ($scope, $http, $localStorage) {
		'use strict';
		$scope.$storage = $localStorage.$default({
			loc: []
		});
		var getMostUsedStation = function (currentLoc) {
			_.each($scope.$storage.loc, function (loc) {
				loc.distance = Math.sqrt(Math.pow(Math.abs(loc.lat - currentLoc.coords.latitude), 2) + Math.pow(Math.abs(loc.long - currentLoc.coords.longitude), 2));
			});
			$scope.$storage.loc = _.sortBy($scope.$storage.loc, 'distance');
		};

		$scope.extSearch = function (loc) {
			$scope.search.from = loc.from;
			$scope.search.to = loc.to;
			$scope.search.doit();

		};
		$scope.search = {
			from: 'SKT',
			to: 'FRÄ',
			doit: function () {
				navigator.geolocation.getCurrentPosition(function (loc) {
					$scope.$storage.loc.push({
						lat: loc.coords.latitude,
						long: loc.coords.longitude,
						from: $scope.search.from,
						to: $scope.search.to
					});
				});

				$http.get('http://api.localhost:8080/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad&originId=' + $scope.search.from + '&destId=' + $scope.search.to)				.success(function (data, status, headers, config) {
					$scope.trips = data.TripList.Trip;
					$scope.isSearching = false;

					_.each($scope.trips, function (trip) {

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

				})
				.error(function () {
					$scope.isError = true;
					$scope.isSearching = false;
				});
				$scope.isSearching = true;
			}
		};
		navigator.geolocation.getCurrentPosition(getMostUsedStation);
	}]);