(function ()
{
    'use strict';

    angular
        .module('app.notes', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.notes', {
            url    : '/notes',
            views  : {
                'content@app': {
                    templateUrl: '/static/app/main/apps/notes/notes.html',
                    controller : 'NotesController as vm'
                }
            },
            resolve: {
                Notes : function (NotesService)
                {
                    return NotesService.getData();
                },
                Labels: function (LabelsService)
                {
                    return LabelsService.getData();
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/apps/notes');

        // Api
        msApiProvider.register('notes.notes', ['/static/app/data/notes/notes.json']);
        msApiProvider.register('notes.labels', ['/static/app/data/notes/labels.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.notes', {
            title : 'Notes',
            icon  : 'icon-lightbulb',
            state : 'app.notes',
            weight: 11
        });

    }

})();