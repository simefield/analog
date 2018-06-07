<script id='carousel-tmpl' type='text/template'>
{{#websites}}<li class='distribute'>
         <div class="one-whole  p-r-md-tablet">
            <h1 class="m-t-0">{{{title}}}
            {{#site}}<br><span>{{#siteUrl}}<a href="{{siteUrl}}">{{/siteUrl}}{{{site}}}{{#siteUrl}}</a>{{/siteUrl}}</span>{{/site}}
            </h1>
        </div>
        <div class="mobile-one-whole  tablet-three-fifths  m-t-md-mobile  m-t-lg-tablet  float--right">
            <img src="images/portfolio/{{image}}" width='100%' alt="screenshot of {{site}} website">
        </div>
        <div class="mobile-one-whole  tablet-two-fifths  p-r-md-tablet  m-t-md-mobile  m-t-lg-tablet">
            <div class='copy'>
                <p><b>Lead front-end</b><br>
                Produced at <a href="{{productionUrl}}">{{production}}</a>
                    {{#partner}}<br>{{partnerRole}} by <a href="{{partnerUrl}}">{{partner}}</a>{{/partner}}
                </p>
                {{#awards}}<p><i>{{{awards}}}</i></p>{{/awards}}

                {{{blurb}}}
            </div>
        </div>
    </li>{{/websites}}
</script>
<?php /*
    <dl>
        <dt></dt><dd>{{#siteUrl}}<a href="{{siteUrl}}">{{/siteUrl}}{{site}}{{#siteUrl}}</a>{{/siteUrl}}</dd>
        <dt></dt><dd>Lead front-end</dd>
        <dt>Produced at </dt><dd><a href="{{productionUrl}}">{{production}}</a></dd>
        {{#partner}}<dt>{{partnerRole}} by </dt><dd><a href="{{partnerUrl}}">{{partner}}</a></dd>{{/partner}}
    </dl>
*/ ?>

<script id='carousel-thumbnails-tmpl' type='text/template'>
{{#websites}}
    <li class="mobile-one-half  tablet-one-fifth">
        <a href="" onclick='return false;'>
            <h5><span>{{{title}}}</span></h5>
            <img src="images/portfolio/thumb-{{image}}" alt="screenshot of {{site}} website">
        </a>
    </li>
{{/websites}}
</script>

<div class="grid">
    <div class="grid__item  skinny-right-tablet">
        <ul class="carousel__items"></ul><!-- /carousel__items -->
    </div><!-- /grid__item
 --><div class="grid__item  skinny-right-tablet">
        <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
        <ul class='distribute  carousel__thumbnails  m-t-xx-tablet'></ul><!-- /distribute & carousel__thumbnails -->
    </div><!-- /grid__item -->
</div><!-- /grid -->


<?php /*

                    // <dt>Design: </dt><dd><a href="{{productionUrl}}">{{production}}</a></dd>
                    // <dt>Back-end: </dt><dd><a href="{{backendUrl}}">{{backend}}</a></dd>
    {{title}}
    {{site}}
    {{siteUrl}}
    {{image}}
    {{production}}
    {{productionUrl}}
    {{backend}}
    {{backendUrl}}
    {{awards}}
    {{{blurb}}}

    OTHER SITES
    -----------
    Yep:
    realme
    NZ2011, REAL New Zealand Festival
    chamber music - archived version
    kiwibank kiwithinking.co.nz - http://web.archive.org/web/20100525223615/http://www.kiwibank.co.nz/kiwithinking/
    kiwibank jobs - https://web.archive.org/web/20100524232133/https://workforus.kiwibank.co.nz/
    eco-mushrooms
    -----------
    Nope:
    kiwibank intranet: http://web.archive.org/web/20130208051823/http://clairesymons.co.nz/?portfolio=kiwibank-ourspace-intranet
    loaded for travel?
    loaded for christmas
    quickcrew
    Lifetimes
    property IQ
    Tobacco toolkit

 */ ?>

<?php /*
<div class="grid">
    <div class="grid__item  skinny-right-tablet">
        <ul class="carousel__items">
            <li class='distribute  current'>
                 <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
                 <div class="one-whole  p-r-md-tablet">
                    <h1>Gibson Sheat</h1>
                </div>
                <div class="mobile-one-whole  tablet-three-fifths  m-t-lg  float--right">
                    <img src="images/pf-gibson-sheat.jpg" width='100%' alt="">
                </div>
                <div class="mobile-one-whole  tablet-two-fifths  p-r-md-tablet  m-t-lg">
                    <div class='copy'>
                        <dl>
                            <dt>URL: </dt><dd><a href="">gibsonsheat.com</a></dd>
                            <dt>Design: </dt><dd><a href="">Creature</a></dd>
                            <dt>Back-end: </dt><dd><a href="">Springload</a></dd>
                            <dt>Awards: </dt><dd>Best, bronze</dd>
                        </dl>
                        <p>Gibson Sheat on life for deaf New Zealanders, deaf culture and New Zealand Sign Language to help strengthen the rights of Deaf people and give them the confidence to be an active part of society.</p>
                        <p>Once a year the website switches themes to put on an entirely new look for New Zealand Sign Language week.</p>
                    </div><!-- /copy -->
                </div>
            </li><!-- /distribute
            --><li class='distribute'>
                 <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
                 <div class="one-whole  p-r-md-tablet">
                    <h1>Showtools</h1>
                </div>
                <div class="mobile-one-whole  tablet-three-fifths  m-t-lg  float--right">
                    <img src="images/pf-showtools.png" width='100%' alt="">
                </div>
                 <div class="mobile-one-whole  tablet-two-fifths  p-r-md-tablet  m-t-lg">
                    <div class='copy'>
                        <dl>
                            <dt>URL: </dt><dd><a href="">Showtools.com</a></dd>
                            <dt>Design: </dt><dd><a href="">Creature</a></dd>
                            <dt>Back-end: </dt><dd><a href="">Springload</a></dd>
                            <dt>Awards: </dt><dd>Best, bronze</dd>
                        </dl>
                        <p>Showtools on life for deaf New Zealanders, deaf culture and New Zealand Sign Language to help strengthen the rights of Deaf people and give them the confidence to be an active part of society.</p>
                        <p>Once a year the website switches themes to put on an entirely new look for New Zealand Sign Language week.</p>
                    </div><!-- /copy -->
                </div>
            </li><!-- /distribute
            --><li class='distribute'>
                 <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
                 <div class="one-whole  p-r-md-tablet">
                    <h1>Deaf Association</h1>
                </div>
                <div class="mobile-one-whole  tablet-three-fifths  m-t-lg  float--right">
                    <img src="images/pf-deaf.jpg" width='100%' alt="">
                </div>
                 <div class="mobile-one-whole  tablet-two-fifths  p-r-md-tablet  m-t-lg">
                    <div class='copy'>
                        <dl>
                            <dt>URL: </dt><dd><a href="">deaf.com</a></dd>
                            <dt>Design: </dt><dd><a href="">Creature</a></dd>
                            <dt>Back-end: </dt><dd><a href="">Springload</a></dd>
                            <dt>Awards: </dt><dd>Best, bronze</dd>
                        </dl>
                        <p>Deaf Aotearoa provides information and resources on life for deaf New Zealanders, deaf culture and New Zealand Sign Language to help strengthen the rights of Deaf people and give them the confidence to be an active part of society.</p>
                        <p>Once a year the website switches themes to put on an entirely new look for New Zealand Sign Language week.</p>
                        </div><!-- /copy -->
                </div>
            </li><!-- /distribute -->
        </ul><!-- /carousel__items -->
    </div><!-- /grid__item
 --><div class="grid__item  skinny-right-tablet">
       <ul class='distribute  carousel__thumbnails'>
            <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <h5>Gibson Sheat</h5>
                    <img src="images/pf-gibson-sheat.jpg" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <h5>Showtools</h5>
                    <img src="images/pf-showtools.png" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <h5>Deaf Association</h5>
                    <img src="images/pf-deaf.jpg" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <p class='greybox'>One fifth</p>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <p class='greybox'>One fifth</p>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <img src="images/pf-gibson-sheat.jpg" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <img src="images/pf-showtools.png" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth">
                <a href="">
                    <img src="images/pf-deaf.jpg" alt="">
                </a>
            </li>
            <li class="mobile-one-half  tablet-one-fifth"></li>
            <li class="mobile-one-half  tablet-one-fifth"></li>
        </ul><!-- /distribute -->
    </div><!-- /grid__item -->
</div><!-- /grid -->

*/ ?>
