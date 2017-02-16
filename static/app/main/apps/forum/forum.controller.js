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
    function ForumController(ForumData)
    {
        var vm = this;

        // Data
        vm.helloText = ForumData.data.helloText;

        // Methods

        //////////
    }
})();
