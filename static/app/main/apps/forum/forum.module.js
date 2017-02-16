/**
 * Created by mattmbp on 2/16/17.
 */

(function () 
    {
        'use strict';
        
        angular
            .module('app.file-manager',
                [
                    // 3rd Party Dependencies
                ]
            )
            .config(config);
        
        // @ngInject
        function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
            // State
            $stateProvider.state('app.file-manager', {
                url : '/forum'
            })
        }
    }
)();