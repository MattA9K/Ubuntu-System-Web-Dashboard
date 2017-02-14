(function ()
{
    'use strict';

    angular
        .module('app.e-commerce',
            [
                // 3rd Party Dependencies
                'wipImageZoom',
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.e-commerce', {
                abstract: true,
                url     : '/e-commerce'
            })
            .state('app.e-commerce.dashboard', {
                url      : '/dashboard',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/dashboard/dashboard.html',
                        controller : 'DashboardEcommerceController as vm'
                    }
                },
                resolve  : {
                    Dashboard: function (msApi)
                    {
                        return msApi.resolve('e-commerce.dashboard@get');
                    }
                },
                bodyClass: 'ecommerce'
            })
            .state('app.e-commerce.products', {
                url      : '/products',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/products/products.html',
                        controller : 'ProductsController as vm'
                    }
                },
                resolve  : {
                    Products: function (eCommerceService)
                    {
                        return eCommerceService.getProducts();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.products.add', {
                url      : '/add',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve: {
                    Product: function (eCommerceService)
                    {
                        return eCommerceService.newProduct();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.products.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve  : {
                    Product: function ($stateParams, Products, eCommerceService)
                    {
                        return eCommerceService.getProduct($stateParams.id);
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders', {
                url      : '/orders',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/orders/orders.html',
                        controller : 'OrdersController as vm'
                    }
                },
                resolve  : {
                    Orders: function (eCommerceService)
                    {
                        return eCommerceService.getOrders();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/e-commerce/views/order/order.html',
                        controller : 'OrderController as vm'
                    }
                },
                resolve  : {
                    Order        : function ($stateParams, Orders, eCommerceService)
                    {
                        return eCommerceService.getOrder($stateParams.id);
                    },
                    OrderStatuses: function (eCommerceService)
                    {
                        return eCommerceService.getOrderStatuses();
                    }
                },
                bodyClass: 'e-commerce'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/apps/e-commerce');

        // Api
        msApiProvider.register('e-commerce.dashboard', ['/static/app/data/e-commerce/dashboard.json']);
        msApiProvider.register('e-commerce.products', ['/static/app/data/e-commerce/products.json']);
        msApiProvider.register('e-commerce.orders', ['/static/app/data/e-commerce/orders.json']);
        msApiProvider.register('e-commerce.order-statuses', ['/static/app/data/e-commerce/order-statuses.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.e-commerce', {
            title : 'E-Commerce',
            icon  : 'icon-cart',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.dashboard', {
            title: 'Dashboard',
            state: 'app.e-commerce.dashboard'
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.products', {
            title: 'Products',
            state: 'app.e-commerce.products'
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.orders', {
            title: 'Orders',
            state: 'app.e-commerce.orders'
        });
    }
})();