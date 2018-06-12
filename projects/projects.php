<script id='carousel-tmpl' type='text/template'>
{{#websites}}
  <!-- https://stackoverflow.com/a/6479017 -->
  <!-- Control which projects to include from data.json -->
  {{#hide}}
  {{/hide}}
  {{^hide}}<li class='distribute'>
         <div class="one-whole  p-r-md-tablet">
            <h1 class="m-t-0">{{{title}}}
            {{#site}}<br><span>{{#siteUrl}}<a href="{{siteUrl}}">{{/siteUrl}}{{{site}}}{{#siteUrl}}</a>{{/siteUrl}}{{#siteNote}}<em> <small>[{{siteNote}}]</small></em>{{/siteNote}}</span>{{/site}}
            </h1>
        </div>
        <div class="mobile-one-whole  tablet-three-fifths  m-t-md-mobile  m-t-lg-tablet  float--right">
            <img src="images/portfolio/{{image}}" width='100%' alt="screenshot of {{site}} website">
        </div>
        <div class="mobile-one-whole  tablet-two-fifths  p-r-md-tablet  m-t-md-mobile  m-t-lg-tablet">
            <div class='copy'>
                <p>
                  <!-- <b>{{#role}}{{role}}{{/role}}{{^role}}Lead front-end{{/role}}</b><br> -->
                Produced at <a href="{{productionUrl}}">{{production}}</a>
                    {{#partner}}<br>{{partnerRole}} by <a href="{{partnerUrl}}">{{partner}}</a>{{/partner}}
                </p>
                {{#awards}}<p><b>{{{awards}}}</b></p>{{/awards}}

                {{{blurb}}}
            </div>
        </div>
    </li>{{/hide}}{{/websites}}
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
  <!-- https://stackoverflow.com/a/6479017 -->
  <!-- Control which projects to include from data.json -->
  {{#hide}}
  {{/hide}}
  {{^hide}}
    <li class="mobile-one-third tablet-one-fifth desktop-one-sixth">
        <a href="" onclick='return false;'>
            <h5><span>{{{title}}}</span></h5>
            <img src="images/portfolio/thumb-{{image}}" alt="screenshot of {{site}} website">
        </a>
    </li>
  {{/hide}}
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
