(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
            [
                'app.dashboards.server'
            ]
        )
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('apps', {
            title : 'APPS',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('apps.dashboards.server', {
            title: 'Server',
            state: 'app.dashboards_server'
        });
    }

})();