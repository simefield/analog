// Simplist (SuperMarkIt)
// Created by Richard Sime
// January 2014

$(document).ready(function () {

    var s, Supermarkit = {
        settings : {
            el: '',
            console: $('.console'),
            ul: $('.list'), // <ul class='list'>
            // item: $('li.item'),
            item: $(document.getElementsByClassName('item')),
            itemHeight: $('li').height(),
            newItem: $('.new-item'),
            // input: $('input'),
            input: $(document.getElementsByTagName('input')),
            // itemCount: $('.item-count'),
            check: $('.check'),
            buttonFocus: $('.button-focus'),
            newRow: '',
            saveButton: $(document.getElementById('save')),
            listTitle: $('.title h1'),
            listEditDate: $('.title span')
            // saveButton: $('.save')
            // ,
            // cloneIndex: ''
        },
        init: function () {
            s = this.settings;

            this.scrollToBot();
            this.itemTouch();
            this.itemBlur();
            this.itemCountUpdate();
            this.dragTouch();
            this.newItemFocus();

            this.save();
            // this.storeItem();
            this.getListItems();
            // this.deleteItem();
            this.clearLocalStorage();

            this.generateSavedList();

        },
        createNewItemRow: function() {
            $('<li class="item"><span><i class="check"></i><input type="text" spellcheck="false" autocorrect="off" autocomplete="off" value=""></span></li>').insertBefore(s.newItem).find('input').focus();
            Supermarkit.itemCountUpdate();
        },
        scrollToBot: function() {
            var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop(); // http://stackoverflow.com/questions/4655273/jquery-window-scrolltop-but-no-window-scrollbottom
            $(window).scrollTop(scrollBottom);
        },
        itemTouch: function() {
            // remove / hide a list item
            s.ul.on('swipeLeft', 'li.item', function(event) { // removed doubleTap - replaced with check-box tap below
                Supermarkit.removeElement($(this));
            });
            // another way to remove a list-item is to check it off
            s.ul.on('tap', '.check', function(event) {
                Supermarkit.removeElement($(this).parents('li'));
            });
        },
        removeElement: function(element) {
            Supermarkit.removeFocusability(); // refer to this function's comments on Zepto's lingering 'tap' issue
                
            // webkitTransitionEnd is called for every property, so event handler would fire for (currently) height, opacity, and left
            // refer: http://www.kirupa.com/html5/the_transitionend_event.htm (search for "transitionend Event Handler")
            element.addClass('hide').on( 'webkitTransitionEnd', function(event) {
                if (event.propertyName == "height") {
                    element.remove();
                    Supermarkit.itemCountUpdate();
                    Supermarkit.addFocusability();
                }
            }, false );
        },
        itemBlur: function() {
            s.ul.on('blur', 'input', function(e) {
                var self = $(this),
                    listItem = self.parents('li'),
                    value = self.val();
                if (value.length === 0) {
                    Supermarkit.removeElement(listItem);
                }
            });
        },
        newItemFocus: function() {
            s.buttonFocus.on('focus', function(event) {
                Supermarkit.createNewItemRow();
            });
        },
        itemCountUpdate: function() {
            $('.check').each(function () {
                var num = $(this).parents('li').index();
                $(this).html(num);
            });
        },
        dragTouch: function(event) {
            var dragItem,
                behindDragged,
                placeholderItem,
                cloneDragItem,
                cloneIndex;
            
            /*
             * longTap - prepare for dragging
             */
            s.ul.on('longTap', 'li.item', function(event) {
                Supermarkit.removeFocusability();
                // alert('longTap');
                // event.preventDefault();
                // s.input.attr('readonly', true); // make inputs unfocusable while dragging - due to Zepto's lingering 'tap' bug: https://github.com/madrobby/zepto/issues/511;
                
                // remove from flow with position: absolute
                dragItem = $(this).addClass('dragging');
                
                // cloned item gets physically moved between items (acting as a placeholder), then is left in position while original item is deleted on touchend
                // start by cloning the item in the same place as it's twin (the original)
                cloneDragItem = $(dragItem).clone().insertAfter(dragItem).addClass('clone');


                /*
                 * touchmove
                 */
                $(this).bind('touchmove', dragItem, function(event) {
                    // alert('touchmove');
                    event.preventDefault(); // prevent page moving under finger

                    var touch = event.touches[0];

                    // touchX = event.pageX;
                    touchY = event.pageY;

                    // move list item
                    dragItem.css({'top': touchY - (s.itemHeight/2)});

                    // use invisible fixed position buttons for scroll up and down, e.g. $(window).scrollTop(+=1);
                    var wst = $(window).scrollTop();
                    // s.console.html('Y pos: ' + touchY + ', WST: ' + wst);

                    // get the list item behind our dragged item
                    behindDragged = $(document.elementFromPoint(100, (touchY + (s.itemHeight / 2) - wst))).parents('li'); // take a central x-point to assure we're hitting the inputs, then return parent <li>
                    
                    // move our placeholder item to make room for our draged one
                    cloneDragItem.insertBefore(behindDragged);

                    // cloneIndex = cloneDragItem.index();
                    // s.console.html('cloneIndex: ' + cloneIndex);
                    // do something when the clone moves
                    // $(this).observe(cloneIndex, Supermarkit.cloneMoved(change, cloneDragItem, cloneIndex));
                    // cloneDragItem.prev('li').addClass('move-down');
                    
                    // cloneDragItem.next('li').addClass('move-up');
                    // cloneDragItem.prev('li').css({'background-color': 'orange'});
                    // s.console.html('move-up: ' + moveUpCounter + 'move-down: ' + moveDownCounter);

                    cloneDragItem.addClass('move');

                }, false);

                
                /*
                 * touchend
                 */
                $(this).on('touchend', dragItem, function(event) {
                    // alert('touchend');

                    // remove original item, & leave it's clone
                    dragItem.remove();
                    cloneDragItem.attr('class', 'item'); // removes other class names ('clone' & 'dragging')
                    // .css('-webkit-transition-duration', '4s')

                    // add our new element to collection for event handling purposes
                    // s.item = $('li.item');

                    Supermarkit.itemCountUpdate();

                    // make the inputs focusable again after drag
                    // but set a delay so the last touch event doesn't trigger focus
                    setTimeout(Supermarkit.addFocusability, 500); // we don't want too long or we might start a new longTap event before 'addFocusability' is called, potentially causing focus on next dragged element
                    
                    $(this).unbind('touchmove'); // stop the item dragability
                    
                });
            });
        },

        // we want to know when the clone moves so we can add an animation class or do something cool
        // http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe
        // cloneMoved: function(change, cloneDragItem, cloneIndex) {
        //     s.console.html('cloneIndex changed: ' + change);
        //     // cloneDragItem.addClass('moved');
        //     // setTimeout( function() {cloneDragItem.removeClass('moved');}, 500);
        // },

        // make inputs and buttons unfocusable / tapable while and after dragging and other events (like deleting items)
        // due to Zepto's lingering 'tap' bug: https://github.com/madrobby/zepto/issues/511
        removeFocusability: function() {
            // s.console.html('removed focus');
            $('input, .button-focus').attr('readonly', true);
        },
        addFocusability: function() {
            // s.console.html('added focus');
            // $('input .button-focus').attr('readonly', false);
            $('input, .button-focus').removeAttr('readonly');
        },

        save: function() {
            s.saveButton.on('tap click', function(event) {
                event.preventDefault();
                localStorage.clear();
                Supermarkit.storeItems();
            });
        },

        // http://www.linuxforu.com/2012/04/html5-localstorage-offline-web-applications/
        storeItems: function() {

            // var inputs = $(document.getElementsByTagName('input'));

            var values = new Array();

            var d_names = new Array("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat");
            var m_names = new Array("Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec");
            var d = new Date();
            var curr_year         = d.getFullYear();
            var curr_month        = d.getMonth();
            var curr_date         = d.getDate();
            var curr_day          = d.getDay();
            var curr_hours        = d.getHours();
            var curr_minutes      = d.getMinutes();
            var curr_seconds      = d.getSeconds();
            var curr_milliseconds = d.getMilliseconds();

            var timestamp = (curr_year + '.' + curr_month + '.' + curr_date + '.' + curr_hours + '.' + curr_minutes + '.' + curr_seconds + '.' + curr_milliseconds);

            var humanDate = (d_names[curr_day] + ', ' + curr_date + ' ' + m_names[curr_month]);

            var listName = s.listTitle.html();
            s.listTitle.html(listName);
            s.listEditDate.html(humanDate);

            var key = (timestamp + ';' + listName + ';' + humanDate);

            
            $('.item input').each(function(index) {
                var num = $(this).val();
                values.push(num);
                // console.log(values);
            });

            // values.push(document.forms["todoForm"]["priority"].value);
            // values.push(duedate);
            // try {
            //     localStorage.setItem(timestamp, values.join(','));
            // } catch (e) {
            //     if (e == QUOTA_EXCEEDED_ERR) {
            //         alert('Quota exceeded!');
            //     }
            // }

            localStorage.setItem(key, values.join(','));


            // Supermarkit.getListItems();
        },
        getListItems: function () {
            var i = 0;
            var j = 0;
            var itemKey = '';
            var value = '';
            var values = '';
            if (localStorage.length === 0) {
                s.console.html('nought much in here');
            } else {
                for (i=0; i<localStorage.length; i++) {
                    itemKey = localStorage.key(i);
                    value = localStorage.getItem(itemKey);
                    values = value.split(",");
                    for (j=0; j<values.length; j++) {
                        $('<li class="item"><span><i class="check"></i><input type="text" spellcheck="false" autocorrect="off" autocomplete="off" value="' + values[j] + '"></span></li>').insertBefore(s.newItem);
                    }
                    Supermarkit.itemCountUpdate();
                }
            }
        },
        // deleteItem: function (key) {
        //     localStorage.removeItem(key);
        //     getTasks();
        // },
        clearLocalStorage: function () {
            $('#clear-cache').on('click', function(event) { // tap
                event.preventDefault();
                s.console.html('clear');
                localStorage.clear();
            });
        },
        generateSavedList: function () {
            
        }



    };


    $(function () {
        Supermarkit.init();
    });

});











            // dragTouch: function(event) {
            //     var behindDragged = '';
            //     // s.ul.bind('touchstart touchmove touchend', function (event) { updateFinger(event); });
            //     s.ul.on('longTap', 'li:not(.new-item)', function(event) {
            //         self = $(this).addClass('dragging');
            //         self.next('li').addClass('drag-enter');
            //         // event.preventDefault();

            //         s.ul.bind('touchmove', self, function(event) {
            //             event.preventDefault();

            //             var touch = event.touches[0];

            //             touchX = event.pageX;
            //             touchY = event.pageY;

            //             // move list item
            //             self.css({'top': touchY - (s.itemHeight/2)});

            //             // behindDragged = $(document.elementFromPoint(touchX, touchY));

            //             behindDragged = $(document.elementFromPoint(100, (touchY - s.itemHeight))); // take a central x-point to assure we're hitting the draggable elements (inputs)

            //             $(behindDragged).parents('li').addClass('drag-enter');
            //             $('li').not((behindDragged).parents('li')).removeClass('drag-enter');
            //             // s.console.html(elIndex);
            //         }, false);

            //         // unbind touchmove
            //         s.ul.bind('touchend', self, function() {
            //             $(this).unbind('touchmove');
            //             behindDragged.parents('li').removeClass('drag-enter');

            //             self.removeClass('dragging');
            //         });
            //     });
            // }














// document.addEventListener('pinchOut', function(event) {
//     alert('scale = ' + event.scale + 'rotation = ' + event.rotation), false;
// });


// s.ul.on('pinchOut', 'span', function(event) {
//     alert('scale = ' + event.scale + 'rotation = ' + event.rotation), false;

// });



//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.



//     var gesture = {}, gestureTimeout

//     // function parentIfText(node){
//     //   return 'tagName' in node ? node : node.parentNode
//     // }

//     $(document).bind('gesturestart', function(e){
//       var now = Date.now(), delta = now - (gesture.last || now)
//       // gesture.target = parentIfText(e.target)
//       gesture.target = e.target
//       gestureTimeout && clearTimeout(gestureTimeout)
//       gesture.e1 = e.scale
//       gesture.last = now

//       // var allTouches = e.touches

//       // touch2 = e.touches[1]

//       pageX = e.pageX
//       pageY = e.pageY


//     }).bind('gesturechange', function(e){
//       gesture.e2 = e.scale
//     }).bind('gestureend', function(e){
      
//       // touch1 = e.x
//       touch1 = e.id

//       pageX2 = e.pageX
//       pageY2 = e.pageY
      
//       if (gesture.e2 > 0) {
//         Math.abs(gesture.e1 - gesture.e2) != 0 && $(gesture.target).trigger('pinch') &&
//           $(gesture.target).trigger('pinch' + (gesture.e1 - gesture.e2 > 0 ? 'In' : 'Out'))
//         gesture.e1 = gesture.e2 = gesture.last = 0
//       } else if ('last' in gesture) {
//         gesture = {}
//       }
//     })

//     ;['pinch', 'pinchIn', 'pinchOut'].forEach(function(m){
//       $.fn[m] = function(callback){ return this.bind(m, callback) }
//     })


// $('#gestureit').on('pinchIn', 'p', function(event) {
//     // alert('e.pageX = ' + pageX + '\n e.pageY = ' + pageY + '\ne.pageX2 = ' + pageX2 + '\n e.pageY2 = ' + pageY2), false;
//     // alert('X change = ' + (pageX - pageX2) + '\nY change = ' + (pageY - pageY2)), false;
//     alert('touch1 = ' + touch1), false;

// });


// $(document).bind('touchmove', function(event) {
//     event.preventDefault();
//     var touch = event.touches[0];
//     alert("Touch x:" + touch.pageX + ", y:" + touch.pageY);
// }, false);






