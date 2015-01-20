komFramISLApp.controller('ResultCtrl', ['searchFactory', '$state',
    function (searchFactory, $state) {
        var result = this;
        result.loadingMore = false;
        result.home = function () {
            $state.go('index');
        }
        result.result = searchFactory.getSearchResult();
        if (!result.result) {
            result.home();
        }

        result.more = function () {
            searchFactory.searchFn({
                from: result.result.searchObj.from,
                to: result.result.searchObj.to,
                time: getMorezTime()
            }, undefined, successCb, errorCb, true);
            result.loadingMore = true;
        }

        var successCb = function (data) {
            result.loadingMore = false;
        }
        var errorCb = function () {
            result.loadingMore = false;
        }


        var getMorezTime = function () {
            var trips = result.result.TripList.Trip;
            return trips[trips.length - 1].StartTime;
        }
}]);