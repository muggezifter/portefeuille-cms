<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');

$page->render(
    'item',
    array (
        'section' => 'publications',
        'title' => 'smart papers: a snare for the eye',
        'details' => 'booklet, a5, 16 pages, 2003',
        'previous' => 'cbk',
        'next' => 'timboektoe',
        'topbanner_type' => 'archive_text',
        'topbanner_archive_slug' => 'smart_papers_a_snare_for_the_eye'
    )
);