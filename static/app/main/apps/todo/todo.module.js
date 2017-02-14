(function ()
{
    'use strict';

    angular
        .module('app.todo',
            [
                // 3rd Party Dependencies
                'ng-sortable',
                'textAngular'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.to-do', {
            url      : '/to-do',
            views    : {
                'content@app': {
                    templateUrl: '/static/app/main/apps/todo/todo.html',
                    controller : 'TodoController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('todo.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('todo.tags@get');
                }
            },
            bodyClass: 'todo'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/apps/todo');

        // Api
        msApiProvider.register('todo.tasks', ['/static/app/data/todo/tasks.json']);
        msApiProvider.register('todo.tags', ['/static/app/data/todo/tags.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.to-do', {
            title : 'To-Do',
            icon  : 'icon-checkbox-marked',
            state : 'app.to-do',
            badge : {
                content: 3,
                color  : '#FF6F00'
            },
            weight: 9
        });
    }

})();