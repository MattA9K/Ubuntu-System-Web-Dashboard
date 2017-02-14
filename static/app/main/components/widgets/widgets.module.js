(function ()
{
    'use strict';

    angular
        .module('app.components.widgets',
            [
                // 3rd Party Dependencies
                'gridshore.c3js.chart'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.components_widgets', {
            url  : '/components/widgets',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/components/widgets/widgets.html',
                    controller : 'WidgetsController as vm'
                }
            }
        });
    }

})();