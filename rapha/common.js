/*global Raphael, $*/

/*
 * Rapha
 * Created by Richard Sime
 * June 2014
 */

$(document).ready(function () {

    // fast click (tap) for iOS: https://github.com/ftlabs/fastclick
    // FastClick.attach(document.body); // interferes with gRaphael's popups

    var viewportWidth = 320,
        viewportHeight = $(window).height(),
        page1 = document.getElementById("holder1"),
        page2 = document.getElementById("holder2");

    var p1 = Raphael(page1, 0, 0, viewportWidth, viewportHeight),
        p2 = Raphael(page2, 0, 0, viewportWidth, viewportHeight);

    var pieText = $('.percent'),
        countryText = $('.country'),
        percentageText = $('.value');

    var fin = function () {
            this.flag = p1.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
            this.bar.node.setAttribute("fill","#fff");
        },
        fout = function () {
            this.flag.remove();
            this.bar.node.setAttribute("class","");
            this.bar.node.setAttribute("fill","#518086");
        },
        fin2 = function () {
            this.sector.node.setAttribute("fill","#f03f35");
            // update relevant text
            var segment = this.sector.value.order; // returns index pos of sector
            updateText(segment);
            pieText.show();
        },
        fout2 = function () {
            this.sector.node.setAttribute("fill","#fff");
            pieText.hide();
        },
        txtattr = { "font": "14px DINCondensed-Bold", "fill": "#275c6c" };

    var percArr = [];
    var locArr = [];

    /*-------------------------
     * JSON data
     ------------------------*/
    $.getJSON('data.json', function(data) {
        // number of sessions
        var sessLen = data.sessions.length;
        var valueArr = [];
        var dateArr = [];
        for (var i = 0; i < sessLen; i++) {
            valueArr.push(data.sessions[i].num);
            dateArr.push(data.sessions[i].date);
        }
        initBars(valueArr);

        // visitor locales
        var locLen = data.locale.length;
        var numArr = [];
        for (var j = 0; j < locLen; j++) {
            numArr.push(data.locale[j].visitors);
            percArr.push(data.locale[j].percentage);
            locArr.push(data.locale[j].country);
        }
        initPies(numArr, percArr);
    });

    function updateText(index) {
        countryText.html(locArr[index]);
        percentageText.html(percArr[index]);
    }

    function initBars(array) {
        p1.barchart(20, 40, 280, 280, array, {"gutter": "8"}).attr({"fill": "#518086"}).hover(fin, fout); // 210026 80c9e6 79bdd8
        p1.text(156, 316, "June 1-16, 2014").attr(txtattr);
    }

    function initPies() {
        p2.piechart(viewportWidth/2, 190, 140, [41, 10, 5, 2, 2, 1, 1, 1] ).attr({"fill": "#fff", "stroke": "#b7e3e4"}).hover(fin2, fout2);
        // hole in our pie... i mean donut
        p2.circle(viewportWidth/2, 190, 78).attr({"fill": "#b7e3e4", "stroke": "none"});
        $('#holder2').hide();
    }

    // toggle between charts
    $('a').on('click', function(e) {
        var toShow = $(this).data('show');
        $('li').removeClass('current');
        $(this).parent().addClass('current');
        if(toShow === "chart1") {
            $(page2).hide();
            $(page1).show();
        } else {
            $(page2).show();
            $(page1).hide();
        }
        e.preventDefault();
    });

});
