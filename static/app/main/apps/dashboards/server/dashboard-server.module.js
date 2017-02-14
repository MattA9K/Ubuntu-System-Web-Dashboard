(function ()
{
    'use strict';

    angular
        .module('app.dashboards.server',
            [
                // 3rd Party Dependencies
                'nvd3',
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_server', {
            url      : '/dashboard-server',
            views    : {
                'content@app': {
                    templateUrl: '/static/app/main/apps/dashboards/server/dashboard-server.html',
                    controller : 'DashboardServerController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.server@get');
                }
            },
            bodyClass: 'dashboard-server'
        });

        // Api
        msApiProvider.register('dashboard.server', ['/static/app/data/dashboard/server/data.json']);
    }

})();