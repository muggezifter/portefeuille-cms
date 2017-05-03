<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
        <p>In September 2003 I took part in the Puddles exhibition in the old Jusshi Square public school building in
            Kodenmacho, Tokyo.</p>

        <p>Before leaving for Japan I constructed a sculpture in my studio in the shape of an arrow, about 1.5 meters
            long, and pointed it in the correct direction for Tokyo (through the earth, not over the surface). </p>
        <p>
            The arrow was made from used floorboards. It was suspended from the ceiling by wires.</p>

        <p>In Tokyo I constructed the opposite arrow, pointing back at Rotterdam. It had exactly the same
            dimensions.</p>

        <p>It was made from semi-opaque plastic material on a rough wooden frame, the edges covered with paper tape.</p>


        <u>Positioning the arrows</u><br />
        <br />
        Location Rotterdam arrow:<br />    
        51º56'n,4º30'e (decimal: 51.93º n, 4.50º e)<br />
        <br />
        Location Tokyo arrow:<br />        
        35º42'n,139º47'e (decimal: 35.70º n, 139.78º e)<br />
        <br />
        Angular distance:<br />            
        84º04' (decimal: 84.06º)<br />
        <br />
        Direction Rotterdam arrow:<br />   
        35º04' true (decimal: 35.06º)<br />
        <br />
        Direction Tokyo arrow:<br />      
        334º08' true (decimal: 334.14º)<br />
        <br />
        Downward angle arrows:<br />      
        42º02' (decimal 42.03º)<br />
        <br />
        Declination Rotterdam: -1º04'<br /> 
        Declination Tokyo: -7º04'<br />

TXT;

$sidebar = array(
	array('type' => 'image','thumbnail' => '/images/from-here-to-tokyo/globe.jpg'),
	array('type' => 'image','thumbnail' => '/images/from-here-to-tokyo/rarrow.jpg'),
    array('type' => 'image','thumbnail' => '/images/from-here-to-tokyo/tarrow.jpg'),
);

$page->render(
    'item',
    array (
        'section' => 'work',
        'title' => 'from here to tokyo',
        'details' => 'installation, 2003',
        'previous' => 'running-from-camera',
        'next' => 'pijnacker',
        'topbanner_type' => 'image',
        'topbanner_image_src' => '/images/from-here-to-tokyo/arrows.jpg',
        'textcol' => $text,
        'sidebar' => $sidebar,
    )
);