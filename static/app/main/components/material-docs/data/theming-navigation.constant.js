angular.module('app.components.material-docs')
    .constant('THEMING_NAVIGATION', [
        {
            name       : "Introduction and Terms",
            stateName  : 'material_components_theming_introduction',
            id         : 'introduction',
            templateUrl: "/static/partials/Theming/01_introduction.html",
            url        : "Theming/01_introduction",
            weight     : 1
        },
        {
            name       : "Declarative Syntax",
            stateName  : 'material_components_theming_declarative',
            id         : 'declarative',
            templateUrl: "/static/partials/Theming/02_declarative_syntax.html",
            url        : "Theming/02_declarative_syntax",
            weight     : 2
        },
        {
            name       : "Configuring a Theme",
            stateName  : 'material_components_theming_configuring',
            id         : 'configuring',
            templateUrl: "/static/partials/Theming/03_configuring_a_theme.html",
            url        : "Theming/03_configuring_a_theme",
            weight     : 3
        },
        {
            name       : "Multiple Themes",
            stateName  : 'material_components_theming_multiple',
            id         : 'multiple',
            templateUrl: "/static/partials/Theming/04_multiple_themes.html",
            url        : "Theming/04_multiple_themes",
            weight     : 4
        },
        {
            name       : "Theming under the hood",
            stateName  : 'material_components_theming_under_the_hood',
            id         : 'under_the_hood',
            templateUrl: "/static/partials/Theming/05_under_the_hood.html",
            url        : "Theming/05_under_the_hood",
            weight     : 5
        },
        {
            name       : "Browser Colors",
            stateName  : 'material_components_theming_browser_color',
            id         : 'browser_color',
            templateUrl: "/static/partials/Theming/06_browser_color.html",
            url        : "Theming/06_browser_color",
            weight     : 6
        }
    ]);