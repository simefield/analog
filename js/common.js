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
  $.getJSON('data.json', function(data) {
    var template1 = $('#carousel-tmpl').html();
    Mustache.parse(template1); // optional, speeds up future uses
    var rendered1 = Mustache.to_html(template1, data);
    $('.Carousel').html(rendered1);

    var template2 = $('#carousel-thumbnails-tmpl').html();
    Mustache.parse(template2);
    var rendered2 = Mustache.to_html(template2, data);
    $('.CarouselNav').html(rendered2);

    initSlider();
  });

  /*-------------------------
   * Slider
   ------------------------*/
  function Carousel( container, nav ) {
    this.container = container;
    this.nav = nav;
    this.current = 0; // start with the first slide active
  }
  var slider = new Carousel( $('.Carousel'), $('.CarouselNav') );

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

});
