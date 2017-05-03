<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');

$page->render(
    'item',
    array (
        'section' => 'publications',
        'title' => 'cbk publication',
        'details' => 'booklet, a4, 20 pages, 1989',
        'previous' => 'timboektoe',
        'next' => 'smart',
        'topbanner_type' => 'archive_text',
        'topbanner_archive_slug' => 'GertRietveldCBK1989'
    )
);