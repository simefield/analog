<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Analog</title>
        <meta name="description" content="Analog. Freelance front end web development. Wellington, New Zealand.">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
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
        <div class='content'>
            <div class="grid">
               <div class="grid__item  mobile-two-thirds  tablet-one-half  skinny-left-tablet">
                   <ul class='nav  main-nav'>
                        <?php /*
                        <!--
                        <li><a href="articles/">Articles</a> -->
                        <li><a href="apps/">Apps</a>
                        <li><a href="http://www.richardsime.com/">Portfolio</a>
                        <li><a href="cv/" class="<?php echo ($content == 'cv.php') ? 'active' : ''?>">CV</a>
                        */ ?>
                        <li><a href="projects/" class="<?php echo ($content == 'projects.php') ? 'active' : ''?>">Projects</a>
                        <li><a href="apps/" class="<?php echo ($content == 'apps.php') ? 'active' : ''?>">Apps</a>
                    </ul>
               </div><!-- /grid__item
            --><div class="grid__item  p-l-0-mobile  mobile-one-third  tablet-one-half  skinny-right-tablet">
                   <ul class='nav  nav--stacked  contact'>
                        <li class='hide_mobile'>Say g’day
                        <li><a href="mailto:reg@analog.co.nz">reg@analog.co.nz</a>
                        <li><a href="tel:+64-04-022-568-8907">022.568.8907</a>
                    </ul>
               </div><!-- /grid__item
            --><div class="grid__item  skinny-left-tablet  skinny-right-tablet text--right">
                    <a class="logo" href=""><img src="images/analog.png" alt="Analog logo"></a>
               </div><!-- /grid__item
            --><?php if (isset($photoClass)) { ?><div class="grid__item  skinny-left-tablet  skinny-right-tablet">
                    <div><!-- must nest for skinny- type margins -->
                        <div class="hero">
                            <div class="hero__image  <?= $photoClass ?>"></div>
                            <span class='photo-credit'><i><?= $photoCredit[1] ?></i> by <?= $photoCredit[0] ?>, <?= $photoCredit[2] ?></span>
                        </div>
                    </div>
                </div><?php } ?><!-- /grid__item -->

            </div><!-- /grid -->

            <?php
                require_once ($content);
            ?>

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
