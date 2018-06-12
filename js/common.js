/*jslint browser: true, sloppy: true, vars: true */
/*global $, Mustache*/


$(document).ready(function () {

    "use strict";


    /*-------------------------
     * Global variables
     ------------------------*/
    var analog = {
        config: {
            environment : 'development' // development or production
        },
        vars: {
            mediaQuery: ''
        }
    };


    /*-------------------------
     * Development tools
     ------------------------*/
    if (analog.config.environment === 'development') {
        // grid overlay
        (function () {
            $("body").prepend("<span id='grid-overlay'/>").append("<span id='grid-toggle'/>");
            $('#grid-toggle').on('click', function () {
                $('#grid-overlay').toggle();
            });
        }());
    }


    /*-------------------------
     * Responsive media queries
     ------------------------*/
    // var mediaQuery; // our global responsiveMediaQuery variable
    $("body").append("<span id='viewport'/>");
    var responsiveMediaQueries = function () {
        if ($('html').hasClass('lt-ie9')) {
            var viewport = window.getComputedStyle(document.getElementById('viewport'), "");
            // thanks Jeremy: http://adactio.com/journal/5429/
            analog.vars.mediaQuery = (viewport.getPropertyValue("font-family"));
        }
        // else
        // analog.vars.mediaQuery = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
        analog.vars.mediaQuery = window.getComputedStyle(document.getElementById('viewport'), ':after').content;
        // some browsers (e.g. FF) return the :after content including the quote marks (e.g. "desktop" vs desktop), so we check for the existence of the string instead
        if (analog.vars.mediaQuery.indexOf("desktop") !== -1) {
            analog.vars.mediaQuery = "desktop";
        } else if (analog.vars.mediaQuery.indexOf("tablet") !== -1) {
            analog.vars.mediaQuery = "tablet";
        } else if (analog.vars.mediaQuery.indexOf("mobile") !== -1) {
            analog.vars.mediaQuery = "mobile";
        }
    };
    responsiveMediaQueries();
    // and update analog.vars.mediaQuery on window resize
    $(window).resize(function () { responsiveMediaQueries(); });
    // Example usage: if (analog.vars.mediaQuery === 'tablet') { do this super cool thing... }



    /*-------------------------
     * Templates
     ------------------------*/

    // $(function() {
        $.getJSON('data.json', function(data) {
            var template1 = $('#carousel-tmpl').html();
            Mustache.parse(template1); // optional, speeds up future uses
            var rendered1 = Mustache.to_html(template1, data);
            $('.carousel__items').html(rendered1);

            var template2 = $('#carousel-thumbnails-tmpl').html();
            Mustache.parse(template2);
            var rendered2 = Mustache.to_html(template2, data);
            $('.carousel__thumbnails').html(rendered2);

            initSlider();
        });
    // }());


    /*-------------------------
     * Slider
     ------------------------*/

    function Carousel( container, nav ) {
        this.container = container;
        this.nav = nav;
        this.current = 0; // start with the first slide active
    }

    var slider = new Carousel( $('ul.carousel__items'), $('ul.carousel__thumbnails') );

    // Initiate slider start state
    function initSlider() {
        var currentSlide = slider.container.find('li').eq(0).addClass('current');
        slider.nav.show();
        slider.nav.find('li').eq(0).find('a').addClass('active');
        setSlideHeight();

        setTimeout(function () {
          // scroll copy to top to show it has overflow
          currentSlide.find('.copy').animate({scrollTop: 0}, 300);
        }, 150);
    }

    // Slider nav functionality
    slider.nav.on('click', 'li', function() {
      var pos = $(this).index();
      var outItem = slider.container.find('li.current');

      // remove any instance of active thumbnail, then add class to selected
      slider.nav.find('a').removeClass('active');
      $(this).find('a').addClass('active');

      if ( outItem.index() !== pos ) { // only animate if a different item than current is selected
        // outItem.removeClass('current').css('transform', 'translate3d(-150px, 0, 0)');
        outItem.removeClass('current').addClass('slideOut');
        setTimeout(function () {
          // outItem.css('transform', 'translate3d(150px, 0, 0)'); // reset position
          outItem.removeClass('slideOut'); // reset position
          // animate in the new slide
          var inItem = $(slider.container).find('li').eq(pos).addClass('current');
          // scroll copy to top to show it has overflow
          inItem.find('.copy').animate({scrollTop: 0}, 300);
        }, 150);
      }

      if (analog.vars.mediaQuery === 'mobile') {
        setSlideHeight(pos); //reset each slide's height if in mobile view
        scrollToPos(slider.container); // and scroll the page up to show new item
      }
    });


    /*-------------------------
     * Slider responsiveness
     ------------------------*/
    var setSlideHeight = function (pos) {
        var container = slider.container;
        var slideCopy = container.find('.copy');
        var slideHeight = container.find('img').height();
        var containerHeight = '';
        var slideNum = pos || 0; // was a pos passed in, or has the user not used the slider nav yet

        // bug fix
        // occassionally slideHeight returns 0 on page load - it may be the imagesLoaded test returns too soon?
        // anyhoos, we simply run it again if that's the case and viola! we have a slide height
        if (!slideHeight || slideHeight < 100) { // i.e. null or 0, or if chrome only partially loads it... it seems (clear history cache and visit page to see it)
            container.imagesLoaded(function () {
                setSlideHeight();
            });
        } else {

            // must make number of list items a mutiple of 5 to fill the distributed grid
            var emptyItemsReqd = (slider.nav.find('li').length) % 5;
            if (emptyItemsReqd !== 0) {
                emptyItemsReqd = 5 - emptyItemsReqd;
                // for each emptyItemsReqd add an empty list item
                for ( var i = 0; i < emptyItemsReqd; i++ ) {
                    console.log('emptyItemsReqd: ' + emptyItemsReqd);
                    slider.nav.append('<li class="mobile-one-third tablet-one-fifth desktop-one-sixth">');
                }
            }

            if (analog.vars.mediaQuery !== 'mobile') {
                slideCopy.each(function() {
                    // get individual copy heights
                    var copyHeight = $(this).height();
                    // update height to match image height and set overflow to scroll bottom (animated scrollTop when slide revealed)
                    $(this).height(slideHeight).scrollTop(copyHeight);
                });
                // slideCopy.height(slideHeight);
                containerHeight = container.find('li').outerHeight(); // updated height reading
                container.height(containerHeight);
            } else {
                slideCopy.height('auto');
                containerHeight = container.find('li').eq(slideNum).outerHeight(); // updated height reading
                container.height(containerHeight);
            }
        }
    };

    // recalculate on window resize
    $(window).resize(function () { setSlideHeight(); });


    // scroll page
    var scrollToPos = function (target) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 750);
    };




















    // // touch sliding panels
    // // http://mobile.smashingmagazine.com/2012/06/21/play-with-hardware-accelerated-css/
    // $(function () {

    //     var sliding, startClientX, startClientY, startPixelOffset, pixelOffset, currentSlide = 0;

    //     var slideCount = $('.slide').length;

    //     $(document).on('mousedown touchstart', 'body', slideStart);
    //     $(document).on('mousemove touchmove', 'body', slide);
    //     $(document).on('mouseup touchend', 'body', slideEnd);

    //     // implement left/right arrow keys for slides
    //     $(document).keydown(function(e){
    //         if (e.keyCode == 37) { // left arrow key
    //             // set dummy values: if pO is greater than sPO slides animate to the right, and vice-versa
    //             pixelOffset = 1;
    //             startPixelOffset = 0;
    //         }
    //         if (e.keyCode == 39) { // right arrow key
    //             pixelOffset = 0;
    //             startPixelOffset = 1;
    //         }
    //         sliding = 2;
    //         slideEnd();
    //     });

    //     // disable dragging images in browsers
    //     $(document).on('mousedown', 'img', function(obj) {
    //         return false;
    //     });

    //     $('.slide').each(function (i) {
    //         $('#bullets').append('<li class="bullet"></li>');

    //     });
    //     updateBullets();

    //     function slideStart(event) {
    //         console.log('touchstart');
    //         if (event.originalEvent.touches)
    //             event = event.originalEvent.touches[0];
    //         if (sliding === 0) {
    //             sliding = 1;
    //             startClientX = event.clientX;
    //             startClientY = event.clientY;
    //         }
    //     }

    //     function slide(event) {

    //         //mouse registers, but not touch
    //         // var xMovement = Math.abs(event.clientX - startClientX);
    //         // var yMovement = Math.abs(event.clientY - startClientY);

    //         var xMovement, yMovement = 0;
    //         if (event.originalEvent.touches) {// mobile only
    //             //touch registers, but not mouse
    //             xMovement = Math.abs(event.originalEvent.touches[0].clientX - startClientX);
    //             yMovement = Math.abs(event.originalEvent.touches[0].clientY - startClientY);
    //             // constrain to either horizontal slide or vertical scroll
    //         }

    //         if(yMovement <= xMovement) { // scrolling horizontally
    //             event.preventDefault();
    //             //hideNav();

    //             if (event.originalEvent.touches)
    //                 event = event.originalEvent.touches[0];
    //                 var deltaSlideX = event.clientX - startClientX;

    //             if (sliding === 1 && deltaSlideX !== 0) {
    //                 sliding = 2;
    //                 startPixelOffset = pixelOffset;
    //             }
    //             if (sliding === 2) {
    //                 var touchPixelRatio = 1;
    //                 if ((currentSlide === 0 && event.clientX > startClientX) || (currentSlide === slideCount - 1 && event.clientX < startClientX))
    //                 touchPixelRatio = 3;
    //                 pixelOffset = startPixelOffset + deltaSlideX / touchPixelRatio;
    //                 $('#slides').css({'-webkit-transform': 'translate3d(' + pixelOffset + 'px,0,0)', 'transform': 'translate3d(' + pixelOffset + 'px,0,0)'}).removeClass();
    //             }
    //         } else { // scrolling vertically
    //             sliding = 0;
    //         }
    //     }

    //     function slideEnd(event) {
    //         if (sliding == 2) {
    //             sliding = 0;
    //             currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
    //             currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
    //             pixelOffset = currentSlide * -$('#wrapper').width();
    //             //$('#temp').remove(); // this was slowing down every animation after the first. seems better to collect style declarations in the head than take a hit to the smoothness
    //             $('<style id="temp">#slides.animate{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0); transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
    //             $('#slides').addClass('animate').css({'-webkit-transform': '', 'transform': ''});
    //             // functions to call at end of slide transition
    //             $(document).on('webkitTransitionEnd transitionend', '#slides', transEnd);
    //         }
    //     }

    //     function transEnd(event) {
    //         // ensure transitionend only fires once
    //         $(document).off('webkitTransitionEnd transitionend', '#slides');

    //         //if (event.propertyName === "-webkit-transform" || event.propertyName === "transform") {

    //         var pause = 0;
    //         // scroll page to top of slide
    //         var headerHeight = $('header').height() + 1; // 1px for container border
    //         if(window.pageYOffset > headerHeight) {
    //             pause = 250;
    //             $.scroll(headerHeight); // zepto.scroll.js
    //             // or use css method: http://mitgux.com/smooth-scroll-to-top-using-css3-animations
    //         }

    //         setTimeout(function(){
    //             // add a clas of 'current' to slide
    //             $('.slide').removeClass('current');
    //             $('.slide:nth-child(' + (currentSlide + 1) + ')').addClass('current');
    //             // set #slides height to current child's slide height
    //             var currentSlideHeight = $('.slide.current').height();
    //             $('.slide.current').height(currentSlideHeight);
    //             $('#slides').height(currentSlideHeight);
    //             // update bullets
    //             updateBullets();
    //         }, pause);

    //     }

    //     function updateBullets() {
    //         // remove the selected class from each bullet and set it to the current one
    //         $('.bullet').removeClass('selected');
    //         $('.bullet:nth-child(' + (currentSlide + 1) + ')').addClass('selected');
    //     }

    // }());












});
