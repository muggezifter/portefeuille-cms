<?php
namespace Portefeuille;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
        <p>
            The installation consists of 12 metal pipes of various lengths, which are suspended over buckets filled with
            water. In each bucket is a little fountain. The fountains can only be heard, not seen. </p>

        <p>
            The different lengths of pipe filter the sound from the fountains to different tones. Each pipe corresponds
            to one of the twelve semitones in the octave. There is a console, from which the spectator could can the
            different fountains, using 12 lightswitches that are laid out like the black and white keys on a piano
            keyboard. </p>

        <p>
            The pipes are distributed through the space according to a grid of triangles, in such a way that every 3
            pipes that form a triangle represents the notes of a major or minor chord.</p>

TXT;

$sidebar = array(
	array('type' => 'image','thumbnail' => '/images/trickle/sijp4.jpg'),
	array('type' => 'image','thumbnail' => '/images/trickle/sijp8.jpg'),
    array('type' => 'small_image','thumbnail' => '/images/trickle/sijp11.jpg'),
    array('type' => 'image','thumbnail' => '/images/trickle/uitnodiging.jpg'),
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
        'title' => 'sijpelen/trickle',
        'details' => 'installation, galerie mirta de mare, 2003',
        'previous' => 'pijnacker',
        'next' => 'twoseater',
        'topbanner_type' => 'image',
        'topbanner_image_src' => '/images/trickle/sijp1a.jpg',
        'textcol' => $text,
        'sidebar' => $sidebar,
    )
);