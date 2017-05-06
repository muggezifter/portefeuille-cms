<?php
namespace Rietveld;

require_once('../../../vendor/autoload.php');
$page = new Page('../../../templates','../../../cache');

$raw =<<< RAW
        <div class="pure-u-1 pure-u-md-2-5 mb10">
            <img class="pure-img" src="/images/pijnacker/pijnacker05.jpg" style="margin-bottom: 10px" />
            <img class="pure-img" src="/images/pijnacker/pijnacker02.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker03.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker07.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker06.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker12.jpg" style="margin-bottom: 10px"/>
        </div>
        <div class="pure-u-1 pure-u-md-2-5 mb10">
            <img class="pure-img" src="/images/pijnacker/pijnacker09.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker04.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker11.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker01.jpg" style="margin-bottom: 10px"/>
            <img class="pure-img" src="/images/pijnacker/pijnacker10.jpg" style="margin-bottom: 10px"/>
        </div>

RAW;

$menu = [
    ['label'=>'work','slug'=>'work','active'=>true],
    ['label'=>'about','slug'=>'about','active'=>false],
    ['label'=>'publications','slug'=>'publications','active'=>false],
];

echo $page->render(
    'item',
    array (
        'menu' => $menu,
        'title' => 'pijnacker',
        'details' => 'installation with mirrors, welzijnsvoorziening het tolhek, pijnacker, 2003',
        'previous' => 'from-here-to-tokyo',
        'next' => 'trickle',
        'custom_html' => $raw,

    )
);