(function ()
{
    'use strict';

    angular
        .module('app.components.maps')
        .controller('MapsController', MapsController);

    /** @ngInject */
    function MapsController($state, uiGmapGoogleMapApi)
    {
        var vm = this;

        // Data
        var currentState = $state.current.name;

        switch ( currentState )
        {
            case 'app.components_maps':
                vm.selectedNavItem = 'simpleMap';
                break;

            case 'app.components_maps.satellite':
                vm.selectedNavItem = 'satelliteMap';
                break;

            case 'app.components_maps.terrain':
                vm.selectedNavItem = 'terrainMap';
                break;

            case 'app.components_maps.simple-marker':
                vm.selectedNavItem = 'simpleMarkerMap';
                break;

            case 'app.components_maps.custom-marker':
                vm.selectedNavItem = 'customMarkerMap';
                break;

            case 'app.components_maps.info-window':
                vm.selectedNavItem = 'infoWindowMap';
                break;

            default:
                vm.selectedNavItem = 'simpleMap';
        }

        // Methods

        //////////

        uiGmapGoogleMapApi.then(function (maps)
        {
            vm.simpleMap = {
                center: {
                    latitude : -34.397,
                    longitude: 150.644
                },
                zoom  : 8
            };

            vm.satelliteMap = {
                center : {
                    latitude : -34.397,
                    longitude: 150.644
                },
                zoom   : 8,
                options: {
                    mapTypeId: maps.MapTypeId.SATELLITE
                }
            };

            vm.terrainMap = {
                center : {
                    latitude : -34.397,
                    longitude: 150.644
                },
                zoom   : 8,
                options: {
                    mapTypeId: maps.MapTypeId.TERRAIN
                }
            };

            vm.simpleMarkerMap = {
                center: {
                    latitude : -25.363882,
                    longitude: 131.044922
                },
                zoom  : 8,
                marker: {
                    id    : 0,
                    coords: {
                        latitude : -25.363882,
                        longitude: 131.044922
                    }
                }
            };

            vm.customMarkerMap = {
                center: {
                    latitude : -25.363882,
                    longitude: 131.044922
                },
                zoom  : 8,
                marker: {
                    id     : 0,
                    coords : {
                        latitude : -25.363882,
                        longitude: 131.044922
                    },
                    options: {
                        icon: {
                            anchor: new maps.Point(36, 36),
                            origin: new maps.Point(0, 0),
                            url   : '//google-developers.appspot.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                        }
                    }
                }
            };

        });
    }

})();