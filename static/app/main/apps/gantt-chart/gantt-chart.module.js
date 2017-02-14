(function ()
{
    'use strict';

    angular
        .module('app.gantt-chart',
            [
                // 3rd Party Dependencies
                'gantt',
                'gantt.sortable',
                'gantt.movable',
                'gantt.drawtask',
                'gantt.tooltips',
                'gantt.bounds',
                'gantt.progress',
                'gantt.table',
                'gantt.tree',
                'gantt.groups',
                'gantt.dependencies',
                'gantt.overlap',
                'gantt.resizeSensor'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider, msApiProvider)
    {

        $stateProvider.state('app.gantt-chart', {
            url    : '/gantt-chart',
            views  : {
                'content@app': {
                    templateUrl: '/static/app/main/apps/gantt-chart/gantt-chart.html',
                    controller : 'GanttChartController as vm'
                }
            },
            resolve: {
                Tasks    : function (msApi)
                {
                    return msApi.resolve('ganttChart.tasks@get');
                },
                Timespans: function (msApi)
                {
                    return msApi.resolve('ganttChart.timespans@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/apps/gantt-chart');

        // Navigation
        msNavigationServiceProvider.saveItem('apps.gantt-chart', {
            title : 'Gantt Chart',
            icon  : 'icon-calendar-text',
            state : 'app.gantt-chart',
            weight: 7
        });

        // Api
        msApiProvider.register('ganttChart.tasks', ['/static/app/data/gantt-chart/tasks.json']);
        msApiProvider.register('ganttChart.timespans', ['/static/app/data/gantt-chart/timespans.json']);

    }

})();