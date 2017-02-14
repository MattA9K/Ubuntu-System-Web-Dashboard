(function ()
{
    'use strict';

    angular
        .module('app.ui.helper-classes', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_helper-classes', {
            url      : '/ui/helper-classes',
            views    : {
                'content@app': {
                    templateUrl: '/static/app/main/ui/helper-classes/helper-classes.html',
                    controller : 'HelperClassesController as vm'
                }
            },
            bodyClass: 'helper-classes'
        });
    }

})();