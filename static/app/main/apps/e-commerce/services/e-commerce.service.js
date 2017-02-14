(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .factory('eCommerceService', eCommerceService);

    /** @ngInject */
    function eCommerceService($q, $mdToast, msApi)
    {
        var products = [],
            orders = [],
            orderStatuses = [];

        var service = {
            getProducts     : getProducts,
            getProduct      : getProduct,
            updateProduct   : updateProduct,
            newProduct      : newProduct,
            createProduct   : createProduct,
            getOrders       : getOrders,
            getOrder        : getOrder,
            getOrderStatuses: getOrderStatuses
        };

        return service;

        //////////

        /**
         * Get products
         */
        function getProducts()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // If we have already loaded the products,
            // don't do another API call, get them from
            // the array
            if ( products.length > 0 )
            {
                deferred.resolve(products);
            }
            // otherwise make an API call and load
            // the products
            else
            {
                msApi.request('e-commerce.products@get', {},

                    // SUCCESS
                    function (response)
                    {
                        // Store the products
                        products = response.data;

                        // Resolve the promise
                        deferred.resolve(products);
                    },

                    // ERROR
                    function (response)
                    {
                        // Reject the promise
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        }

        /**
         * Get product by id
         *
         * @param id
         */
        function getProduct(id)
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Iterate through the products and find
            // the correct one. This is an unnecessary
            // code as in real world, you would do
            // another API call here to get the product
            // details
            for ( var i = 0; i < products.length; i++ )
            {
                if ( parseInt(products[i].id) === parseInt(id) )
                {
                    deferred.resolve(products[i]);
                }
            }

            return deferred.promise;
        }

        /**
         * Update the product
         *
         * @param id
         * @param product
         */
        function updateProduct(id, product)
        {
            // This is a dummy function for the demo.
            // In real world, you would use this
            // function to make another API call to
            // update your database.
            console.info('The product with the id of', id, 'has been updated with the following information:', product);
        }

        /**
         * Returns a default product structure
         */
        function newProduct()
        {
            return {
                categories      : ['None'],
                images          : [
                    {
                        default: true,
                        id     : 1,
                        url    : 'assets/images/ecommerce/product-image-placeholder.png',
                        type   : 'image'
                    }
                ],
                priceTaxExcl    : 0,
                priceTaxIncl    : 0,
                taxRate         : 0,
                quantity        : 0,
                extraShippingFee: 0,
                active          : false
            };
        }

        /**
         * Create product
         *
         * @param product
         */
        function createProduct(product)
        {
            // This is a dummy function for a demo.
            // In real world, you would do an API
            // call to add new product to your
            // database.

            // Generate a random id
            product.id = Math.floor((Math.random() * 10) + 1);

            // Add the product
            products.unshift(product);

            // Show a toast
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Product created!')
                    .position('top right')
            );
        }

        /**
         * Get orders
         */
        function getOrders()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // If we have already loaded the orders,
            // don't do another API call, get them from
            // the array
            if ( orders.length > 0 )
            {
                deferred.resolve(orders);
            }
            // otherwise make an API call and load
            // the orders
            else
            {
                msApi.request('e-commerce.orders@get', {},

                    // SUCCESS
                    function (response)
                    {
                        // Store the orders
                        orders = response.data;

                        // Resolve the promise
                        deferred.resolve(orders);
                    },

                    // ERROR
                    function (response)
                    {
                        // Reject the promise
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        }

        /**
         * Get order by id
         *
         * @param id
         */
        function getOrder(id)
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Iterate through the orders and find
            // the correct one. This is an unnecessary
            // code as in real world, you would do
            // another API call here to get the order
            // details
            for ( var i = 0; i < orders.length; i++ )
            {
                if ( parseInt(orders[i].id) === parseInt(id) )
                {
                    deferred.resolve(orders[i]);
                }
            }

            return deferred.promise;
        }

        /**
         * Get order statuses
         */
        function getOrderStatuses()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // If we have already loaded the order statuses,
            // don't do another API call, get them from
            // the array
            if ( orderStatuses.length > 0 )
            {
                deferred.resolve(orderStatuses);
            }
            // otherwise make an API call and load
            // the order statuses
            else
            {
                msApi.request('e-commerce.order-statuses@get', {},

                    // SUCCESS
                    function (response)
                    {
                        // Store the order statuses
                        orderStatuses = response.data;

                        // Resolve the promise
                        deferred.resolve(orderStatuses);
                    },

                    // ERROR
                    function (response)
                    {
                        // Reject the promise
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        }
    }

})();