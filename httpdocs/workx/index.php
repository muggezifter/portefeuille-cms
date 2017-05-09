<?php
namespace Portefeuille;

require('../../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Response;

$page = new Page('../../templates','../../cache');

$items = array(array(
            'link'=>'/work/improvisation/',
            'image'=>'/images/improvisation/thumbnail.jpg',
            'legend'=>'improvisation'
        ),array(
            'link'=>'/work/khl4/',
            'image'=>'/images/khl4/thumbnail.jpg',
            'legend'=>'khl4'
        ),array(
            'link'=>'/work/epicycles/',
            'image'=>'/images/epicycles/thumbnail.jpg',
            'legend'=>'epicycles'
        ),array(
            'link'=>'/work/planet-crooswijk/',
            'image'=>'/images/planet-crooswijk/thumbnail.png',
            'legend'=>'planet crooswijk'
        ),array(
            'link'=>'/work/running-from-camera/',
            'image'=>'/images/running-from-camera/thumbnail.jpg',
            'legend'=>'running from camera'
        ),array(
            'link'=>'/work/from-here-to-tokyo/',
            'image'=>'/images/from-here-to-tokyo/thumbnail.jpg',
            'legend'=>'from here to tokyo'
        ),array(
            'link'=>'/work/pijnacker/',
            'image'=>'/images/pijnacker/thumbnail.jpg',
            'legend'=>'pijnacker'
        ),array(
            'link'=>'/work/trickle/',
            'image'=>'/images/trickle/thumbnail.jpg',
            'legend'=>'trickle'
        ),array(
            'link'=>'/work/twoseater/',
            'image'=>'/images/twoseater/thumbnail.jpg',
            'legend'=>'twoseater'
        ));

$menu = [
    ['label'=>'work','slug'=>'work','active'=>true],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>false],
];

$content = $page->render('category',compact('menu','items'));


$response = new Response();

$response->setContent($content);
$response->setStatusCode(Response::HTTP_OK);

// set a HTTP response header
$response->headers->set('Content-Type', 'text/html');

// print the HTTP headers followed by the content
$response->send();