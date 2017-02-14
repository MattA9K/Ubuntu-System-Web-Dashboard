(function ()
{
    'use strict';

    angular
        .module('app.chat')
        .controller('ChatController', ChatController);

    /** @ngInject */
    function ChatController(Contacts, ChatsService, $mdSidenav, User, $timeout, $document, $mdMedia)
    {

        var vm = this;

        // Data
        vm.contacts = ChatsService.contacts = Contacts.data;
        vm.chats = ChatsService.chats;
        vm.user = User.data;
        vm.leftSidenavView = false;
        vm.chat = undefined;

        // Methods
        vm.getChat = getChat;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleLeftSidenavView = toggleLeftSidenavView;
        vm.reply = reply;
        vm.setUserStatus = setUserStatus;
        vm.clearMessages = clearMessages;

        //////////

        /**
         * Get Chat by Contact id
         * @param contactId
         */
        function getChat(contactId)
        {
            ChatsService.getContactChat(contactId).then(function (response)
            {
                vm.chatContactId = contactId;
                vm.chat = response;

                // Reset the reply textarea
                resetReplyTextarea();

                // Scroll to the last message
                scrollToBottomOfChat();

                if ( !$mdMedia('gt-md') )
                {
                    $mdSidenav('left-sidenav').close();
                }

                // Reset Left Sidenav View
                vm.toggleLeftSidenavView(false);

            });
        }

        /**
         * Reply
         */
        function reply($event)
        {
            // If "shift + enter" pressed, grow the reply textarea
            if ( $event && $event.keyCode === 13 && $event.shiftKey )
            {
                vm.textareaGrow = true;
                return;
            }

            // Prevent the reply() for key presses rather than the"enter" key.
            if ( $event && $event.keyCode !== 13 )
            {
                return;
            }

            // Check for empty messages
            if ( vm.replyMessage === '' )
            {
                resetReplyTextarea();
                return;
            }

            // Message
            var message = {
                who    : 'user',
                message: vm.replyMessage,
                time   : new Date().toISOString()
            };

            // Add the message to the chat
            vm.chat.push(message);

            // Update Contact's lastMessage
            vm.contacts.getById(vm.chatContactId).lastMessage = message;

            // Reset the reply textarea
            resetReplyTextarea();

            // Scroll to the new message
            scrollToBottomOfChat();

        }

        /**
         * Clear Chat Messages
         */
        function clearMessages()
        {
            vm.chats[vm.chatContactId] = vm.chat = [];
            vm.contacts.getById(vm.chatContactId).lastMessage = null;
        }

        /**
         * Reset reply textarea
         */
        function resetReplyTextarea()
        {
            vm.replyMessage = '';
            vm.textareaGrow = false;
        }

        /**
         * Scroll Chat Content to the bottom
         * @param speed
         */
        function scrollToBottomOfChat()
        {
            $timeout(function ()
            {
                var chatContent = angular.element($document.find('#chat-content'));

                chatContent.animate({
                    scrollTop: chatContent[0].scrollHeight
                }, 400);
            }, 0);

        }

        /**
         * Set User Status
         */
        function setUserStatus(status)
        {
            vm.user.status = status;
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Toggle Left Sidenav View
         *
         * @param view id
         */
        function toggleLeftSidenavView(id)
        {
            vm.leftSidenavView = id;
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
    }
})();