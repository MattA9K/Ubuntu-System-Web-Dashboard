(function ()
{
    'use strict';

    angular
        .module('app.ui.icons', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        $stateProvider.state('app.ui_icons', {
            url      : '/ui/icons',
            views    : {
                'content@app': {
                    templateUrl: '/static/app/main/ui/icons/icons.html',
                    controller : 'IconsController as vm'
                }
            },
            resolve  : {
                Icons: function (msApi)
                {
                    return msApi.resolve('icons@get');
                }
            },
            bodyClass: 'icons'
        });

        // Api
        msApiProvider.register('icons', ['/static/assets/icons/selection.json']);
    }

})();