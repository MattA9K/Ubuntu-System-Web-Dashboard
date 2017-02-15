(function ()
{
    'use strict';

    angular
        .module('app.pages.invoice', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.pages_invoice_modern', {
                url      : '/pages/invoice/modern',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/pages/invoice/views/modern/modern.html',
                        controller : 'InvoiceController as vm'
                    }
                },
                resolve  : {
                    Invoice: function (msApi)
                    {
                        return msApi.resolve('invoice@get');
                    }
                },
                bodyClass: 'invoice printable'
            })
            .state('app.pages_invoice_compact', {
                url      : '/pages/invoice/compact',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/pages/invoice/views/compact/compact.html',
                        controller : 'InvoiceController as vm'
                    }
                },
                resolve  : {
                    Invoice: function (msApi)
                    {
                        return msApi.resolve('invoice@get');
                    }
                },
                bodyClass: 'invoice printable'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/pages/invoice');

        // Api
        msApiProvider.register('invoice', ['/static/app/data/invoice/invoice.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('pages.invoice', {
            title : 'Invoice',
            icon  : 'icon-receipt',
            weight: 4
        });

        msNavigationServiceProvider.saveItem('pages.invoice.modern', {
            title : 'Modern',
            state : 'app.pages_invoice_modern'
        });

        msNavigationServiceProvider.saveItem('pages.invoice.compact', {
            title : 'Compact',
            state : 'app.pages_invoice_compact'
        });
    }

})();