(function ()
{
    'use strict';

    angular
        .module('app.dashboards.analytics',
            [
                // 3rd Party Dependencies
                'nvd3'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_analytics', {
            url      : '/dashboard-analytics',
            views    : {
                'content@app': {
                    templateUrl: '/static/app/main/apps/dashboards/analytics/dashboard-analytics.html',
                    controller : 'DashboardAnalyticsController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.analytics@get');
                }
            },
            bodyClass: 'dashboard-analytics'
        });

        // Api
        msApiProvider.register('dashboard.analytics', ['/static/app/data/dashboard/analytics/data.json']);
    }

})();