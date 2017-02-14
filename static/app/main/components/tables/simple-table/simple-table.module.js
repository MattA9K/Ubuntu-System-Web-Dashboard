(function ()
{
    'use strict';

    angular
        .module('app.components.tables.simple-table', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        $stateProvider.state('app.components_tables_simple-table', {
            url  : '/components/table/simple-table',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/components/tables/simple-table/simple-table.html',
                    controller : 'SimpleTableController as vm'
                }
            },
            resolve: {
                Employees: function (msApi)
                {
                    return msApi.resolve('tables.employees@get');
                }
            }
        });

        // Api
        msApiProvider.register('tables.employees', ['/static/app/data/tables/employees.json']);
    }

})();