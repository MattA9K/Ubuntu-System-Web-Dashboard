(function ()
{
    'use strict';

    angular
        .module('app.pages.coming-soon',
            [
                // 3rd Party Dependencies
                'timer'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_coming-soon', {
            url      : '/pages/coming-soon',
            views    : {
                'main@'                        : {
                    templateUrl: '/static/app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_coming-soon': {
                    templateUrl: '/static/app/main/pages/coming-soon/coming-soon.html',
                    controller : 'ComingSoonController as vm'
                }
            },
            bodyClass: 'coming-soon'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/pages/coming-soon');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.coming-soon', {
            title : 'Coming Soon',
            icon  : 'icon-alarm-check',
            state : 'app.pages_coming-soon',
            weight: 2
        });
    }

})();