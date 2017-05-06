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
        'title' => 'smart papers: a snare for the eye',
        'details' => 'booklet, a5, 16 pages, 2003',
        'previous' => 'cbk',
        'next' => 'timboektoe',
        'topbanner_type' => 'archive_text',
        'topbanner_archive_slug' => 'smart_papers_a_snare_for_the_eye'
    )
);