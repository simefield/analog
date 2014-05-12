/* Mastermind
 * Created by Joseph and Richard
 * December 2013 */

// another interesting touch library (tocca) here: http://www.gianlucaguarini.com/blog/detecting-the-tap-event-on-a-mobile-touch-device-using-javascript/

Zepto(function($){

    // only do this if not on a touch device
    if (!('ontouchend' in window)) {
        $(document).delegate('body', 'click', function(e) {
            $(e.target).trigger('tap');
        });
    }

    var s,
    Mastermind = {
        settings : {
            // ARRAYS
            secretArray: [],// array to hold random (secret) numbers
            // colourArray: ["c20202", "2b840b", "2950d0", "ff6000", "690caf", "da207e", "e7e7e7", "fde414"],
            // colourArray: ["298508", "298508", "fde414", "fde414", "d51981", "d51981", "7607b8", "7607b8"],
            // colourArray: ["c20202", "298508", "2655c9", "ff6000", "7607b8", "d51981", "e7e7e7", "fde414"],
            // colourArray: ["ca0003", "2b9a07", "2660d4", "fb6f02", "8b04c9", "df1397", "eeeeee", "fdea11"],
            // colourArray: ["eeeeee", "df1397", "2660d4", "fb6f02", "fdea11", "2b9a07", "8b04c9", "ca0003"],
            colourArray: ["2b9a07", "fdea11", "fb6f02", "ca0003", "df1397", "8b04c9", "2660d4", "eeeeee"],
            guessArray: [],
            marksArray: [0, 0, 0, 0], // holds our reds and whites
            matchedArray: [0, 0, 0, 0], // assigned a '1' to guess pegs that have a match (a red or a white assigned) so we don't check against them again
            // HTML ELEMENTS
            dropper: $(".eye-dropper"),
            palette: $('.palette'),
            secret: $('.secret'),
            guessBox: $('.guess-box').first(), // holds a guess row and result tab
            guess: $('.guess'), // <ul>
            button: $('button.submit'),
            results: $('.results'),
            messages: $('.messages'),
            touchCursor: $('.touch-cursor'),
            console: $('.console'),
            // PLACEHOLDER VARIABLE/S
            currentColour: '',
            behindDragged: '',
            // AUDIO
            // clickSound: new Audio("click.mp3"), // buffers automatically when created
            // SETTINGS
            level: 4, // number of counters. maybe we can increase difficulty by adding more some time?
            difficulty: 10, // max number of guesses allowed
            colours: 8,
            score: 1
        },
        init: function () {
            s = this.settings;
            this.showHideMessages();
            this.generateSecret();
            this.generatePalette();
            this.eyeDropper(); // covered in touchstart event but makes desktop version clickable too
            this.placePegs();
            this.checkWhites();
            this.dragPegs();
            this.swapPegs();
        },
        showHideMessages: function () {
            // use 'click' not 'tap' for these
            // About
            $('.heading a').on('click', function () {
                s.messages.addClass('open').find('.about').css('opacity', 1);
                return false;
            });
            // the Rules
            $('.heading span').on('click', function () {
                s.messages.addClass('open').find('.rules').css('opacity', 1);
                return false;
            });
            // Reveal the secret
            $('.revealSecret').on('click', function () {
                Mastermind.revealSecret();
                setTimeout(function () {
                    s.messages.addClass('open').find('.lost').css('opacity', 1);
                }, 300);
                s.secret.addClass('revealed');
                return false;
            });
            // Replay button
            $('.replay').on('click', function () {
                s.secret.removeClass('revealed');
                s.messages.removeClass('open').children('div').css('opacity', 0);
                Mastermind.resetGame();
                return false;
            });
            // Close message link
            $('.close').on('click', function () {
                s.messages.removeClass('open');
                // wait for animation to finish before resetting opacity on all messages
                setTimeout(function () {
                    s.messages.find('div').css('opacity', 0);
                }, 300);
                return false;
            });
        },
        generateSecret: function () {
            // generate four random numbers from 1 - 8
            for (var i = 0; i < s.level; i += 1) {
                s.secretArray.push(Math.floor(Math.random() * s.colours));
            }
            console.log("secretArray = " + s.secretArray);
        },
        revealSecret: function () {
            // colour the secret pegs
            for (var j = 0; j <= s.level; j += 1) {
                $('.secret li:nth-child(' + (j + 1) + ') span').css('background-color', s.colourArray[s.secretArray[j]]);
            }
        },
        generatePalette: function () {
            // randomise palette peg colour order to keep it variable and fresh
            // uncomment to randomise
            // s.colourArray.sort(function() {
            //     return 0.5 - Math.random();
            // });

            // colour-in the palette with array of colours
            var k = 0;
            for (k = 0; k < 8; k += 1) {
                s.palette.children(':nth-child(' + (k + 1) + ')').css('background-color', s.colourArray[k]);
            }
        },
        eyeDropper: function () {
            // get a sample colour from the palette
            s.palette.children('li').each(function () {
                $(this).on('tap', function () {
                    // update current colour to selected
                    s.currentColour = $(this).index();
                    // update eye-dropper
                    s.dropper.css('background-color', s.colourArray[s.currentColour]);
                });
            });
        },
        placePegs: function () {
            // colour the guess pegs
            s.guess.children('li').addClass('empty');
            s.guess.children('li').each(function () {
                $(this).on('tap', function () {
                    // only placeable if no message is showing
                    if (!s.messages.hasClass('open')) {
                        var placementPosition = $(this).index();
                        if (s.currentColour.length === undefined) { // check we have a colour selected, i.e. no placing blanks at the start of game. length becomes "undefined" once the eye dropper holds a colour
                            // console.log(s.currentColour.length);
                            $(this).removeClass('empty').find('span').css('background-color', s.colourArray[s.currentColour]);
                            // update our guess array with placed pegs
                            s.guessArray[placementPosition] = s.currentColour;
                        }
                        // check if it's time to reveal the button
                        Mastermind.showButton();
                    }
                });
            });
        },
        showButton: function () {
            // check if full number of guesses have been performed => if so show the button
            // show submit button if all guess spots filled
            var guessesRemaining = s.guess.children('li.empty').length,
                // random button text
                buttonQuotes = [
                    "I feel good about this!",
                    "Hit me!",
                    "I've got nothing to lose!",
                    "I'm clutching at straws here",
                    "If this ain't it, I'm quitting!",
                    "Giddyup!",
                    "Are you sure about that?",
                    "Oh yeah, this is definitely it.",
                    "It's in the bag!",
                    "I think I've got it!",
                    "Crosssing fingers won't help",
                    "Four whites!",
                    "Please, please, please…",
                    "Bletchley Park had it easy.",
                    "Anyone for noughts & crosses?"
                ];

            s.button.text(buttonQuotes[Math.floor(Math.random() * buttonQuotes.length)]);

            if (guessesRemaining === 0) {
                console.log(s.guessArray);
                s.button.show();
            }
        },
        checkWhites: function () {
            // perform check for correct colours in correct positions, i.e. "whites"
            s.button.on('click', function () {
                // compare guessArray to secret
                // check for correct colour matches, i.e. "white"
                var i = 0;
                for (i = 0; i < s.level; i += 1) {
                    // reset matchedArray
                    s.matchedArray[i] = 0;

                    if (s.secretArray[i] === s.guessArray[i]) {
                        s.marksArray[i] = "white";
                        // update matchedArray
                        s.matchedArray[i] = 1;
                    }
                }
                // that's the whites assigned, now check for reds
                Mastermind.checkReds();
            });
        },
        checkReds: function () {
            // perform check for correct colours in wrong positions, i.e. "reds"
            // "counter" keeps track of how many iterations we perform,
            // i.e. check secret 1 against guess 2, then against guess 3, ...
            function redCheck() {
                $.each(s.marksArray, function (index, value) {
                    // we look at 0 values in marksArray
                    if (value === 0) {
                        // get the next bean for checking if 0 (wrap last bean back to check first)
                        var next = (index + counter) % s.level; // returns 0, 1, 2, or 3 BUT not it's own index value
                        // console.log('index + next = ' + index + ' ' + next); console.log('next = ' + next); console.log("!! marksArray[index] = " + marksArray[index]); console.log("!! marksArray[next] = " + marksArray[next]); console.log("!! matchedArray[next] = " + matchedArray[next]);
                        // is the next value in marksArray a 0 and are we not checking against a guess peg that's already been matched?
                        if (s.marksArray[index] === 0 && s.matchedArray[next] === 0) {
                            // check if the colours match
                            Mastermind.updateReds(index, next);
                        }
                    }
                });
            }
            for (var counter = 1; counter < s.level; counter += 1) {
                // console.log('COUNTER = ' + counter);
                redCheck();
            }
            // console.log("marksArray = " + s.marksArray);
            // Finished a guess round!
            Mastermind.drawResults();
        },
        updateReds: function (index, next) {
            // apply red marks if applicable
            if (s.secretArray[index] === s.guessArray[next]) {
                s.marksArray[index] = 'red';
                s.matchedArray[next] = 1;
            }
            // console.log("secretArray = " + secretArray); console.log("guessArray = " + guessArray); console.log("secretArray[index] = " + secretArray[index]); console.log("guessArray[next] = " + guessArray[next]);
        },
        drawResults: function () {
            s.button.hide();
            // draw our results
            var i = 0;
            for (i = 0; i < s.level; i += 1) {
                s.results.children('li:nth-child(' + (i + 1) + ')').addClass(s.marksArray[i]);
            }
            // reveal the marks
            // these need to be dished up in a random order so as not to give anything away, i.e. first result mark relates to first guess colour, etc.
            // randomising is a tad finicky, but by simply rotating the results randomly hopefully no-one will be able to identify a pattern
            var rotation = Math.floor(Math.random() * 4 + 1); // random number: 1, 2, 3 or 4
            if (rotation === 1) {
                rotation = '0deg';
            } else if (rotation === 2) {
                rotation = '90deg';
            } else if (rotation === 3) {
                rotation = '180deg';
            } else {
                rotation = '270deg';
            }

            s.results.addClass('revealed').css({
                'transform': 'rotate(' + rotation + ')',
                '-webkit-transform': 'rotate(' + rotation + ')'
            });

            // check if we've won, i.e. four whites
            if ($.inArray(0, s.marksArray) === -1 && $.inArray('red', s.marksArray) === -1) {
                s.messages.addClass('open').find('.score').css('opacity', 1).find('span').html(s.score);
            } else {
                // s.score = s.score += 1;
                s.score += 1;
                // and start a new turn
                Mastermind.createNewRow();
            }
        },
        createNewRow: function () {
            // copy the full guess row down and create new empty row
            s.guessBox.clone(true).removeClass('active').insertAfter(s.guessBox);
            s.guessBox.find('.guess li').addClass('empty').find('span').css('background-color', '1f2124');
            // remove all classes in new result tab
            s.results.removeClass('revealed').children('li').removeClass();
            // reset our arrays ready for a new round of guesing and marking
            s.guessArray = [];
            s.marksArray = [0, 0, 0, 0];
            s.matchedArray = [0, 0, 0, 0];
        },
        resetGame: function () {
            // remove previous guess rows
            $('.guess-box:not(.active)').remove();
            // reset appearance
            s.results.removeClass('revealed').children('li').removeClass();
            s.secret.find('span').css('background-color', '#000000');
            s.guess.children('li').addClass('empty').find('span').css('background-color', 'transparent');
            // reset our arrays and variables ready for a new round of guesing and marking
            s.score = 1;
            s.secretArray = [];
            s.guessArray = [];
            s.marksArray = [0, 0, 0, 0];
            s.matchedArray = [0, 0, 0, 0];
            // reset our eye-dropper
            s.currentColour= '';
            s.dropper.css('background-color', 'transparent');
            // regenerate secret
            Mastermind.generateSecret();
            Mastermind.generatePalette();
        },
        dragPegs: function() {
            // first let's stop draggability on the rest of the header
            // prevent page scrolling under finger
            // there must be a shorthand way to write this
            s.secret.on('touchmove', function(event) {
                event.preventDefault();
            });
            s.palette.on('touchmove', function(event) {
                event.preventDefault();
            });
            s.guess.on('touchmove', function(event) {
                event.preventDefault();
            });

            // for each palette colour
            s.palette.children('li').each(function () {
                /*
                 * touchstart - prepare for dragging
                 */
                $(this).on('touchstart', function () {
                    // update current colour to selected
                    s.currentColour = $(this).index();
                    // update eye-dropper
                    s.dropper.css('background-color', s.colourArray[s.currentColour]);
                    s.touchCursor.addClass('dragging').find('span').css('background-color', s.colourArray[s.currentColour]);
                    // s.touchCursor.addClass('dragging');
                    /*
                     * touchmove
                     */
                    $(this).on('touchmove', function() {
                        // event.preventDefault(); 
                        Mastermind.startDrag();
                    }, false);
                    /*
                     * touchend
                     */
                    $(this).on('touchend', function() {
                        Mastermind.endDrag();
                    });
                });
            });
        },
        swapPegs: function() {
            // for each guess row colour
            s.guess.children('li').each(function () {


                /*
                 * touchstart - prepare for dragging
                 */
                $(this).on('touchstart', function () {
                    if (!$(this).hasClass('empty')) {
                        var self = $(this),
                            pegStartLoc = self.index();
                        /*
                         * touchmove
                         */
                        $(this).on('touchmove', function(event) {
                            // update current colour to selected
                            s.currentColour = s.guessArray[pegStartLoc];
                            s.touchCursor.addClass('dragging').find('span').css('background-color', s.colourArray[s.currentColour]);
                            // update eye-dropper once we've initiated move is in progress
                            s.dropper.css('background-color', s.colourArray[s.currentColour]);
                            // remove peg from its slot
                            $(this).addClass('empty').find('span').css('background-color', '');

                            Mastermind.startDrag();
                        }, false);
                        /*
                         * touchend
                         */
                        $(this).on('touchend', function() {
                            // delete removed peg's colour from guessArray
                            s.guessArray[pegStartLoc] = '';

                            // s.console.html("pegStartLoc = " + pegStartLoc + ', s.behindDragged.index() = ' + s.behindDragged.index());
                            // s.console.html('s.secretArray: ' + s.secretArray + ', s.guessArray = ' + s.guessArray);

                            Mastermind.endDrag();
                        });
                    } else {
                        // need to remove the event in order for touchstart to be delegated to a newly indexed collection of !$(this).hasClass('empty') elements
                        // (taking into account dynamically generated class names on elements, i.e. $(this).addClass('empty'))
                        $(this).off('touchmove');
                    }
                });
            });
        },
        startDrag: function() {
            // var touchX = event.pageX; // jQuery method
            // var touchY = event.pageY;
            var touch = event.touches[0], // native touch API
                touchX = touch.pageX, // relative to document top
                touchY = touch.pageY,
                clientX = touch.clientX, // relative to the viewport
                clientY = touch.clientY;

            var pegPlacePos;

            // move list item
            s.touchCursor.css({'left': touchX - 30, 'top': touchY - 38}); // offset peg from behind finger so we can see it as we drag

            // get the element behind our dragged peg
            s.behindDragged = $(document.elementFromPoint(clientX, clientY));
            // s.console.html('touchX: ' + touchX + ', touchY: ' + touchY);
            // test if we're over one of the holes to place our peg (<li> or it's <span>)
            

            if (s.behindDragged.is('div.active ul.guess li')) {
                // s.clickSound.play(); // too slow!
                pegPlacePos = s.behindDragged.offset();
                // place hover peg in position
                s.touchCursor.css({'left': pegPlacePos.left + 11, 'top': pegPlacePos.top + 11}); // 11px padding on <li>'s'
            } else if (s.behindDragged.is('div.active ul.guess span')) { // repetitive, but not sure how to not duplicate this as the elementFromPoint returns top element
                pegPlacePos = s.behindDragged.offset();
                // place hover peg in position
                s.touchCursor.css({'left': pegPlacePos.left, 'top': pegPlacePos.top});
                s.behindDragged = s.behindDragged.parents('li'); // set to parent for end drag peg placement later
                
            } else { // if we're outside peg hole area
                s.behindDragged = ''; // set to null value
            }
        },
        endDrag: function() {
            // hide the touch cursor (drag peg)
            s.touchCursor.removeClass('dragging').css('top', '-1000px');


            // if our dragged element is over a receivable slot (check using our null value possibly set in startDrag())
            if (s.behindDragged) {
                // update our guess array with placed pegs
                var placementPosition = s.behindDragged.index();
                s.guessArray[placementPosition] = s.currentColour;
                // place peg in hole. remove 'empty' class
                s.behindDragged.removeClass().find('span').css('background-color', s.colourArray[s.currentColour]);
                s.behindDragged = ''; // reset to null so we can't change a coloured placed peg by tapping new palette colour
            }

            // stop the item dragability
            $(this).off('touchmove');

            // check if it's time to reveal the button
            Mastermind.showButton();
        }
    };

    $(function () {
        Mastermind.init();
    });

});










