(function ()
{
    'use strict';

    angular
        .module('app.components.charts.c3',
            [
                // 3rd Party Dependencies
                'gridshore.c3js.chart'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.components_charts_c3', {
            url  : '/components/charts/c3',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/components/charts/c3/c3.html',
                    controller : 'C3Controller as vm'
                }
            }
        });
    }

})();