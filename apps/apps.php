<script id='carousel-tmpl' type='text/template'>
{{#apps}}<li class='distribute'>
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
        <p><b>Designer / developer</b><br>
          Produced at <a href="{{productionUrl}}">{{production}}</a>
          {{#partner}}<br>{{partnerRole}} by <a href="{{partnerUrl}}">{{partner}}</a>{{/partner}}
        </p>
        {{#awards}}<p><i>{{{awards}}}</i></p>{{/awards}}
        {{{blurb}}}
      </div>
    </div>
  </li>{{/apps}}
</script>

<script id='carousel-thumbnails-tmpl' type='text/template'>
{{#apps}}
  <li class="CarouselNav-item">
    <a href="" onclick='return false;'>
      <h5><span>{{{title}}}</span></h5>
      <img src="images/portfolio/thumb-{{image}}" alt="screenshot of {{site}} website">
    </a>
  </li>
{{/apps}}
</script>

<div class="grid">
  <div class="grid__item  skinny-right-tablet">
    <ul class="Carousel"></ul><!-- /Carousel -->
  </div><!-- /grid__item
--><div class="grid__item  skinny-right-tablet">
    <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
    <ul class='CarouselNav'></ul><!-- /distribute & CarouselNav -->
  </div><!-- /grid__item -->
</div><!-- /grid -->
