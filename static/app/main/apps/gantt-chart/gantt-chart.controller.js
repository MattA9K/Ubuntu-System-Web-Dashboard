(function ()
{
    'use strict';

    angular.module('app.gantt-chart')
        .controller('GanttChartController', GanttChartController);

    /** @ngInject */
    function GanttChartController($mdDialog, $document, $animate, $scope, $timeout, ganttUtils, GanttObjectModel, ganttDebounce, moment, Tasks, Timespans, $window, $mdSidenav, msApi)
    {
        var vm = this;
        var objectModel;

        // Data
        vm.live = {};
        vm.options = {
            mode                    : 'custom',
            scale                   : 'day',
            sortMode                : undefined,
            sideMode                : 'Tree',
            daily                   : true,
            maxHeight               : 300,
            width                   : true,
            zoom                    : 1,
            rowSortable             : true,
            columns                 : ['model.name', 'from', 'to'],
            treeTableColumns        : ['from', 'to'],
            columnsHeaders          : {
                'model.name': 'Name',
                'from'      : 'Start Time',
                'to'        : 'End Time'
            },
            columnsClasses          : {
                'model.name': 'gantt-column-name',
                'from'      : 'gantt-column-from',
                'to'        : 'gantt-column-to'
            },
            columnsFormatters       : {
                'from': function (from)
                {
                    return angular.isDefined(from) ? from.format('lll') : undefined;
                },
                'to'  : function (to)
                {
                    return angular.isDefined(to) ? to.format('lll') : undefined;
                }
            },
            treeHeaderContent       : '{{getHeader()}}',
            columnsHeaderContents   : {
                'model.name': '{{getHeader()}}',
                'from'      : '{{getHeader()}}',
                'to'        : '{{getHeader()}}'
            },
            autoExpand              : 'both',
            taskOutOfRange          : 'truncate',
            fromDate                : '',
            toDate                  : '',
            rowContentEnabled       : true,
            rowContent              : '{{row.model.name}}',
            taskContentEnabled      : true,
            taskContent             : '<i ng-click="scope.vm.editDialog($event, \'task\', task)" class="gantt-task-edit-button icon-pencil s12 icon"\n   aria-label="edit task">\n</i>\n<span class="gantt-task-name">\n    {{task.model.name}}\n    <md-tooltip md-direction="top" class="gantt-chart-task-tooltip">\n        <div layout="column" layout-align="center center">\n            <div class="tooltip-name">\n                {{task.model.name}}\n            </div>\n            <div class="tooltip-date">\n                <span>\n                    {{task.model.from.format(\'MMM DD, HH:mm\')}}\n                </span>\n                <span>-</span>\n                <span>\n                    {{task.model.to.format(\'MMM DD, HH:mm\')}}\n                </span>\n            </div>\n        </div>\n    </md-tooltip>\n</span>',
            allowSideResizing       : false,
            labelsEnabled           : true,
            currentDate             : 'line',
            currentDateValue        : new Date(),
            draw                    : true,
            readOnly                : false,
            groupDisplayMode        : 'group',
            filterTask              : '',
            filterRow               : '',
            timeFrames              : {
                'day'    : {
                    start  : moment('8:00', 'HH:mm'),
                    end    : moment('20:00', 'HH:mm'),
                    working: true,
                    default: true
                },
                'noon'   : {
                    start  : moment('12:00', 'HH:mm'),
                    end    : moment('13:30', 'HH:mm'),
                    working: false,
                    default: true
                },
                'weekend': {
                    working: false
                },
                'holiday': {
                    working: false,
                    color  : 'red',
                    classes: ['gantt-timeframe-holiday']
                }
            },
            dateFrames              : {
                'weekend'    : {
                    evaluator: function (date)
                    {
                        return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                    },
                    targets  : ['weekend']
                },
                '11-november': {
                    evaluator: function (date)
                    {
                        return date.month() === 10 && date.date() === 11;
                    },
                    targets  : ['holiday']
                }
            },
            timeFramesWorkingMode   : 'hidden',
            timeFramesNonWorkingMode: 'visible',
            columnMagnet            : '15 minutes',
            timeFramesMagnet        : true,
            dependencies            : true,
            canDraw                 : function (event)
            {
                var isLeftMouseButton = event.button === 0 || event.button === 1;
                return vm.options.draw && !vm.options.readOnly && isLeftMouseButton;
            },
            drawTaskFactory         : function ()
            {
                return {
                    id   : ganttUtils.randomUuid(),  // Unique id of the task.
                    name : 'Drawn task', // Name shown on top of each task.
                    color: '#AA8833' // Color of the task in HEX format (Optional).
                };
            },
            api                     : function (ganttApi)
            {
                // API Object is used to control methods and events from angular-gantt.
                vm.api = ganttApi;

                vm.api.core.on.ready($scope, function ()
                {
                    // When gantt is ready, load data.
                    // `data` attribute could have been used too.
                    vm.load();

                    // DOM events
                    vm.api.directives.on.new($scope, function (directiveName, directiveScope, element)
                    {
                        /**
                         * Gantt Task
                         */
                        if ( directiveName === 'ganttTask' )
                        {
                            element.on('mousedown touchstart', function (event)
                            {
                                event.preventDefault();
                                event.stopPropagation();
                                vm.live.row = directiveScope.task.row.model;
                                if ( angular.isDefined(directiveScope.task.originalModel) )
                                {
                                    vm.live.task = directiveScope.task.originalModel;
                                }
                                else
                                {
                                    vm.live.task = directiveScope.task.model;
                                }
                                $scope.$digest();
                            });

                        }

                        /**
                         * Gantt Row
                         */
                        else if ( directiveName === 'ganttRow' )
                        {

                            element.on('click', function (event)
                            {
                                event.stopPropagation();
                            });

                            element.on('mousedown touchstart', function (event)
                            {
                                event.stopPropagation();
                                vm.live.row = directiveScope.row.model;
                                $scope.$digest();
                            });

                        }

                        /**
                         * Gantt Row Label
                         */
                        else if ( directiveName === 'ganttRowLabel' )
                        {
                            // Fix for double trigger due to gantt-sortable plugin
                            element.off('click');

                            element.on('click', function (event)
                            {
                                event.preventDefault();
                                editDialog(event, 'row', directiveScope.row);
                            });

                            element.on('mousedown touchstart', function ()
                            {
                                vm.live.row = directiveScope.row.model;
                                $scope.$digest();
                            });

                        }
                    });

                    vm.api.tasks.on.rowChange($scope, function (task)
                    {
                        vm.live.row = task.row.model;
                    });

                    objectModel = new GanttObjectModel(vm.api);
                });
            }
        };

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.search = search;
        vm.setSortMode = setSortMode;
        vm.addDialog = addDialog;
        vm.editDialog = editDialog;
        vm.canAutoWidth = canAutoWidth;
        vm.getColumnWidth = getColumnWidth;
        vm.load = load;
        vm.reload = reload;

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {
            // Set Gantt Chart height at the init
            calculateHeight();

            angular.element($window).on('resize', function ()
            {
                $scope.$apply(function ()
                {
                    calculateHeight();
                });
            });
        }

        /**
         * Max Height Fix
         */
        function calculateHeight()
        {
            vm.options.maxHeight = $document.find('#chart-container').offsetHeight;
        }

        /**
         * Add New Row
         */
        function addDialog(ev)
        {
            $mdDialog.show({
                controller         : 'GanttChartAddEditDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/gantt-chart/dialogs/add-edit/add-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: {
                        chartData : vm.data,
                        dialogType: 'add'
                    }
                }
            });
        }

        /**
         * Edit Dialog
         */
        function editDialog(ev, formView, formData)
        {
            $mdDialog.show({
                controller         : 'GanttChartAddEditDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/gantt-chart/dialogs/add-edit/edit-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: {
                        chartData : vm.data,
                        dialogType: 'edit',
                        formView  : formView,
                        formData  : formData
                    }
                }
            });
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
         * Search
         * @param sidenavId
         */
        function search(option, keyword)
        {
            if ( option === 'rows' )
            {
                vm.options.filterRow = keyword;
            }
            else if ( option === 'tasks' )
            {
                vm.options.filterTask = keyword;
            }
        }

        /**
         * Sort Mode
         * @param mode
         */
        function setSortMode(mode)
        {
            vm.options.sortMode = mode;

            if ( angular.isUndefined(mode) )
            {
                vm.options.rowSortable = true;
            }
            else
            {
                vm.options.rowSortable = false;
            }
        }

        /**
         * Side Mode
         */
        $scope.$watch('vm.options.sideMode', function (newValue, oldValue)
        {
            if ( newValue !== oldValue )
            {
                vm.api.side.setWidth(undefined);

                $timeout(function ()
                {
                    vm.api.columns.refresh();
                });
            }
        });

        function canAutoWidth(scale)
        {
            if ( scale.match(/.*?hour.*?/) || scale.match(/.*?minute.*?/) )
            {
                return false;
            }

            return true;
        }

        function getColumnWidth(widthEnabled, scale, zoom)
        {
            if ( !widthEnabled && vm.canAutoWidth(scale) )
            {
                return undefined;
            }

            if ( scale.match(/.*?week.*?/) )
            {
                return 150 * zoom;
            }

            if ( scale.match(/.*?month.*?/) )
            {
                return 300 * zoom;
            }

            if ( scale.match(/.*?quarter.*?/) )
            {
                return 500 * zoom;
            }

            if ( scale.match(/.*?year.*?/) )
            {
                return 800 * zoom;
            }

            return 40 * zoom;
        }

        // Reload data action
        function load()
        {
            vm.data = Tasks.data;
            vm.timespans = Timespans.data;

            // Fix for Angular-gantt-chart issue
            $animate.enabled(true);
            $animate.enabled($document.find('#gantt'), false);

        }

        /**
         * Reload Data
         */
        function reload()
        {
            msApi.resolve('ganttChart.tasks@get', function (response)
            {
                vm.data = response.data;
            });

            msApi.resolve('ganttChart.timespans@get', function (response)
            {
                vm.timespans = response.data;
            });
        }

        // Visual two way binding.
        var ganttDebounceValue = 1000;

        var listenTaskJson = ganttDebounce(function (taskJson)
        {
            if ( angular.isDefined(taskJson) )
            {
                var task = angular.fromJson(taskJson);
                objectModel.cleanTask(task);
                var model = vm.live.task;
                angular.extend(model, task);
            }
        }, ganttDebounceValue);

        $scope.$watch('vm.live.taskJson', listenTaskJson);

        var listenRowJson = ganttDebounce(function (rowJson)
        {
            if ( angular.isDefined(rowJson) )
            {
                var row = angular.fromJson(rowJson);
                objectModel.cleanRow(row);
                var tasks = row.tasks;

                delete row.tasks;
                var rowModel = vm.live.row;

                angular.extend(rowModel, row);

                var newTasks = {};
                var i, l;

                if ( angular.isDefined(tasks) )
                {
                    for ( i = 0, l = tasks.length; i < l; i++ )
                    {
                        objectModel.cleanTask(tasks[i]);
                    }

                    for ( i = 0, l = tasks.length; i < l; i++ )
                    {
                        newTasks[tasks[i].id] = tasks[i];
                    }

                    if ( angular.isUndefined(rowModel.tasks) )
                    {
                        rowModel.tasks = [];
                    }

                    for ( i = rowModel.tasks.length - 1; i >= 0; i-- )
                    {
                        var existingTask = rowModel.tasks[i];
                        var newTask = newTasks[existingTask.id];

                        if ( angular.isUndefined(newTask) )
                        {
                            rowModel.tasks.splice(i, 1);
                        }
                        else
                        {
                            objectModel.cleanTask(newTask);
                            angular.extend(existingTask, newTask);

                            delete newTasks[existingTask.id];
                        }
                    }
                }
                else
                {
                    delete rowModel.tasks;
                }

                angular.forEach(newTasks, function (newTask)
                {
                    rowModel.tasks.push(newTask);
                });
            }
        }, ganttDebounceValue);

        $scope.$watch('vm.live.rowJson', listenRowJson);

        $scope.$watchCollection('vm.live.task', function (task)
        {
            vm.live.taskJson = angular.toJson(task, true);
            vm.live.rowJson = angular.toJson(vm.live.row, true);
        });

        $scope.$watchCollection('vm.live.row', function (row)
        {
            vm.live.rowJson = angular.toJson(row, true);
            if ( angular.isDefined(row) && angular.isDefined(row.tasks) && row.tasks.indexOf(vm.live.task) < 0 )
            {
                vm.live.task = row.tasks[0];
            }
        });

        $scope.$watchCollection('vm.live.row.tasks', function ()
        {
            vm.live.rowJson = angular.toJson(vm.live.row, true);
        });
    }

})();
