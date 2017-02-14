(function ()
{
    'use strict';

    angular
        .module('app.scrumboard',
            [
                // 3rd Party Dependencies
                'moment-picker',
                'ui.calendar',
                'ui.sortable',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider
            .state('app.scrumboard', {
                abstract : true,
                url      : '/scrumboard',
                resolve  : {
                    BoardList: function (msApi)
                    {
                        return msApi.resolve('scrumboard.boardList@get');
                    }
                },
                bodyClass: 'scrumboard'
            })

            // Home
            .state('app.scrumboard.boards', {
                url  : '/boards',
                views: {
                    'content@app': {
                        templateUrl: '/static/app/main/apps/scrumboard/views/boards/boards-view.html',
                        controller : 'BoardsViewController as vm'
                    }
                }
            })

            // Board
            .state('app.scrumboard.boards.board', {
                    url    : '/:id/:uri',
                    views  : {
                        'content@app'                                  : {
                            templateUrl: '/static/app/main/apps/scrumboard/scrumboard.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'scrumboardContent@app.scrumboard.boards.board': {
                            templateUrl: '/static/app/main/apps/scrumboard/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return BoardService.getBoardData($stateParams.id);
                        }
                    }
                }
            )

            // Add board
            .state('app.scrumboard.boards.addBoard', {
                    url    : '/add',
                    views  : {
                        'content@app'                                     : {
                            templateUrl: '/static/app/main/apps/scrumboard/scrumboard.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'scrumboardContent@app.scrumboard.boards.addBoard': {
                            templateUrl: '/static/app/main/apps/scrumboard/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return BoardService.addNewBoard();
                        }
                    }
                }
            )

            // Calendar
            .state('app.scrumboard.boards.board.calendar', {
                url  : '/calendar',
                views: {
                    'scrumboardContent@app.scrumboard.boards.board': {
                        templateUrl: '/static/app/main/apps/scrumboard/views/calendar/calendar-view.html',
                        controller : 'CalendarViewController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('/static/app/main/apps/scrumboard');

        // Api
        msApiProvider.register('scrumboard.boardList', ['/static/app/data/scrumboard/board-list.json']);
        msApiProvider.register('scrumboard.board', ['/static/app/data/scrumboard/boards/:id.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.scrumboard', {
            title : 'Scrumboard',
            icon  : 'icon-trello',
            state : 'app.scrumboard.boards',
            weight: 8
        });
    }

})();