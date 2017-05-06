<?php
require "../bootstrap.php";

use Rietveld\Models\Post;
use Rietveld\Models\TopbannerType;
use Rietveld\Template;
use Rietveld\PageController;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Display all SQL executed in Eloquent



$pc = new PageController();

$pc->renderPage('publications');//pc->renderPage('about');

/*
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


$template = new Template('category');
echo $template->render(compact('menu','items'));
*/
/*

foreach( Post::all() as $post) {
	echo $post->title,' - ',$post->postType->type,($post->category) ? "++".$post->category->name:"----";
	foreach($post->categories as $cat) {
		echo ">>>",$cat->name;
	}
	echo "<br />";
}
*/

