<script id='carousel-tmpl' type='text/template'>
{{#websites}}
  <!-- Control which projects to include from data.json -->
  {{#hide}}
  {{/hide}}
  {{^hide}}<li class='distribute'>
     <div class="u-width1of1 p-r-md-tablet">
      <h1 class="m-t-0">{{{title}}}
        {{#site}}<br><span>{{#siteUrl}}<a href="{{siteUrl}}">{{/siteUrl}}{{{site}}}{{#siteUrl}}</a>{{/siteUrl}}{{#siteNote}}<em> <small>[{{siteNote}}]</small></em>{{/siteNote}}</span>{{/site}}
      </h1>
    </div>
    <div class="u-sm-width1of1 u-md-width3of5 m-t-md-mobile  m-t-lg-tablet  float--right">
      <img src="images/portfolio/{{image}}" width='100%' alt="screenshot of {{site}} website">
    </div>
    <div class="u-sm-width1of1 u-md-width2of5 p-r-md-tablet  m-t-md-mobile  m-t-lg-tablet">
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

<script id='carousel-thumbnails-tmpl' type='text/template'>
{{#websites}}
  <!-- Control which projects to include from data.json -->
  {{#hide}}
  {{/hide}}
  {{^hide}}
    <li class="CarouselNav-item">
      <a href="" onclick='return false;'>
        <h5><span>{{{title}}}</span></h5>
        <img src="images/portfolio/thumb-{{image}}" alt="screenshot of {{site}} website">
      </a>
    </li>
  {{/hide}}
{{/websites}}
</script>

<div class="Grid Grid--withGutter">
  <div class="Grid__item  skinny-right-tablet">
    <ul class="Carousel"></ul><!-- /Carousel -->
  </div><!-- /Grid__item
--><div class="Grid__item  skinny-right-tablet">
    <!-- distribute Grid items must have white-space between them, and a mobile width declaration -->
    <ul class='CarouselNav'></ul><!-- /distribute & CarouselNav -->
  </div><!-- /Grid__item -->
</div><!-- /Grid -->

<?php /*
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
