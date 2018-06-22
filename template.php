<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Analog</title>
    <meta name="description" content="Analog. Freelance front end web development. Wellington, New Zealand.">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="manifest" href="manifest.json">
    <base href="<?php echo $baseHref ?>">
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="images/touch-icons/AppIcon76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/touch-icons/AppIcon60x60@2x.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/touch-icons/AppIcon76x76@2x.png">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-2.1.0.js"></script>
    <script src="js/mustache.js"></script>
    <script src="js/imagesloaded.pkgd.js"></script>
  </head>
  <body>
    <div class='Container'>
      <div class="Grid">
         <div class="Grid-md-skinnyLeft u-sm-width1of2 u-md-width1of2">
           <ul class='Nav'>
              <li><a href="projects/" class="<?php echo ($content == 'projects.php') ? 'active' : ''?>"><span>Projects</span></a>
              <li><a href="cv/" class="<?php echo ($content == 'cv.php') ? 'active' : ''?>">CV</a>
            </ul>
         </div>
         <div class="Grid-md-skinnyRight u-sm-pl-0 u-sm-width1of2 u-md-width1of2">
          <a class="Logo" href="">
            <span class="Logo-ana">ana</span>
            <span class="Logo-log">log</span>
            <!-- <img src="images/analog.png" alt="Analog logo"> -->
          </a>
        </div>
        <?php if (isset($photoClass)) { ?><div class="Grid-md-skinnyLeft Grid-md-skinnyRight">
          <div><!-- must nest for skinny- type margins -->
            <div class="Hero">
              <div class="Hero-image  <?= $photoClass ?>"></div>
              <span class='Hero-credit'>
                <span><i><?= $photoCredit[1] ?></i>. <?= $photoCredit[0] ?> © <?= $photoCredit[2] ?></span>
              </span>
            </div>
          </div>
        </div>
      <?php } ?>
      </div>
      <?php require_once ($content); ?>
      <div class="Footer-wrapper">
        <div class="Footer">
          <ul class='Footer-list'>
            <li class='hide_mobile'>Say g’day
            <li><a href="mailto:reg@analog.co.nz">reg@analog.co.nz</a>
            <li><a href="tel:04-022-568-8907">022.568.8907</a>
          </ul>
          <p class="Footer-copyright">
            <small>Richard Sime © 2018</small>
          </p>
        </div>
      </div>
    </div><!-- /content -->
    <script src="js/common.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-50448076-1', 'analog.co.nz');
      ga('send', 'pageview');
    </script>
  </body>
</html>
