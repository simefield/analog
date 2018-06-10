// /*
//  * intercept "click" with "tap" where supported
//  * https://coderwall.com/p/dc2dbq

// /*global define: false, window: false */
// define(['jquery'], function ($) {
// // $(function () {
//   'use strict';

//   return function () {
//     /* Begin monkey-patch Tap event support into $ */
//     var x = 0,
//       y = 0,
//       threshold = 40,
//       // Sometimes there is lag between the last update and touchend.
//       // Unfortunately, we can't get coords on touchend, so this is
//       // the fudge factor.

//       indexOfTap = function(x, y) {
//         var i, len, tapX, tapY;
//         for(i = 0, len = taps.length; i < len; i++) {
//           tapX = taps[i][0];
//           tapY = taps[i][1];
//           if (Math.abs(tapX - x) <= threshold &&
//             Math.abs(tapY - y) <= threshold) {
//             return i;
//           }
//         }
//         return -1;
//       },
//       makeTap = function (callback) {
//         return function (e) {
//           return callback.call(this, e);
//         };
//       },
//       wrapClick = function (callback) {
//         return function (e) {

//           var tap = indexOfTap(e.x, e.y);
//           if (tap !== -1) {
//             taps.splice(tap, 1); // remove the tap
//             e.preventDefault();
//             e.stopPropagation();
//             return;
//           }

//           return callback.call(this, e);
//         };
//       };

//       var taps = [];


//     try {
//       var update = function (e) {
//         x = e.touches[0].clientX;
//         y = e.touches[0].clientY;
//       };
//       window.addEventListener('touchstart', update, true);
//       window.addEventListener('touchmove', update, true);
//       window.addEventListener('touchend', function (e) {
//         taps.push([x,y]);
//       }, true);

//     } catch (o_O){
//       //could not register listeners
//     }

//     $.fn.oldBind = $.fn.bind;
//     $.fn.oldDelegate = $.fn.delegate;
//     $.fn.bind = function (event, callback) {
//       if (event.indexOf('click') > -1) {
//         this.oldBind('tap', makeTap(callback));
//         this.oldBind(event, wrapClick(callback));
//       } else {
//         this.oldBind(event, callback);
//       }

//       return this;
//     };

//     $.fn.delegate = function (selector, event, callback) {
//       if (event.indexOf('click') > -1) {
//         this.oldDelegate(selector, 'tap', makeTap(callback));
//         this.oldDelegate(selector, event, wrapClick(callback));
//       } else {
//         this.oldDelegate(selector, event, callback);
//       }

//       return this;
//     };

//     /* end monkey-patch Tap event support into $  */
//   };

// });







/*
 * From here: http://phonegap-tips.com/articles/fast-touch-event-handling-eliminate-click-delay.html
 *
 * this could be worth a gander too:
 * http://www.gianlucaguarini.com/blog/detecting-the-tap-event-on-a-mobile-touch-device-using-javascript/
 */
// $.event.special.tap = {
//   setup: function() {
//     var self = this,
//       $self = $(self);

//     // Bind touch start
//     $self.on('touchstart', function(startEvent) {
//       // Save the target element of the start event
//       var target = startEvent.target;

//       // When a touch starts, bind a touch end handler exactly once,
//       $self.one('touchend', function(endEvent) {
//         // When the touch end event fires, check if the target of the
//         // touch end is the same as the target of the start, and if
//         // so, fire a click.
//         if (target == endEvent.target) {
//           $.event.simulate('tap', self, endEvent);
//         }
//       });
//     });
//   }
// };



// works pretty well
// $.event.special.tap = {
//   // Abort tap if touch lasts longer than half a second
//   timeThreshold: 200,
//   setup: function() {
//     var self = this,
//       $self = $(self);

//     // Bind touch start
//     $self.on('touchstart', function(startEvent) {
//       // Save the target element of the start event
//       var target = startEvent.target,
//         timeout;

//       function removeTapHandler() {
//         clearTimeout(timeout);
//         $self.off('touchend', tapHandler);
//       };

//       function tapHandler(endEvent) {
//         removeTapHandler();

//         // When the touch end event fires, check if the target of the
//         // touch end is the same as the target of the start, and if
//         // so, fire a click.
//         if (target == endEvent.target) {
//           $.event.simulate('tap', self, endEvent);
//         }
//       };

//       // Remove the tap handler if the timeout expires
//       timeout = setTimeout(removeTapHandler, $.event.special.tap.timeThreshold);

//       // When a touch starts, bind a touch end handler
//       $self.on('touchend', tapHandler);
//     });
//   }
// };




// // helpers
// var $ = document.querySelector.bind(document),
//     $$ = document.querySelectorAll.bind(document),
//     getPointerEvent = function(event) {
//         return event.targetTouches ? event.targetTouches[0] : event;
//     },
    
//     setListener = function (elm,events,callback) {
//         var eventsArray = events.split(' '),
//             i = eventsArray.length;
//         while(i--){
//             elm.addEventListener( eventsArray[i], callback, false );
//         }
//     };

// var $touchArea = $('#touchArea'),
//     touchStarted = false, // detect if a touch event is sarted
//     currX = 0,
//     currY = 0,
//     cachedX = 0,
//     cachedY = 0;

// //setting the events listeners
// setListener($touchArea,'touchstart mousedown',function (e){
//     e.preventDefault(); 
//     var pointer = getPointerEvent(e);
//     // caching the current x
//     cachedX = currX = pointer.pageX;
//     // caching the current y
//     cachedY = currY = pointer.pageY;
//     // a touch event is detected      
//     touchStarted = true;
//     $touchArea.innerHTML = 'Touchstarted';
  
//     // detecting if after 200ms the finger is still in the same position
//     setTimeout(function (){
//         if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
//             // Here you get the Tap event
//             $touchArea.innerHTML = 'Tap';
//         }
//     },200);
// });
// setListener($touchArea,'touchend mouseup touchcancel',function (e){
//     e.preventDefault();
//     // here we can consider finished the touch event
//     touchStarted = false;
//     $touchArea.innerHTML = 'Touchended';
// });
// setListener($touchArea,'touchmove mousemove',function (e){
//     e.preventDefault();
//     var pointer = getPointerEvent(e);
//     currX = pointer.pageX;
//     currY = pointer.pageY;
//     if(touchStarted) {
//          // here you are swiping
//          $touchArea.innerHTML = 'Swiping';
//     }
   
// });