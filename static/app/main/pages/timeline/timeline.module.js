(function ()
{
    'use strict';

    angular
        .module('app.pages.timeline', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.pages_timeline', {
                url      : '/pages/timeline',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/pages/timeline/timeline.html',
                        controller : 'TimelineController as vm'
                    }
                },
                resolve  : {
                    Timeline: function (msApi)
                    {
                        return msApi.resolve('timeline.page1@get');
                    }
                },
                bodyClass: 'timeline'
            })
            .state('app.pages_timeline_left', {
                url      : '/pages/timeline-left',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/pages/timeline/timeline-left.html',
                        controller : 'TimelineController as vm'
                    }
                },
                resolve  : {
                    Timeline: function (msApi)
                    {
                        return msApi.resolve('timeline.page1@get');
                    }
                },
                bodyClass: 'timeline-left'
            })
            .state('app.pages_timeline_right', {
                url      : '/pages/timeline-right',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/pages/timeline/timeline-right.html',
                        controller : 'TimelineController as vm'
                    }
                },
                resolve  : {
                    Timeline: function (msApi)
                    {
                        return msApi.resolve('timeline.page1@get');
                    }
                },
                bodyClass: 'timeline-right'
            });

        // API
        msApiProvider.register('timeline.page1', ['/static/app/data/timeline/page-1.json']);
        msApiProvider.register('timeline.page2', ['/static/app/data/timeline/page-2.json']);
        msApiProvider.register('timeline.page3', ['/static/app/data/timeline/page-3.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('pages.timeline', {
            title : 'Timeline',
            icon  : 'icon-view-stream',
            weight: 8
        });

        msNavigationServiceProvider.saveItem('pages.timeline.default', {
            title: 'Default',
            state: 'app.pages_timeline'
        });

        msNavigationServiceProvider.saveItem('pages.timeline.left-aligned', {
            title: 'Left Aligned',
            state: 'app.pages_timeline_left'
        });

        msNavigationServiceProvider.saveItem('pages.timeline.right-aligned', {
            title: 'Right Aligned',
            state: 'app.pages_timeline_right'
        });
    }

})();