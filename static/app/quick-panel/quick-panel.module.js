(function ()
{
    'use strict';

    angular
        .module('app.quick-panel', [])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider, msApiProvider)
    {
        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/quick-panel');

        // Api
        msApiProvider.register('quickPanel.activities', ['/static/app/data/quick-panel/activities.json']);
        msApiProvider.register('quickPanel.contacts', ['/static/app/data/quick-panel/contacts.json']);
        msApiProvider.register('quickPanel.events', ['/static/app/data/quick-panel/events.json']);
        msApiProvider.register('quickPanel.notes', ['/static/app/data/quick-panel/notes.json']);
    }
})();
