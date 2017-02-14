(function ()
{
    'use strict';

    angular
        .module('app.chat')
        .factory('ChatsService', ChatsService);

    /** @ngInject */
    function ChatsService($q, msApi)
    {
        
        var service = {
            chats         : {},
            contacts      : [],
            getContactChat: getContactChat
        };

        /**
         * Get contact chat from the server
         *
         * @param contactId
         * @returns {*}
         */
        function getContactChat(contactId)
        {

            // Create a new deferred object
            var deferred = $q.defer();

            // If contact doesn't have lastMessage, create a new chat
            if ( !service.contacts.getById(contactId).lastMessage)
            {
                service.chats[contactId] = [];

                deferred.resolve(service.chats[contactId]);
            }

            // If the chat exist in the service data, do not request
            if ( service.chats[contactId] )
            {
                deferred.resolve(service.chats[contactId]);
                
                return deferred.promise;
            }

            // Request the chat with the contactId
            msApi.request('chat.chats@get', {id: contactId},

                // SUCCESS
                function (response)
                {
                    // Attach the chats
                    service.chats[contactId] = response.data;

                    // Resolve the promise
                    deferred.resolve(service.chats[contactId]);
                },

                // ERROR
                function (response)
                {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function (value)
        {
            return this.filter(function (x)
            {
                return x.id === value;
            })[0];
        };
        return service;
    }
})();