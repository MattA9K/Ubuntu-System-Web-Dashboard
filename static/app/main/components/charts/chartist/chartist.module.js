(function ()
{
    'use strict';

    angular
        .module('app.components.charts.chartist',
            [
                // 3rd Party Dependencies
                'angular-chartist'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.components_charts_chartist', {
            url  : '/components/charts/chartist',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/components/charts/chartist/chartist.html',
                    controller : 'ChartistController as vm'
                }
            }
        });
    }

})();