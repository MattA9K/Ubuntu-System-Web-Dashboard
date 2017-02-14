(function ()
{
    'use strict';

    angular
        .module('app.components.material-docs')
        .controller('LayoutCtrl', LayoutCtrl)
        .controller('LayoutTipsCtrl', LayoutTipsCtrl);

    /** @ngInject */
    function LayoutCtrl($scope, $attrs, $location, $rootScope)
    {
        $rootScope.currentComponent = $rootScope.currentDoc = null;

        $scope.exampleNotEditable = true;
        $scope.layoutDemo = {
            mainAxis : 'center',
            crossAxis: 'center',
            direction: 'row'
        };
        $scope.layoutAlign = function ()
        {
            return $scope.layoutDemo.mainAxis +
                   ($scope.layoutDemo.crossAxis ? ' ' + $scope.layoutDemo.crossAxis : '');
        };
    }

    /** @ngInject */
    function LayoutTipsCtrl()
    {
        var self = this;

        /*
         * Flex Sizing - Odd
         */
        self.toggleButtonText = 'Hide';

        self.toggleContentSize = function ()
        {
            var contentEl = angular.element(document.getElementById('toHide'));

            contentEl.toggleClass('ng-hide');

            self.toggleButtonText = contentEl.hasClass('ng-hide') ? 'Show' : 'Hide';
        };
    }

})();