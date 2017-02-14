(function ()
{
    'use strict';

    angular
        .module('app.components.custom-directives', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.components_custom-directives', {
                abstract: true,
                url     : '/components/custom-directives'
            })
            .state('app.components_custom-directives.ms-card', {
                url  : '/ms-card',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-card.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-form-wizard', {
                url  : '/ms-form-wizard',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-form-wizard.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-info-bar', {
                url  : '/ms-info-bar',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-info-bar.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-masonry', {
                url  : '/ms-masonry',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-masonry.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-material-color-picker', {
                url  : '/ms-material-color-picker',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-material-color-picker.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-nav', {
                url  : '/ms-nav',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-nav.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-navigation', {
                url  : '/ms-navigation',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-navigation.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-random-class', {
                url  : '/ms-random-class',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-random-class.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-responsive-table', {
                url  : '/ms-responsive-table',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-responsive-table.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-scroll', {
                url  : '/ms-scroll',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-scroll.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-search-bar', {
                url  : '/ms-search-bar',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-search-bar.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-shortcuts', {
                url  : '/ms-shortcuts',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-shortcuts.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-sidenav-helper', {
                url  : '/ms-sidenav-helper',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-sidenav-helper.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-splash-screen', {
                url  : '/ms-splash-screen',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-splash-screen.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-stepper', {
                url  : '/ms-stepper',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-stepper.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-timeline', {
                url  : '/ms-timeline',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-timeline.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            })
            .state('app.components_custom-directives.ms-widget', {
                url  : '/ms-widget',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/components/custom-directives/pages/ms-widget.html',
                        controller : 'CustomDirectivesController as vm'
                    }
                }
            });

        // Navigation
        msNavigationServiceProvider.saveItem('components.custom-directives', {
            title : 'Custom Directives',
            icon  : 'icon-star',
            weight: 2
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-card', {
            title : 'ms-card',
            state : 'app.components_custom-directives.ms-card',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-form-wizard', {
            title : 'ms-form-wizard',
            state : 'app.components_custom-directives.ms-form-wizard',
            weight: 2
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-info-bar', {
            title : 'ms-info-bar',
            state : 'app.components_custom-directives.ms-info-bar',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-masonry', {
            title : 'ms-masonry',
            state : 'app.components_custom-directives.ms-masonry',
            weight: 4
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-material-color-picker', {
            title : 'ms-material-color-picker',
            state : 'app.components_custom-directives.ms-material-color-picker',
            weight: 5
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-nav', {
            title : 'ms-nav',
            state : 'app.components_custom-directives.ms-nav',
            weight: 6
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-navigation', {
            title : 'ms-navigation',
            state : 'app.components_custom-directives.ms-navigation',
            weight: 7
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-random-class', {
            title : 'ms-random-class',
            state : 'app.components_custom-directives.ms-random-class',
            weight: 8
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-responsive-table', {
            title : 'ms-responsive-table',
            state : 'app.components_custom-directives.ms-responsive-table',
            weight: 9
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-scroll', {
            title : 'ms-scroll',
            state : 'app.components_custom-directives.ms-scroll',
            weight: 10
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-search-bar', {
            title : 'ms-search-bar',
            state : 'app.components_custom-directives.ms-search-bar',
            weight: 11
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-shortcuts', {
            title : 'ms-shortcuts',
            state : 'app.components_custom-directives.ms-shortcuts',
            weight: 12
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-sidenav-helper', {
            title : 'ms-sidenav-helper',
            state : 'app.components_custom-directives.ms-sidenav-helper',
            weight: 13
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-splash-screen', {
            title : 'ms-splash-screen',
            state : 'app.components_custom-directives.ms-splash-screen',
            weight: 14
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-stepper', {
            title : 'ms-stepper',
            state : 'app.components_custom-directives.ms-stepper',
            weight: 15
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-timeline', {
            title : 'ms-timeline',
            state : 'app.components_custom-directives.ms-timeline',
            weight: 16
        });

        msNavigationServiceProvider.saveItem('components.custom-directives.ms-widget', {
            title : 'ms-widget',
            state : 'app.components_custom-directives.ms-widget',
            weight: 17
        });
    }
})();