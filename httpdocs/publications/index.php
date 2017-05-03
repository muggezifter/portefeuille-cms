<?php
namespace Rietveld;

require_once('../../vendor/autoload.php');
$page = new Page('../../templates','../../cache');

$items = array(array(
            'link'=>'/publications/smart/',
            'image'=>'/images/publications/smart-c.png',
            'legend'=>'smart papers'
        ),array(
            'link'=>'/publications/timboektoe/',
            'image'=>'/images/publications/timboektoe-c.png',
            'legend'=>'timboektoe p/a het wilde weten'
        ),array(
            'link'=>'/publications/cbk//',
            'image'=>'/images/publications/cbk-c.png',
            'legend'=>'cbk publication'
        ));

$page->render(
    'category',
    array(
        'section' =>'publications',
        'items' => $items,
    )
);