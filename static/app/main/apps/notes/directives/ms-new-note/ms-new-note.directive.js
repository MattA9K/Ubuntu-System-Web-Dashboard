(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('msNewNoteController', msNewNoteController)
        .directive('msNewNoteButton', msNewNoteButtonDirective)
        .directive('msNewNote', msNewNoteDirective);

    /** @ngInject */
    function msNewNoteController($scope, $document)
    {
        var MsNewNote = this;

        //Data
        MsNewNote.formVisible = false;
        MsNewNote.form = {
            title      : '',
            description: ''
        };

        //Methods
        MsNewNote.open = open;
        MsNewNote.close = close;
        MsNewNote.element = [];

        //////

        /**
         * Close Trigger
         */
        $scope.$on('MsNewNote:close', function ()
        {
            close();
        });

        /**
         * Open new note form
         */
        function open()
        {
            MsNewNote.element.addClass('form-visible');
            MsNewNote.element.find('textarea').focus();
            $document.on('click', outSideClick);
        }

        /**
         * Close new note form
         */
        function close()
        {
            MsNewNote.element.removeClass('form-visible');
            $scope.$broadcast('MsNewNote:closed');

            $document.off('click', outSideClick);
        }

        /**
         * Click Outside Event Handler
         * @param event
         */
        function outSideClick(event)
        {
            var isChild = MsNewNote.element.has(event.target).length > 0;
            var isSelf = MsNewNote.element[0] === event.target;
            var isMenu = angular.element(event.target).closest('md-menu-content').length > 0;
            var isCalendar = angular.element(event.target).closest('md-calendar').length > 0 || angular.element(event.target).closest('.md-datepicker-calendar-pane').length > 0 || angular.element(event.target).hasClass('md-scroll-mask');

            var isInside = isChild || isSelf || isMenu || isCalendar;

            if ( !isInside )
            {
                close();
            }
        }
    }

    /** @ngInject */
    function msNewNoteDirective()
    {
        return {
            restrict    : 'E',
            controller  : 'msNewNoteController',
            controllerAs: 'MsNewNote',
            templateUrl : 'app/main/apps/notes/directives/ms-new-note/ms-new-note.html',
            link        : function (scope, element, attributes, MsNewNote)
            {
                MsNewNote.element = element;
            }
        };
    }

    /** @ngInject */
    function msNewNoteButtonDirective()
    {
        return {
            restrict: 'EA',
            require : '^msNewNote',
            link    : function (scope, element, attributes, msNewNote)
            {
                element.on('click', function ()
                {
                    msNewNote.open();
                });
            }
        };
    }
})();