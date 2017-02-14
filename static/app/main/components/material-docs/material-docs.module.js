(function () {
    'use strict';

    /**
     * Replace those for demo assets
     * img/                     >>>            assets/angular-material-assets/img/
     * 'icons                   >>>            'assets/angular-material-assets/icons/
     */
    angular
        .module('app.components.material-docs', ['ngMaterial', 'ngMessages'])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, $stateProvider, ELEMENTS_NAVIGATION, LAYOUT_NAVIGATION, THEMING_NAVIGATION) {
        msNavigationServiceProvider.saveItem('components.elements', {
            title : 'Angular Material Elements',
            icon  : 'icon-layers',
            weight: 0
        });

        msNavigationServiceProvider.saveItem('components.elements.inputs', {
            title : 'Inputs',
            weight: 0
        });

        msNavigationServiceProvider.saveItem('components.elements.buttons', {
            title : 'Buttons',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('components.elements.content-elements', {
            title : 'Content Elements',
            weight: 2
        });

        msNavigationServiceProvider.saveItem('components.elements.lists', {
            title : 'Lists',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('components.elements.menus', {
            title : 'Menus',
            weight: 4
        });

        msNavigationServiceProvider.saveItem('components.elements.progress', {
            title : 'Progress',
            weight: 5
        });

        msNavigationServiceProvider.saveItem('components.elements.others', {
            title : 'Others',
            weight: 6
        });

        msNavigationServiceProvider.saveItem('components.material_layout', {
            title : 'Angular Material Layout',
            icon  : 'icon-view-quilt',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('components.material_theming', {
            title : 'Angular Material Theming',
            icon  : 'icon-palette-advanced',
            weight: 1
        });


        angular.forEach(ELEMENTS_NAVIGATION, function (component) {

            $stateProvider.state('app.docs_' + component.stateName, {
                url  : '/components/angular-material/elements/' + component.url,
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/material-docs/material-doc-template.html',
                        controller : 'DocTemplateController as vm'
                    }
                },
                data : component
            });

            // Navigation
            msNavigationServiceProvider.saveItem(component.navPath + '.' + component.url, {
                title : component.name,
                state : 'app.docs_' + component.stateName,
                weight: component.weight
            });
        });

        angular.forEach(LAYOUT_NAVIGATION, function (component) {

            $stateProvider.state('app.docs_' + component.stateName, {
                url  : '/components/angular-material/' + component.url,
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/material-docs/material-doc-basic-template.html',
                        controller : 'BasicDocTemplateController as vm',
                    },
                },
                 data : {
                    component: component,
                    parentTitle    : 'ANGULAR MATERIAL LAYOUT'
                }
            });

            // Navigation
            msNavigationServiceProvider.saveItem('components.material_layout.' + component.url, {
                title : component.name,
                state : 'app.docs_' + component.stateName,
                weight: component.weight
            });
        });

        angular.forEach(THEMING_NAVIGATION, function (component) {

            $stateProvider.state('app.docs_' + component.stateName, {
                url  : '/components/angular-material/' + component.url,
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/material-docs/material-doc-basic-template.html',
                        controller : 'BasicDocTemplateController as vm',
                    },
                },
                data : {
                    component: component,
                    parentTitle    : 'ANGULAR MATERIAL THEMING'
                }
            });

            // Navigation
            msNavigationServiceProvider.saveItem('components.material_theming.' + component.url, {
                title : component.name,
                state : 'app.docs_' + component.stateName,
                weight: component.weight
            });
        });

    }
})();