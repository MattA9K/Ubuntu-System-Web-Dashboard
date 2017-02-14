(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('OrdersController', OrdersController);

    /** @ngInject */
    function OrdersController($state, Orders)
    {
        var vm = this;

        // Data
        vm.orders = Orders;

        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '72px'
                },
                {
                    // Target the status column
                    targets: 5,
                    render : function (data, type, row, meta)
                    {
                        // Get last order status
                        var orderStatus = vm.orders[meta.row].status[0];

                        if ( type === 'display' )
                        {
                            return '<span class="status ' + orderStatus.color + '">' + orderStatus.name + '</span>';
                        }

                        if ( type === 'filter' )
                        {
                            return orderStatus.name;
                        }

                        return data;
                    }
                },
                {
                    // Target the actions column
                    targets           : 7,
                    responsivePriority: 1,
                    filterable        : false,
                    sortable          : false
                }
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };

        // Methods
        vm.gotoOrderDetail = gotoOrderDetail;

        //////////

        /**
         * Go to product detail
         *
         * @param id
         */
        function gotoOrderDetail(id)
        {
            $state.go('app.e-commerce.orders.detail', {id: id});
        }
    }
})();