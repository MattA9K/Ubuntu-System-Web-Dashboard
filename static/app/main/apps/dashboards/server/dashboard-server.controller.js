(function () {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $interval, DashboardData, $http) {
        var vm = this;

        vm.ramUsage = 0.0;
        vm.ramX = 2;

        function refreshProcesses() {
            $http({
                method: 'GET',
                url: '/main/processesDummy?format=json'
            }).then(function successCallback(response) {

                vm.refreshing = true;
                console.log('API Call has been made.');
                vm.widget7.table.rows = response.data.Processes;
                console.log(response.data.CPU_Usage);
                vm.refreshing = false;
                // CPU TICKER:
                var newValue = {
                    x: vm.cpuX,
                    y: (Math.floor(response.data.CPU_Usage) / 2)
                };

                vm.ramUsage = response.data.RAM_Usage.toFixed(2);
                vm.widget6.chart.data[0].values.shift();
                vm.widget6.chart.data[0].values.push(newValue);
                vm.cpuX += 15;


                var newValueRAM = {
                    x: vm.ramX,
                    y: response.data.RAM_Usage
                };

                vm.widget4.chart.data[0].values.shift();
                vm.widget4.chart.data[0].values.push(newValue);

                vm.ramX += 1;

            }, function errorCallback(response) {

            });
        }

        vm.refreshing = true;
        vm.cpuX = 155;
        $interval(function () {
            refreshProcesses();
        }, 15000);

        refreshProcesses();

        // Widget 7
        vm.widget7 = {
            title: "Processes",
            table: {
                columns: [
                    {
                        title: "User"
                    },
                    {
                        title: "Command"
                    },
                    {
                        title: "Virtual Memory"
                    },
                    {
                        title: "CPU"
                    },
                    {
                        title: "RAM"
                    }
                ],
                rows: [
                    [
                        {
                            value: "anvil",
                            classes: "text-bold"
                        },
                        {
                            value: "dovecot",
                            classes: "text-boxed m-0 green-bg white-fg"
                        },
                        {value: 0},
                        {value: 0},
                        {value: 2}
                    ]
                ]
            },
            dtOptions: {
                dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                pagingType: 'simple',
                pageLength: 10,
                lengthMenu: [10, 20, 50, 100],
                autoWidth: false,
                responsive: true,
                columnDefs: [
                    {
                        width: '20%',
                        targets: [0, 1, 2, 3, 4]
                    }
                ],
                columns: [
                    {},
                    {},
                    {
                        render: function (data, type) {
                            if (type === 'display') {
                                return data + ' KB';
                            }
                            else {
                                return data;
                            }
                        }
                    },
                    {
                        render: function (data, type) {
                            if (type === 'display') {
                                return data + '%';
                            }
                            else {
                                return data;
                            }
                        }
                    },
                    {
                        render: function (data, type) {
                            if (type === 'display') {
                                var el = angular.element(data);
                                el.html(el.text() + ' %');

                                return el[0].outerHTML;
                            }
                            else {
                                return data;
                            }
                        }
                    }
                ]
            }
        };

        vm.diskspacePercentage = 0.0;
        // Data
        vm.dashboardData = DashboardData;

        vm.RAM = 4;
        vm.appendDataToPhysicalMemory = function () {

        };


        $interval(function () {
            $http({
                method: 'GET',
                url: '/main/ram?format=json'
            }).then(function successCallback(response) {
                // console.log(response.data.free);

                var freeMB = response.data.free / 1024;

                vm.widget1.chart.data[0]["values"].push({
                    "x": vm.RAM,
                    "y": (freeMB),
                    "series": 0
                });

                var availableMB = response.data.available / 1024;

                vm.widget1.chart.data[1]["values"].push({
                    "x": vm.RAM,
                    "y": (availableMB),
                    "series": 1
                });

                var totalMB = response.data.total / 1024;

                vm.widget1.chart.data[2]["values"].push({
                    "x": vm.RAM,
                    "y": (totalMB - availableMB),
                    "series": 2
                });
                vm.RAM += 1;
            }, function errorCallback(response) {


            });
        }, 1000);


        // Widget 1
        vm.widget1 = {
            title: vm.dashboardData.widget1.title,
            chart: {
                options: {
                    chart: {
                        type: 'lineChart',
                        color: ['#4caf50', '#3f51b5', '#ff5722'],
                        height: 320,
                        margin: {
                            top: 32,
                            right: 32,
                            bottom: 32,
                            left: 48
                        },
                        useInteractiveGuideline: true,
                        clipVoronoi: false,
                        interpolate: 'cardinal',
                        x: function (d) {
                            return d.x;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        xAxis: {
                            tickFormat: function (d) {
                                return d + ' sec.';
                            },
                            showMaxMin: false
                        },
                        yAxis: {
                            tickFormat: function (d) {
                                return d + ' MB';
                            }
                        },
                        interactiveLayer: {
                            tooltip: {
                                gravity: 's',
                                classes: 'gravity-s'
                            }
                        },
                        legend: {
                            margin: {
                                top: 8,
                                right: 0,
                                bottom: 32,
                                left: 0
                            },
                            rightAlign: false
                        }
                    }
                },
                data: vm.dashboardData.widget1.chart
            }
        };

        // Widget 2
        vm.widget2 = vm.dashboardData.widget2;

        vm.infoCPU = {
            cache_size: "",
            cores: "",
            speed_MHz: "",
            model_name: ""
        };

        $http({
            method: 'GET',
            url: '/main/cpuinfo?format=json'
        }).then(function successCallback(response) {
            vm.infoCPU.cache_size = response.data.cache_size;
            vm.infoCPU.cores = response.data.cores;
            vm.infoCPU.speed_MHz = response.data.speed_MHz;
            vm.infoCPU.model_name = response.data.model_name;
        }, function errorCallback(response) {

        });

        $interval(function () {
            $http({
                method: 'GET',
                url: '/main/storage?format=json'
            }).then(function successCallback(response) {
                vm.widget2["title"] = response.data[0].name;
                vm.widget2["value"]["used"] = response.data[0].used;
                vm.widget2["value"]["total"] = response.data[0].size;
                vm.widget2["value"]["percentage"] = parseFloat((response.data[0].used / response.data[0].size).toFixed(2));
                vm.diskspacePercentage = parseFloat((response.data[0].used / response.data[0].size)) * 100;
            }, function errorCallback(response) {

            });
        }, 2000);

        // Widget 3
        vm.widget3 = vm.dashboardData.widget3;

        // Widget 4
        vm.widget4 = {
            title: vm.dashboardData.widget4.title,
            value: vm.dashboardData.widget4.value,
            footnote: vm.dashboardData.widget4.footnote,
            detail: vm.dashboardData.widget4.detail,
            chart: {
                config: {
                    refreshDataOnly: true,
                    deepWatchData: true
                },
                options: {
                    chart: {
                        type: 'lineChart',
                        color: ['rgba(0, 0, 0, 0.27)'],
                        height: 50,
                        margin: {
                            top: 8,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        duration: 1,
                        clipEdge: true,
                        interpolate: 'cardinal',
                        interactive: false,
                        isArea: true,
                        showLegend: false,
                        showControls: false,
                        showXAxis: false,
                        showYAxis: false,
                        x: function (d) {
                            return d.x;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        yDomain: [0, 4]
                    }
                },
                data: vm.dashboardData.widget4.chart
            },
            init: function () {
                // Run this function once to initialize the widget

                // Grab the x value
                var lastIndex = vm.dashboardData.widget4.chart[0].values.length - 1,
                    x = vm.dashboardData.widget4.chart[0].values[lastIndex].x;

                /**
                 * Emulate constant data flow
                 *
                 * @param min
                 * @param max
                 */
                function latencyTicker(min, max) {
                    // Increase the x value
                    x++;

                    var newValue = {
                        x: x,
                        y: randomNumber
                    };

                    vm.widget4.chart.data[0].values.shift();
                    vm.widget4.chart.data[0].values.push(newValue);

                }

                // Set interval
                // var latencyTickerInterval = $interval(function () {
                //     latencyTicker(1, 4);
                // }, 1000);

                // Cleanup
                // $scope.$on('$destroy', function () {
                //     $interval.cancel(latencyTickerInterval);
                // });
            }
        };

        // Widget 5
        vm.widget5 = vm.dashboardData.widget5;

        $interval(function () {
            $http({
                method: 'GET',
                url: '/main/uptime?format=json'
            }).then(function successCallback(response) {
                vm.widget5["title"] = "System Uptime";
                vm.widget5["value"] = response.data.secs;
                vm.widget5["detail"] = "detail";
                vm.widget5["footnote"] = response.data.ticks;
            }, function errorCallback(response) {

            });
        }, 1000);

        // Widget 6
        vm.widget6 = {
            title: vm.dashboardData.widget6.title,
            chart: {
                config: {
                    refreshDataOnly: true,
                    deepWatchData: true
                },
                options: {
                    chart: {
                        type: 'lineChart',
                        color: ['#03A9F4'],
                        height: 140,
                        margin: {
                            top: 8,
                            right: 32,
                            bottom: 16,
                            left: 48
                        },
                        duration: 1,
                        clipEdge: true,
                        clipVoronoi: false,
                        interpolate: 'cardinal',
                        isArea: true,
                        useInteractiveGuideline: true,
                        showLegend: false,
                        showControls: false,
                        x: function (d) {
                            return d.x;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        yDomain: [0, 100],
                        xAxis: {
                            tickFormat: function (d) {
                                return d + ' sec.';
                            },
                            showMaxMin: false
                        },
                        yAxis: {
                            tickFormat: function (d) {
                                return d + '%';
                            }
                        },
                        interactiveLayer: {
                            tooltip: {
                                gravity: 's',
                                classes: 'gravity-s'
                            }
                        }
                    }
                },
                data: vm.dashboardData.widget6.chart
            },
            init: function () {
                // Run this function once to initialize the widget

                // Grab the x value
                // var lastIndex = vm.dashboardData.widget6.chart[0].values.length - 1,
                //     x = vm.dashboardData.widget6.chart[0].values[lastIndex].x;

                /**
                 * Emulate constant data flow
                 *
                 * @param min
                 * @param max
                 */
                // function cpuTicker(min, max) {
                //     // Increase the x value
                //     x = x + 5;
                //
                //     var newValue = {
                //         x: x,
                //         y: Math.floor(Math.random() * (max - min + 1)) + min
                //     };
                //
                //     vm.widget6.chart.data[0].values.shift();
                //     vm.widget6.chart.data[0].values.push(newValue);
                // }

                // Set interval
                // var cpuTickerInterval = $interval(function () {
                //     cpuTicker(0, 100);
                // }, 5000);

                // Cleanup
                // $scope.$on('$destroy', function () {
                //     $interval.cancel(cpuTickerInterval);
                // });
            }
        };


        vm.widget5 = vm.dashboardData.widget5;

        // vm.testrows = [
        //         [
        //             {
        //                 value: "anvil",
        //                 classes: "text-bold"
        //             },
        //             {
        //                 value: "dovecot",
        //                 classes: "text-boxed m-0 green-bg white-fg"
        //             },
        //             {value: 0},
        //             {value: 0},
        //             {value: 2}
        //         ]];
        vm.testcols = {
            columns: [
                {
                    "title": "Name"
                },
                {
                    "title": "User"
                },
                {
                    "title": "RSS"
                },
                {
                    "title": "Avg. CPU"
                },
                {
                    "title": "Avg. Mem"
                }
            ]
        };


        // Widget 8
        vm.widget8 = vm.dashboardData.widget8;

        // Methods

        //////////

        // Init Widget 4
        vm.widget4.init();

        // Init Widget 6
        vm.widget6.init();
    }
})();