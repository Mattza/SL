komFramISLApp.filter('legToIconClass', function () {
    return function (leg) {
        var temp = {
            METRO: {
                10: 'MET_blue',
                11: 'MET_blue',
                13: 'MET_red',
                14: 'MET_red',
                17: 'MET_green',
                18: 'MET_green',
                19: 'MET_green'
            },
            BUS: 'BUS_red',
            TRAM: 'TRM',
            WALK: 'WALK',
            TRAIN: 'TRAIN'

        };
        var ret = temp[leg.type];
        if (angular.isObject(ret)) {
            ret = ret[leg.line];
        }
        return ret;
    };
});