komFramISLApp.factory('smartFactory', function smartFactory() {
    var test = [
        'Skanstull',
        'Bondegatan 83',
        'Kista'
    ];
    var test1 = [
        {
            from: 'Skanstull',
            to: 'Bondegatan 33'
        },
        {
            from: 'Skanstull',
            to: 'Vallentuna'
        },
        {
            from: 'Kista',
            to: 'Bondegatan 33'
        },
        {
            from: 'Kista',
            to: 'Vallentuna'
        },

    ]


    return {
        station: test,
        history: test1,
    }
});