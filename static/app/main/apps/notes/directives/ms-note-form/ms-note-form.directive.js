(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('msNoteFormController', msNoteFormController)
        .directive('msNoteForm', msNoteFormDirective);

    /** @ngInject */
    function msNoteFormController($scope, NotesService, msUtils, $mdDialog, $timeout, LabelsService)
    {
        var MsNoteForm = this;
        var notes = NotesService.data;

        //Data
        MsNoteForm.type = '';
        MsNoteForm.defaultNote = {
            'id'         : '',
            'title'      : '',
            'description': '',
            'archive'    : false,
            'image'      : '',
            'color'      : '',
            'time'       : new Date(),
            'reminder'   : null,
            'checklist'  : [],
            'labels'     : []
        };
        MsNoteForm.noteId = '';
        MsNoteForm.editNode = {};
        MsNoteForm.newCheckListItem = '';
        MsNoteForm.checkListForm = false;
        MsNoteForm.labels = LabelsService.data;

        MsNoteForm.ngFlowOptions = {
            singleFile: true
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        MsNoteForm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };

        //Methods
        MsNoteForm.init = init;
        MsNoteForm.submit = submit;
        MsNoteForm.isNotValid = isNotValid;
        MsNoteForm.deleteNote = deleteNote;
        MsNoteForm.deleteImage = deleteImage;
        MsNoteForm.addChecklistItem = addChecklistItem;
        MsNoteForm.checklistFormToggle = checklistFormToggle;
        MsNoteForm.deleteCheckItem = deleteCheckItem;
        MsNoteForm.toggleArchive = toggleArchive;
        MsNoteForm.toggleInArray = msUtils.toggleInArray;
        MsNoteForm.exists = msUtils.exists;
        MsNoteForm.upload = upload;
        MsNoteForm.imageSuccess = imageSuccess;

        //////

        /**
         * Initialize
         */
        function init()
        {
            // If form type edit
            if ( MsNoteForm.type === 'edit' )
            {
                MsNoteForm.editNode = notes.getById(MsNoteForm.noteId);
                MsNoteForm.note = angular.copy(MsNoteForm.editNode);
            }
            // If form type new
            else
            {
                resetForm();
            }
        }

        /**
         * Watch New Note Form, reset form if it is closed
         */
        $scope.$on('MsNewNote:closed', function ()
        {
            resetForm();
        });

        /**
         * Reset Form
         */
        function resetForm()
        {
            $scope.$evalAsync(function ()
            {
                MsNoteForm.note = angular.copy(MsNoteForm.defaultNote);
                MsNoteForm.checkListForm = false;
            });
        }

        /**
         * Submit Form
         */
        function submit()
        {
            if ( MsNoteForm.type === 'new' )
            {
                add();
            }
            else if ( MsNoteForm.type === 'edit' )
            {
                save();
            }
        }

        /**
         * Add new note
         */
        function add()
        {
            if ( isNotValid() )
            {
                return;
            }

            // Set default values
            MsNoteForm.note.id = msUtils.guidGenerator();
            MsNoteForm.note.time = new Date();

            // Add the note
            NotesService.addNote(angular.copy(MsNoteForm.note));

            // Reset the current note to an empty one
            MsNoteForm.note = angular.copy(MsNoteForm.defaultNote);

            $scope.$emit('MsNewNote:close');
        }

        /**
         * Save Note
         */
        function save()
        {
            if ( isNotValid() )
            {
                return;
            }

            // Update the note
            NotesService.updateNote(MsNoteForm.note);

            // Hide the dialog
            $mdDialog.hide();
        }

        /**
         * Delete Note Image
         */
        function deleteImage()
        {
            MsNoteForm.note.image = '';
        }

        /**
         * Toggle Archive State
         */
        function toggleArchive()
        {
            if ( MsNoteForm.type === 'new' )
            {
                MsNoteForm.note.archive = true;
                submit();
            }
            else if ( MsNoteForm.type === 'edit' )
            {
                MsNoteForm.note.archive = !MsNoteForm.note.archive;
                save();
            }
        }

        /**
         * One of the image, title, description, checklist inputs are should be exist.
         * @returns {boolean}
         */
        function isNotValid()
        {
            return MsNoteForm.note.image === '' && MsNoteForm.note.title === '' && MsNoteForm.note.description === '' && MsNoteForm.note.checklist.length === 0;
        }

        /**
         * Delete Note
         * @param ev
         */
        function deleteNote(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the note?')
                .htmlContent('the note will be deleted permanently.')
                .ariaLabel('delete note')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {
                NotesService.deleteNote(MsNoteForm.note);
            });
        }

        /**
         * Add Checklist Item
         */
        function addChecklistItem()
        {
            if ( MsNoteForm.newCheckListItem === '' )
            {
                return;
            }

            MsNoteForm.note.checklist.push({
                checked: false,
                text   : MsNoteForm.newCheckListItem
            });

            MsNoteForm.newCheckListItem = '';

            focusChecklistInput();
        }

        /**
         * Checklist form toggle
         */
        function checklistFormToggle()
        {
            $scope.$evalAsync(function ()
            {
                MsNoteForm.checkListForm = !MsNoteForm.checkListForm;

                $timeout(function ()
                {
                    focusChecklistInput();
                });
            });
        }

        /**
         * Delete check item
         * @param item
         */
        function deleteCheckItem(item)
        {
            MsNoteForm.note.checklist.splice(MsNoteForm.note.checklist.indexOf(item), 1);
            focusChecklistInput();
        }

        /**
         * Focus checklist input
         */
        function focusChecklistInput()
        {
            angular.element('#new-checklist-item-input').focus();
        }

        /**
         * Upload
         */
        function upload()
        {
            // Set headers
            MsNoteForm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            MsNoteForm.ngFlow.flow.upload();
        }

        /**
         * Image Success
         * @param file
         * @param message
         */
        function imageSuccess(file, message)
        {
            var fileReader = new FileReader();

            fileReader.readAsDataURL(file.file);

            fileReader.onload = function (event)
            {
                file.url = event.target.result;

                $scope.$evalAsync(function ()
                {
                    MsNoteForm.note.image = file.url;
                });
            };

            file.type = 'image';
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

    /** @ngInject */
    function msNoteFormDirective()
    {
        return {
            restrict    : 'EA',
            controller  : 'msNoteFormController',
            controllerAs: 'MsNoteForm',
            scope       : {
                noteType: '=',
                noteId  : '='
            },
            templateUrl : 'app/main/apps/notes/directives/ms-note-form/ms-note-form.html',
            link        : function (scope, element, attributes, MsNoteForm)
            {
                // Type
                MsNoteForm.type = scope.noteType;

                // Note id
                if ( angular.isDefined(scope.noteId) )
                {
                    MsNoteForm.noteId = scope.noteId;
                }

                MsNoteForm.init();

            }
        };
    }
})();