<?php
namespace Rietveld;

require_once('../../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Response;

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


$menu = [
    ['label'=>'work','slug'=>'work','active'=>false],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>true],
];

$content = $page->render('category',compact('menu','items'));


$response = new Response();

$response->setContent($content);
$response->setStatusCode(Response::HTTP_OK);

// set a HTTP response header
$response->headers->set('Content-Type', 'text/html');

// print the HTTP headers followed by the content
$response->send();