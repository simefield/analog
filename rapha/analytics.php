<?php

echo '<h1>Sessions</h1><br />';

$ga = new gapi('richard.sime@gmail.com','s1mef1eld');

$ga->requestReportData(145141242,array('browser','browserVersion'),array('pageviews','visits'));

foreach($ga->getResults() as $result)
{
  echo '<strong>'.$result.'</strong><br />';
  echo 'Pageviews: ' . $result->getPageviews() . ' ';
  echo 'Visits: ' . $result->getVisits() . '<br />';
}

echo '<p>Total pageviews: ' . $ga->getPageviews() . ' total visits: ' . $ga->getVisits() . '</p>';
