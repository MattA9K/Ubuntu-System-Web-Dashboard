(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('NotesService', NotesService);

    /** @ngInject */
    function NotesService(msApi, $q)
    {
        var service = {
            data      : [],
            addNote   : addNote,
            updateNote: updateNote,
            deleteNote: deleteNote,
            getData   : getData
        };

        /**
         * Add Note
         * @param note
         */
        function addNote(note)
        {
            service.data.push(note);
        }

        /**
         * Update Note
         * @param note
         */
        function updateNote(note)
        {
            for ( var i = 0; i < service.data.length; i++ )
            {
                if ( service.data[i].id === note.id )
                {
                    service.data[i] = note;
                }
            }
        }

        /**
         * Delete Note
         * @param note
         */
        function deleteNote(note)
        {
            for ( var i = 0; i < service.data.length; i++ )
            {
                if ( service.data[i].id === note.id )
                {
                    service.data.splice(i, 1);
                }
            }
        }

        /**
         * Get service data
         * @returns {Array}
         */
        function getData()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('notes.notes@get', {},
                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the promise
                    deferred.resolve(response);
                },

                // ERROR
                function (response)
                {
                    // Reject the promise
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        return service;

    }
})();