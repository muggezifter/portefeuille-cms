<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
        <p>The material for this video from 2015 is four photo sequences I made a quarter of a century earlier.</p>

        <p>The sequence with the Mondrian painting was originally shown in a <a href="https://en.wikipedia.org/wiki/Praxinoscope">praxinoscope</a>.</p>

        <p> The sequence with the white shape in space was made for a <a href="/publications/cbk">booklet</a>   that was published by CBK Rotterdam on occasion of my exhibition in 1989.</p>

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
        'title' => 'epicycles',
        'details' => 'video, 20 minutes, 1986 1987 1989 1990 2015',
        'previous' => 'khl4',
        'next' => 'planet-crooswijk',
        'topbanner_type' => 'vimeo',
        'topbanner_blackbox' => false,
        'topbanner_vimeo_id' => 209541431,
        'textcol' => $text,
    )
);