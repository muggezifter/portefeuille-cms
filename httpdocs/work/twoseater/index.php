<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');


$text = <<<TXT
         <p>
            Two people can sit back to back in this sculpture. Their seats are the two ends of the same piece of wood. This means that they will be able to feel each others movements. They can see each other through the tube, which has four mirrors and functions as a double periscope.</p>

TXT;

$sidebar = array(
    array('type' => 'image','id' => 'stl','legend' =>'click to enlarge', 'thumbnail' => '/images/twoseater/model.jpg'),
);

$scripts =<<< SC
<div id="popup">

    <div class="stl"><i class="fa fa-window-close"></i>
    <iframe frameborder='0' title='tweezitter.stl'></iframe>
    </div>
</div>
<script type="text/javascript">
$("#stl").click(function(){
    if (! $("#popup .stl iframe").attr('src')){
    $("#popup .stl iframe").attr('src','https://render.githubusercontent.com/view/3d?url=https://raw.githubusercontent.com/muggezifter/3dmodels/master/tweezitter/tweezitter.stl');
    }
    $("#popup").height($("body").height()).show();
});

$("#popup").click(function(){
    $("#popup").hide();
});
</script>
SC;

$menu = [
    ['label'=>'work','slug'=>'work','active'=>true],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>false],
];

echo $page->render(
    'item',
    array (
        'menu' => $menu,
        'title' => 'twoseater',
        'details' => 'installation, sculpture, mdf and mirrors, 1996',
        'previous' => 'trickle',
        'next' => 'improvisation',
        'topbanner_type' => 'image',
        'topbanner_image_src' => '/images/twoseater/twoseater.jpg',
        'textcol' => $text,
        'sidebar' => $sidebar,
        'scripts' => $scripts
    )
);