<script id='carousel-tmpl' type='text/template'>
{{#apps}}<li class='distribute'>
     <div class="u-width1of1 u-md-pr-md">
      <h1 class="m-t-0">{{{title}}}
        {{#site}}<br><span>{{#siteUrl}}<a href="{{siteUrl}}">{{/siteUrl}}{{{site}}}{{#siteUrl}}</a>{{/siteUrl}}</span>{{/site}}
      </h1>
    </div>
    <div class="u-sm-width1of1 u-md-width3of5 u-sm-mt-md u-md-mt-lg u-floatRight">
      <img src="images/portfolio/{{image}}" width='100%' alt="screenshot of {{site}} website">
    </div>
    <div class="u-sm-width1of1 u-md-width2of5 u-sm-mt-md u-md-mt-lg u-md-pr-md">
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
    <a class="CarouselNav-link" href="" onclick='return false;'>
      <h5 class="CarouselNav-text"><span>{{{title}}}</span></h5>
      <img class="CarouselNav-image" src="images/portfolio/thumb-{{image}}" alt="screenshot of {{site}} website">
    </a>
  </li>
{{/apps}}
</script>

<div class="Grid">
  <div class="Grid-md-skinnyRight">
    <ul class="Carousel"></ul>
  </div>
  <div class="Grid-md-skinnyRight">
    <!-- distribute grid items must have white-space between them, and a mobile width declaration -->
    <ul class='CarouselNav'></ul><!-- /distribute & CarouselNav -->
  </div>
</div>
