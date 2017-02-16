/**
 * Created by mattmbp on 2/16/17.
 */

/**
 * Created by mattmbp on 2/16/17.
 */
(function ()
{
    'use strict';

    angular
        .module('app.forum')
        .controller('ForumController', ForumController);

    /** @ngInject */
    function ForumController(ForumData, $msSidenav)
    {
        var vm = this;

        // Data
        vm.helloText = ForumData.data.helloText;

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
