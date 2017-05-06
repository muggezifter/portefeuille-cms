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
        'title' => 'cbk publication',
        'details' => 'booklet, a4, 20 pages, 1989',
        'previous' => 'timboektoe',
        'next' => 'smart',
        'topbanner_type' => 'archive_text',
        'topbanner_archive_slug' => 'GertRietveldCBK1989'
    )
);