(function () {
    'use strict';

    angular
        .module('app.components.material-docs')
        .controller('BasicDocTemplateController', BasicDocTemplateController);

    /** @ngInject */
    function BasicDocTemplateController($state, ANGULAR_MATERIAL_VERSION) {
        var vm = this;
        vm.materialVersion = ANGULAR_MATERIAL_VERSION;

        vm.component = $state.current.data.component;
        vm.parentTitle = $state.current.data.parentTitle;
    }

})();