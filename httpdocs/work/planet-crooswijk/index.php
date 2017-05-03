<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
        <p>This project took place during the event <b>Duende Dicht</b> in Duende, Rotterdam.</p>

        <p>I had printed out all of the tiles of the <a href="https://www.openstreetmap.org" target="_new">Open Street
            Map</a> map of Crooswijk, the neighborhood around Duende. All visitors were invited to take one of the tiles
            and use the available tools and materials (lighttable, papers, drawing materials, magazines, glue) to make
            their own version of that tile. These hand-produced tiles were then scanned and inserted in a version of the
            map that was available at <a href="http://crooswijk.mapping-my-mind.org/" target="_new">crooswijk.mapping-my-mind.org</a>
            and can also be seen here: (you can drag the map around to see more of it)</p>

TXT;

$top =<<<TOP
    <div class="pure-u-1 pure-u-md-4-5">
        <img class="pure-img" src="/images/planet-crooswijk/studioview.jpg"/>
    </div>
TOP;

$map =<<<MAP
    <div id="planet-crooswijk-map"></div>
    <script type="text/javascript" src="/js/planet-crooswijk.js"></script>
MAP;

$headitems=<<<HEAD
    <link rel="stylesheet" href="/css/planet-crooswijk.css">

    <script src="http://openlayers.org/api/OpenLayers.js"></script>
HEAD;

$page->render(
    'item',
    array (
        'section' => 'work',
        'title' => 'planet crooswijk',
        'details' => 'web-based work, 2012',
        'previous' => 'epicycles',
        'next' => 'running-from-camera',
        'topbanner_type' => 'raw',
        'topbanner_custom_html' => $top,
        'bottombanner_type' => 'raw',
        'bottombanner_custom_html' => $map,
        'textcol' => $text,
        'head_items' => $headitems
    )
);