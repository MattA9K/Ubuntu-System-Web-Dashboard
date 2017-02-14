(function ()
{
    'use strict';

    angular
        .module('app.ui.page-layouts.simple.right-sidenav-iii')
        .controller('SimpleRightSidenavIIIController', SimpleRightSidenavIIIController);

    /** @ngInject */
    function SimpleRightSidenavIIIController($mdSidenav)
    {

        var vm = this;

        // Data

        // Methods
        vm.toggleSidenav = toggleSidenav;

        //////////

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }
    }

})();