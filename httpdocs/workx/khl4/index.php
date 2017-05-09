<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
			<p>KHL4 could be described as a musical instrument that is played by moving through the city.</p>
        <p>A grid of triangles is projected over the city. Each point of the grid is marked with a musical note.
        The twelve notes ofthe octave are laid out in such a way that each triangle forms either a major or a minor chord.</p>
        <p>The player travels through the city carrying a phone with an app that at regular intervals reports its position to a server.
        This program determines which three points of the grid are closest to the player's position and plays those three tones.
        The monitor shows the current position of the player on a map.
        The volume of the individual tones is proportional with the distance to the corresponding points.
        The tones that are played are looped samples of my voice.</p>

        <p>Each of the tones is played through a separate speaker.
        The speakers are laid out on the table reproducing the grid.
        The effect is that the sound moves over the table, just as the player moves over the map.</p>
        
        <p>When the player is out in the city, his positions are also stored in a database. This makes it possible to replay routes that have been travelled earlier.</p>

TXT;

$sidebar = array(
	array('type' => 'image','thumbnail' => '/images/khl4/installation.jpg'),
	array('type' => 'image','thumbnail' => '/images/khl4/patch.png'),
    array('type' => 'image','thumbnail' => '/images/khl4/partitura.png'),
    array('type' => 'small_image','thumbnail' => '/images/khl4/app.png'),
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
        'title' => 'khl4',
        'details' => '12-channel sound installation, 2016',
        'previous' => 'improvisation',
        'next' => 'epicycles',
        'topbanner_type' => 'vimeo',
        'topbanner_blackbox' => true,
        'topbanner_vimeo_id' => 214373747,
        'textcol' => $text,
        'sidebar' => $sidebar,
        'githublinks' => array(
            'github.com/muggezifter/khl4express',
            'github.com/muggezifter/khl4map',
            'github.com/muggezifter/khl4app',
            'github.com/muggezifter/khl4pd'),
    )
);