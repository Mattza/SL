komFramISLApp.filter('legToIconClass', function () {
    return function (leg) {
        var temp = {
            METRO: {
                11: 'MET_blue',
                12: 'MET_blue',
                13: 'MET_red',
                14: 'MET_red',
                15: 'MET_red',
                16: 'MET_green',
                17: 'MET_green',
                18: 'MET_green'
            },
            BUS: {
                610: 'BUS_red'
            }

        };
        var ret = temp[leg.type];
        if (angular.isObject(ret)) {
            ret = ret[leg.line];
        }
        return ret;
    };
});