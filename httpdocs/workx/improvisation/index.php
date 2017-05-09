<?php
namespace Portefeuille;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
			<p>A radio controlled model car can be driven across a wooden platform. A postcard with the image of Malevich's
            <i>Black Square</i> is attached to the top of the car. A camera is suspended above the platform. The camera
            is connected to a computer. Image recognition software keeps track of the location of the square in relation
            to a triangular grid of 12 points. Each point of the grid is marked with a musical note. The twelve notes of
            the octave are laid out in such a way that each triangle forms either a major or a minor chord.</p>

            <p> A music generating program plays sounds that sound like plucked strings. The notes that are played
            correspond to the three points that are closest to the current position of the square. The frequency of the
            plucking of each note is relative tot the distance of the car to the corresponding point. This means the
            music can be controlled by driving the car to different locations</p>

TXT;

$sidebar = array(
	array('type' => 'image','thumbnail' => '/images/improvisation/car.jpg'),
	array('type' => 'image','thumbnail' => '/images/improvisation/control.jpg'),
);

$menu = [
    ['label'=>'work','slug'=>'work','active'=>true],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>false],
];

echo $page->render(
    'item',
    array (
        'menu' => $menu,
        'title' => 'improvisation',
        'details' => 'interactive sound installation, 2017',
        'previous' => 'twoseater',
        'next' => 'khl4',
        'topbanner_type' => 'vimeo',
        'topbanner_blackbox' => true,
        'topbanner_vimeo_id' => 214375828,
        'bottombanner_type' => 'vimeo',
        'bottombanner_blackbox' => true,
        'bottombanner_vimeo_id' => 209773839,
        'textcol' => $text,
        'sidebar' => $sidebar,
        'githublinks' => array('github.com/muggezifter/improvisation'),
    )
);