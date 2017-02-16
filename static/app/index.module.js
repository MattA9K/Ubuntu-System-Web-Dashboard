(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // Apps
            'app.dashboards',
            'app.calendar',
            'app.e-commerce',
            'app.mail',
            'app.chat',
            'app.file-manager',
            'app.gantt-chart',
            'app.scrumboard',
            'app.todo',
            'app.contacts',
            'app.notes',
            
            // Non-Fuse Apps (custom)
            'app.forum',
            'app.sample',
            
            // Pages
            'app.pages',

            // User Interface
            'app.ui',

            // Components
            'app.components'
        ]);
})();
