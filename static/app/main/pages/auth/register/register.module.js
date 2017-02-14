(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_register', {
            url      : '/pages/auth/register',
            views    : {
                'main@'                          : {
                    templateUrl: '/static/app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_register': {
                    templateUrl: '/static/app/main/pages/auth/register/register.html',
                    controller : 'RegisterController as vm'
                }
            },
            bodyClass: 'register'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/pages/auth/register');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.register', {
            title : 'Register',
            state : 'app.pages_auth_register',
            weight: 3
        });
    }

})();