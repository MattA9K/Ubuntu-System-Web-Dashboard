(function ()
{
    'use strict';

    angular
        .module('app.ui.page-layouts.simple.right-sidenav-iii', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_page-layouts_simple_right-sidenav-iii', {
            url  : '/ui/page-layouts/simple/right-sidenav-iii',
            views: {
                'content@app': {
                    templateUrl: '/static/app/main/ui/page-layouts/simple/right-sidenav-iii/right-sidenav-iii.html',
                    controller : 'SimpleRightSidenavIIIController as vm'
                }
            }
        });
    }

})();