<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
        <p>The rules are simple: I put the self-timer on 2 seconds, push the button and try to get as far from the
            camera as I can</p>

        <p>This is an ongoing project. New photos are regularly published at <a
                href="https://runningfromcamera.blogspot.nl/">runningfromcamera.blogspot.nl</a>

        <p>
TXT;

$menu = [
    ['label'=>'work','slug'=>'work','active'=>true],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>false],
];


echo $page->render(
    'item',
    array (
        'menu' => $menu,
        'title' => 'running from camera',
        'details' => 'photo series, 2006-ongoing',
        'previous' => 'planet-crooswijk',
        'next' => 'from-here-to-tokyo',
        'bottombanner_type' => 'vimeo',
        'bottombanner_blackbox' => false,
        'bottombanner_vimeo_id' => 209893433,
        'textcol' => $text,
    )
);