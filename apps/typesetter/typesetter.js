/*global jQuery, $, iosFonts, font, fonts, commonFonts, textSamples*/
/*
 * JS compressor
 * http://marijnhaverbeke.nl/uglifyjs
 */
/*
 * Typesetter
 * Created by Richard Sime
 * © March 2014
 */


$(document).ready(function () {

    
    // var clickEvent = "createTouch" in document ? "touchend" : "click";


    var s, Typesetter = {
        settings : {
            isiOS: false,
            fontSelectList: $('#font-families'),
            textBlock: $('[class^="text-block"]'),
            dataProperty: $('[data-property]'),
            addButton: $('.add-text'),
            removeButton: $('.remove'),
            closeButton: $('.close'),
            additionalLink: $('.show-additional'),
            inputFields: $("input"),
            loadingMessage: $('.loading-msg'),
            clickEvent: "createTouch" in document ? "touchend" : "click" // https://gist.github.com/bloodyowl/4375465
            // tapClick: "" // 'tap' or 'click' depending on device (mobile or desktop)
        },
        
        init: function () {
            s = this.settings;

            this.iosDetection();
            this.generateFontList();
            this.activeEdit();
            this.updateProperties();
            this.addTextBlock();
            this.removeTextBlock();
            this.hideSettings();
            this.showHideAdditional();
            this.incrementValues();
            this.disableClick(); // disable "click" events on touch devices
            this.inputSelect();
        },

        disableClick: function () {
            if(s.clickEvent === "touchend") {
                $("a").on('click', function (e) {
                    $(this).trigger( s.clickEvent );
                    e.preventDefault();
                });
            }
        },

        iosDetection: function () {
            var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
            var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
            var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
            // update our iOS var
            if((isiPhone > -1) || (isiPad > -1) || (isiPod > -1)) {
                s.isiOS = true;
            }
        },

        generateFontList: function () {
            // iOS or desktop font list to populate our select list
            var fontList = iosFonts;
            if( !s.isiOS ) { // if false
                fontList = allFonts; // use newFonts, or allFonts for a full list (too long / slow for dev purposes)
            }
            // var loadedCount = $('#num-fonts');
            font.setup(); // run setup when the DOM is ready
            // generate <option>s for <select> list, using detected fonts
            var options;
            for (var i = 0, len = fontList.length; i < len; i++) {
                // console.log(Math.floor((i / len) * 100));
                if (font.isInstalled(fontList[i])) { // returns true or false
                    options = $("<option></option>").attr("value",fontList[i]).text(fontList[i]);
                }
                s.fontSelectList.append(options);
            }
            // add Verdana in manually as it gets excluded by virtue of being my test font in fonts-test.js
            $('<option value="Verdana">Verdana</option>').insertBefore('option[value="Verdana-Bold"]');
            
            // select a random font from the list
            var listLength = s.fontSelectList.find('option').length;
            var randomFont = Math.floor(Math.random() * listLength);
            s.fontSelectList.find('option').eq(randomFont).attr('selected', 'selected');
            
            // hide loading message and show application
            setTimeout(function () { // ensure message is on screen long enough to read it
                s.loadingMessage.addClass('remove');
                s.textBlock.removeClass('hide');
                s.addButton.removeClass('hide');
            }, 3000);
            
            // select Helvetica or first font-family on list
            // if (s.fontSelectList.find('option[value="HelveticaNeue-Bold"]').length) {
            //     $('option[value="HelveticaNeue-Bold"]').attr('selected', 'selected');
            // } else {
            //     s.fontSelectList.find('option').eq(0).attr('selected', 'selected');
            // }
        },

        activeEdit: function () {
            // remove all 'active' classes
            // select text in block
            s.textBlock.each(function () {
                // only perform click on the p
                s.textBlock.find('p').on('click', function () { // having trouble receiving tap // https://developers.google.com/mobile/articles/fast_buttons
                    // e.preventDefault(); // don't select text
                    // remove other instances of 'active' class
                    var self = $(this).parent();
                    $('[class^="text-block"]').removeClass('active');
                    // self.selectText().end().addClass('active');
                    self.addClass('active');
                });
            });
        },

        updateProperties: function () {
            s.dataProperty.on('change', function () {
                $(this).each(function () {
                    var self = $(this);
                    var text = self.closest('code').prev(); // returns our <p> we want to style
                    var propertyName = self.data('property'); // e.g font-family

                    text.css(propertyName, self.val());
                });
            });
            // trigger this on load so we get the editable block reflecting whatever values I begin with in the html
            s.dataProperty.trigger("change");
        },

        incrementValues: function () {
            $('[data-increment]').on(s.clickEvent, function (e) {
                e.preventDefault();
                var self = $(this);
                var inc = self.data('increment'); // amount to increment
                // get the input these buttons relate to
                var input = self.prevAll('input').first();
                var currentVal = input.val();
                var newVal = (parseFloat(currentVal) + parseFloat(inc)); // the '+' indicates these are numbers, not strings to be concatenated: http://stackoverflow.com/questions/6552959/sum-of-two-input-value-by-jquery
                
                // if number has decimal places round to two decimal places
                if(newVal % 1 !== 0) {
                    newVal = parseFloat(newVal).toFixed(2);
                }
                input.val(newVal);
                // update the text element to reflect these changes
                input.trigger("change");
            });
        },

        addTextBlock: function () {
            var elementID = 1;
            var textSampleNum = textSamples.length;
            var index = 0; // for going through textSamples array

            s.addButton.on('click', function (e) { // ghost clicks. see google link above
                e.preventDefault();
                var otherElements = $('[class^="text-block"]');
                var lastElement = otherElements.filter(':last');
                // clone the previous text block to carry on with the same styles
                var newElement = lastElement.clone(true).insertBefore(s.addButton).attr("class","text-block-" + elementID);

                // we need to copy the selected options from the cloned element as jQuery clone() doesn't copy these across
                newElement.find('select').each(function (i) {
                    var selectMenus = lastElement.find('select');
                    $('option', this)[selectMenus[i].selectedIndex].selected = true;
                    // var value = $(this).val();
                });


                // insert new paragraph text
                // if (index >= textSampleNum) { index = 0; }
                newElement.find("[contenteditable='true']").text(textSamples[index]);
                newElement.trigger( s.clickEvent ).css({'display': 'block'}); // adds 'active' class (and shows new text element's related settings box)
                // newElement.find('.additional').hide();

                // open the clone's first 'Main Properties' tab (and close others)
                newElement.find('.show-additional').not(':first').removeClass('open').next('.additional').removeClass('show');
                newElement.find('.show-additional').first().addClass('open').next('.additional').addClass('show');
                // add / remove relevant 'active' classes
                otherElements.removeClass('active');
                newElement.addClass('active');

                // and if this is the first text block we've added we probably want it to default to a more sensible paragraph size
                if (elementID === 1) {
                    var self = newElement.find("[data-property='font-size']").val(16);
                    // update text block to reflect this
                    self.trigger("change");
                }

                // scroll the page to new settings palette
                /* FIXME */
                // $('html, body').animate({
                //     scrollTop: ($(document).height())
                // }, 500);
                // imperfect, but effective
                $('body').animate({
                    scrollTop: ($(document).height())
                }, {
                    duration: 500,
                    complete: function () {
                        $('body').animate({
                            scrollTop: ($(window).innerHeight().offset.top - 500)
                        }, {
                            duration: 500,
                            complete: function () {
                            }
                        });
                    }
                });

                // newElement.find('code').on("transitionend webkitTransitionEnd", function (event){
                //     var i = 0;
                //     if (event.originalEvent.propertyName == 'max-height') {

                //         console.log('now');
                //         $('html, body').animate({
                //             scrollTop: (newElement.offset().top)
                //         }, 600);
                //     }                    
                // });
                // var optionsVisible = (newElement.find('.open').height()) + (newElement.find('.show').height()); // height of first section on settings palette
                // $('html, body').animate({scrollTop: ($(document).height() - 976) }, 600);

                // newElement.find('code').on("transitionend webkitTransitionEnd", function (event){
                //     if (event.originalEvent.propertyName == 'max-height') {
                //         alert('now');
                //     }
                //     var optionsLoc = newElement.find(".scroll-to").offset().top;
                //     var diff = ($(document).height() - optionsLoc);
                //     console.log("diff: " + diff + "\nopsLoc - winHeight: " + (optionsLoc - $(window).innerHeight()) + "\ndocHight: " + $(document).height() + "\nwinHight: " + $(window).innerHeight() + "\nopsLoc: " + optionsLoc + "\nopsLoc - diff: " + (optionsLoc - diff) + "\nopsLoc: " + diff);
                //     console.log(($(document).height() - ($(window).innerHeight()) + diff));
                //     $('html, body').animate({
                //         scrollTop: ($(document).height() - ($(window).innerHeight() + diff))
                //     }, 600);
                    
                // });

                // update counters
                // index++;
                (index >= textSampleNum - 1) ? index = 0 : index++;
                elementID++;
            });
        },

        removeTextBlock: function () {
            s.removeButton.on('click', function (e) { // ghost clicks. see google link above
                e.preventDefault();
                $(this).closest('[class^="text-block"]').hide();
            });
        },

        hideSettings: function () {
            s.closeButton.on(s.clickEvent, function (e) {
                $('[class^="text-block"]').removeClass("active");
                e.preventDefault();
            });
        },

        showHideAdditional: function () {
            s.additionalLink.on('click', function (e) { // ghost clicks. see google link above
                e.preventDefault();
                $(this).each(function () {
                    var self = $(this);
                    // var others = $('.show-additional').not(self);
                    var others = self.siblings('.show-additional');
                    // add appropriate class instance
                    if (self.hasClass('open')) {
                        self.removeClass('open').next('.additional').removeClass('show');
                    } else {
                        // close others
                        others.removeClass('open').next('.additional').removeClass('show');
                        // reveal selected
                        self.addClass('open').next('.additional').addClass('show');
                    }
                });
            });
        },

        inputSelect: function () { // selects contents of an input upon receiving focus
            $('input').on("focus", function () {
                $(this).get(0).selectionStart=0;
                $(this).get(0).selectionEnd=999;
            });
        },

    };

    $(function () {
        Typesetter.init();
    });



    /* 
     * the following are tools for populating, ordering and compiling
     * my allFont list array whenever i need to add new fonts
     */
    /*********************
     * MERGE TWO ARRAYS
     * use this to add new fonts to our allFonts array
     * (if we have too many to do it by hand)
     */
    // function merge(left, right){
    //     var result  = [],
    //         il      = 0,
    //         ir      = 0;
    //     while (il < left.length && ir < right.length){
    //         if (left[il] < right[ir]){
    //             result.push(left[il++]);
    //         } else {
    //             result.push(right[ir++]);
    //         }
    //     }
    //     return result.concat(left.slice(il)).concat(right.slice(ir));
    // }
    // var myMerge = merge(newFonts, allFonts).join('",' + '<br>"');
    // $('#array').html(myMerge); // whack an element in the html to print the new array to
    /********************* 
     * ALPHABETACISE ARRAY
     */
    // var sortedArray = allFonts.sort().join('",' + '<br>"');
    // $('#array').html(sortedArray);
    /*********************
     * REMOVE ARRAY DUPLICATES
     * answer #2 here: http://stackoverflow.com/questions/1960473/unique-values-in-an-array
     */
    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }
    // var uniqueItems = allFonts.filter( onlyUnique ).join('",' + '<br>"'); // returns ['a', 1, 2, '1']
    // $('#array').html(uniqueItems);


});
