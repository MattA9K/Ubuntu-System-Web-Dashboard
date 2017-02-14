(function ()
{
    'use strict';

    angular
        .module('app.components.price-tables', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.components_price-tables', {
            url  : '/components/price-tables',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/components/price-tables/price-tables.html'
                }
            }
        });
    }

})();