/*jslint browser: true, sloppy: true, vars: true */
/*global $, Zepto, alert*/





// var supportsMixBlendMode = window.getComputedStyle(document.body).mixBlendMode;
// if(supportsMixBlendMode) {
//     console.log('supportsMixBlendMode');
// }

// var supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
// if(supportsBackgroundBlendMode) {
//     console.log('supportsBackgroundBlendMode');
// }



$(document).ready(function () {
    



// blending two images
// window.onload = function () {
//     var img1 = document.getElementById('img1');
//     var img2 = document.getElementById('img2');
//     var canvas = document.getElementById("canvas");
//     var context = canvas.getContext("2d");

//     var hero = $(".hero__blend"); // our placeholder image to get dimensions off

//     // var width = img1.width;
//     // var height = img1.height;

//     var width = hero.width();
//     var height = hero.height();
//     // console.log(width + ' : ' + height);

//     canvas.width = width;
//     canvas.height = height;

//     var pixels = 4 * width * height;
//     context.drawImage(img1, 0, 0);
//     var image1 = context.getImageData(0, 0, width, height);
//     var imageData1 = image1.data;
//     context.drawImage(img2, 0, 0);
//     var image2 = context.getImageData(0, 0, width, height);
//     var imageData2 = image2.data;
//     while (pixels--) {
//         imageData1[pixels] = imageData1[pixels] * imageData2[pixels] / 255; // multiply
//     }
//     image1.data = imageData1;
//     context.putImageData(image1, 0, 0);
// };






    "use strict";



// $("#myImage").pixastic("multiply");


    /*
     * Globals
     */
    var analog = {
        config: {
            environment : 'development' // development or production
        },
        vars: {
            mediaQuery: ''
        }
    };




    /*****************************************************
     * Development tools
     *****************************************************/
    if (analog.config.environment === 'development') {
        // grid overlay
        (function () {
            $("body").prepend("<span id='grid-overlay'/>").append("<span id='grid-toggle'/>");
            $('#grid-toggle').on('click', function () {
                $('#grid-overlay').toggle();
            });
        }());
        // open all html links
        $('#open-all-links').on('click', function (e) {
            $('.html-link').each(function () {
                window.open($(this).attr('href'));
            });
            e.preventDefault();
        });
    }
    /*****************************************************
     * end of Development tools
     *****************************************************/




    /*
     * Responsive media queries
     */
    // var mediaQuery; // our global responsiveMediaQuery variable
    $("body").append("<span id='viewport'/>");
    var responsiveMediaQueries = function () {
        if ($('html').hasClass('lt-ie9')) {
            var viewport = window.getComputedStyle(document.getElementById('hero'), "");
            // thanks Jeremy: http://adactio.com/journal/5429/
            analog.vars.mediaQuery = (viewport.getPropertyValue("font-family"));
        }
        // else
        // analog.vars.mediaQuery = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
        analog.vars.mediaQuery = window.getComputedStyle(document.getElementById('hero'), ':after').content;
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





// var RESIZEABLE_CANVAS=true;
    // var heroSizer = $('#hero-sizer');
//     var heroWidth = heroSizer.width();
//     var heroHeight = heroSizer.height();
//     console.log(heroHeight);

    // var canvas = document.getElementByClassName('hero__blend'),
    //     context = canvas.getContext('2d'),
    //     base_image;
    // function make_base() {
    //     base_image = new Image();
    //     base_image.src = 'images/hero-stella.jpg';
    //     base_image.onload = function () {
    //         // test that the image was loaded
    //         context.drawImage(base_image, 0, 0); // , canvas.width, canvas.height
    //     };
    // // canvas.attr('width').heroSizer.width()
    // // canvas.attr('height').heroSizer.height()
    // }
    // make_base();


    


    // var canvas = document.getElementById('hero__overlay');

    // // var winMin = Math.min(window.innerWidth,window.innerHeight);
    // // canvas.width = winMin;
    // // canvas.height = winMin;

    // var context = canvas.getContext('2d');

    //   //   globalCompositeOperation :
    //   // normal | multiply | screen | overlay | 
    //   // darken | lighten | color-dodge | color-burn | hard-light | 
    //   // soft-light | difference | exclusion | hue | saturation | 
    //   // color | luminosity

    // context.globalCompositeOperation = 'multiply';

    // //cyan
    // context.fillStyle = 'rgb(0,255,255)';
    // context.beginPath();
    // context.arc(200, 100, 100, 0, Math.PI*2, true); 
    // context.closePath();
    // context.fill();


// $(".photo").pixastic("multiply");

// var img = document.getElementById("photo"); // get the image element

// if (img.complete) { // make sure the image is fully loaded
//     var newimg = Pixastic.process(
//         img,
//         "brightness",   // brightness/contrast adjustment

//         {       // options object

//             "brightness" : 60,  // set brightness option value to 60
//             "contrast" : 0.5,   // set contrast option value to 0.5,
//             "rect" : {      // apply the effect to this region only
//                 "left" : 100,
//                 "right" : 100,
//                 "width" : 200,
//                 "height" : 150
//             }
//         }
//     )
// }





});









