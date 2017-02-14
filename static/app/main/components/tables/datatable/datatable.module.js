(function ()
{
    'use strict';

    angular
        .module('app.components.tables.datatable',
            [
                // 3rd Party Dependencies
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        $stateProvider.state('app.components_tables_datatable', {
            url    : '/components/table/datatable',
            views  : {
                'content@app': {
                    templateUrl: '/static/app/main/components/tables/datatable/datatable.html',
                    controller : 'DatatableController as vm'
                }
            },
            resolve: {
                Employees: function (msApi)
                {
                    return msApi.resolve('tables.employees100@get');
                }
            }
        });

        // Api
        msApiProvider.register('tables.employees100', ['/static/app/data/tables/employees100.json']);
    }

})();