(function ()
{
    'use strict';

    angular
        .module('app.ui.page-layouts.simple.left-sidenav-iii', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_page-layouts_simple_left-sidenav-iii', {
            url  : '/ui/page-layouts/simple/left-sidenav-iii',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/ui/page-layouts/simple/left-sidenav-iii/left-sidenav-iii.html',
                    controller : 'SimpleLeftSidenavIIIController as vm'
                }
            }
        });
    }

})();