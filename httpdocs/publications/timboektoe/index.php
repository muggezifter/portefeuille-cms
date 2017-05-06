<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$menu = [
    ['label'=>'work','slug'=>'work','active'=>false],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>true],
];


echo $page->render(
    'item',
    array (
        'menu' => $menu,
        'title' => 'timboektoe p/a het wilde weten',
        'details' => 'booklet, a5, 32 pages, 1998',
        'previous' => 'smart',
        'next' => 'cbk',
        'topbanner_type' => 'archive_text',
        'topbanner_archive_slug' => 'timboektoe-p-a-hww'
        //'topbanner_vimeo_id' => 209893433,

    )
);