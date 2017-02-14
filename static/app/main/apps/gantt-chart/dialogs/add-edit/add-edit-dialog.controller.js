(function ()
{
    'use strict';

    angular.module('app.gantt-chart')
        .controller('GanttChartAddEditDialogController', GanttChartAddEditDialogController);

    /** @ngInject */
    function GanttChartAddEditDialogController($mdDialog, ganttUtils, dialogData, fuseGenerator)
    {
        var vm = this;

        // Data
        vm.chartData = dialogData.chartData;
        vm.dialogType = dialogData.dialogType;

        /// Edit Dialog
        if ( vm.dialogType === 'edit' )
        {
            vm.formView = dialogData.formView;
            vm.row = vm.task = angular.copy(dialogData.formData.model);
        }

        /// Add Dialog
        else if ( vm.dialogType === 'add' )
        {
            vm.row = {
                id      : ganttUtils.randomUuid(),
                name    : '',
                tasks   : [],
                classes : ['', ''],
                sortable: true,
                parent  : ''
            };
            vm.task = {
                id      : ganttUtils.randomUuid(),
                name    : '',
                classes : ['', ''],
                from    : '',
                to      : '',
                progress: ''
            };
            vm.taskRowId = '';
        }

        // Methods
        vm.addNewRow = addNewRow;
        vm.saveRow = saveRow;
        vm.removeRow = removeRow;
        vm.addNewTask = addNewTask;
        vm.saveTask = saveTask;
        vm.removeTask = removeTask;
        vm.closeDialog = closeDialog;
        vm.rgba = fuseGenerator.rgba;

        //////////

        /**
         * Add New Row
         */
        function addNewRow()
        {
            vm.chartData.push(vm.row);

            closeDialog();
        }

        /**
         * Save Row
         */
        function saveRow()
        {
            dialogData.formData.model = vm.row;

            closeDialog();
        }

        /**
         * Remove Row
         */
        function removeRow()
        {
            vm.chartData.splice(vm.chartData.indexOf(vm.chartData.getById(vm.row.id)), 1);

            closeDialog();
        }

        /**
         * Add New Task
         */
        function addNewTask()
        {
            vm.chartData.getById(vm.taskRowId).tasks.push(angular.copy(vm.task));

            closeDialog();
        }

        /**
         * Save Task
         */
        function saveTask()
        {
            dialogData.formData.model = vm.task;

            closeDialog();
        }

        /**
         * Remove Task
         */
        function removeTask()
        {
            var taskRow = vm.chartData.getById(dialogData.formData.row.model.id);

            taskRow.tasks.splice(taskRow.tasks.indexOf(taskRow.tasks.getById(vm.task.id)), 1);

            closeDialog();
        }


        /**
         * Close Dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
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