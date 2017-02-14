(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('msNoteItemController', msNoteItemController)
        .directive('msNoteItem', msNoteItemDirective);

    /** @ngInject */
    function msNoteItemController($document)
    {
        var vm = this;
        var fontSizes = {
            '1': {
                fontSize  : 14,
                lineHeight: 19
            },
            '2': {
                fontSize  : 18,
                lineHeight: 28
            },
            '3': {
                fontSize  : 24,
                lineHeight: 36
            },
            '4': {
                fontSize  : 36,
                lineHeight: 48
            },
            '5': {
                fontSize  : 48,
                lineHeight: 60
            }
        };

        vm.element = [];
        vm.noFontResize = false;

        // Methods
        vm.updateDescriptionFontSize = updateDescriptionFontSize;

        //////

        function updateDescriptionFontSize()
        {
            if ( vm.noFontResize || !vm.note.description || vm.note.description === '' )
            {
                return;
            }

            var fontSize = '';
            var descWidth = Math.floor(vm.columnWidth - 52); // 48px paddings, + 4px tolerance
            var tmp = angular.element('<div style="visibility:hidden; font-size:10px;line-height: 10px;position:absolute;z-index:-1;white-space:pre-wrap;word-wrap: break-word;"></div>');
            tmp.appendTo($document.find('body'));

            fontSize = checkLineCount(sizeFromMaxWordCount());

            angular.element(vm.element).find('md-description').attr('font-size', fontSize);

            tmp.remove();

            function sizeFromMaxWordCount()
            {
                var words = vm.note.description.split(' ');

                var wordLengths = words.map(function (word)
                {
                    return tmp.text(word)[0].clientWidth;
                });

                var maxWordLength = Math.max.apply(Math, wordLengths);

                var maxPx = Math.floor((descWidth * 10) / maxWordLength);

                if ( maxPx < 18 )
                {
                    fontSize = 1;
                }
                else if ( 18 <= maxPx && maxPx < 24 )
                {
                    fontSize = 2;
                }
                else if ( 24 <= maxPx && maxPx < 36 )
                {
                    fontSize = 3;
                }
                else if ( 36 <= maxPx && maxPx < 48 )
                {
                    fontSize = 4;

                }
                else if ( maxPx >= 48 )
                {
                    fontSize = 5;
                }
                return fontSize;
            }

            function checkLineCount(sizeFromMaxWord)
            {
                var size = fontSizes[sizeFromMaxWord];
                var result;

                tmp.text(vm.note.description);
                tmp.width(descWidth);
                tmp.css({
                    'line-height': size.lineHeight + 'px',
                    'font-size'  : size.fontSize + 'px'
                });

                var lineCount = tmp[0].clientHeight / size.lineHeight;

                if ( 4 < lineCount && lineCount < 6 )
                {
                    result = 4;
                }
                else if ( 6 <= lineCount && lineCount < 9 )
                {
                    result = 3;
                }
                else if ( 9 <= lineCount && lineCount < 11 )
                {
                    result = 2;
                }
                else if ( 11 <= lineCount )
                {
                    result = 1;
                }
                else
                {
                    result = sizeFromMaxWord;
                }
                return result;
            }
        }
    }

    /** @ngInject */
    function msNoteItemDirective()
    {
        return {
            restrict        : 'A',
            controller      : 'msNoteItemController as MsNoteItem',
            templateUrl     : 'app/main/apps/notes/directives/ms-note-item/ms-note-item.html',
            require         : ['msNoteItem', '^msMasonry'],
            bindToController: {
                msNoteItem: '='
            },
            link            : function (scope, element, attributes, controllers)
            {

                var MsNoteItem = controllers[0];
                var msMasonry = controllers[1];

                MsNoteItem.element = element;
                MsNoteItem.note = MsNoteItem.msNoteItem;


                if ( angular.isDefined(attributes.noFontResize) )
                {
                    MsNoteItem.noFontResize = true;
                }

                scope.$watch('MsNoteItem.msNoteItem', function (newVal, oldVal)
                {
                    if ( newVal !== oldVal )
                    {
                        MsNoteItem.note = newVal;
                    }
                });

                scope.$on('msMasonryItem:startReLayout', function ()
                {
                    if ( MsNoteItem.noFontResize || MsNoteItem.columnWidth === msMasonry.columnWidth )
                    {
                        return;
                    }

                    MsNoteItem.columnWidth = msMasonry.columnWidth;

                    MsNoteItem.updateDescriptionFontSize();
                });
            }
        };
    }
})();