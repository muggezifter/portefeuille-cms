<?php
namespace Rietveld;

require_once('../../vendor/autoload.php');
$page = new Page('../../templates','../../cache');

$content = <<<C0NTENT
        <img class="pure-img" src="/images/about/mirrors.jpg" />
        <div class="pure-u-1 pure-u-md-4-5">
        <p>Born in 1960 in Ter Aar, the Netherlands</p>
        <p>1981–1987 studied painting and sculpture at Academie voor Beeldende Kunsten, Rotterdam</p>
        <p>Works and lives in Rotterdam</p>

        <p><pre>studio: Borgerstraat 24
        studio 115 
        3027EB Rotterdam 
email:  <a href="mailto:muggezifter@gmail.com">muggezifter@gmail.com</a></pre>
        </p>
        <p>
            Selected exhibitions:
        <dl>
            <dt><b>At the Same Place by Coincidence</b></dt>
            <dd>group show, OnArte, Minusio, Switzerland, 2016</dd>
            <dt><b>Motel Mozaique</b></dt>
            <dd>videowork, Schouwburg, Rotterdam, 2014</dd>
            <dt><b>Bang Bootje</b></dt>
            <dd>group show, Villa Zebra, Rotterdam, 2006</dd>
            <dt><b>Dubbeldec</b></dt>
            <dd>with Barbara Witteveen, Duende, Rotterdam, 2005</dd>
            <dt><b>A Snare for the Eye</b></dt>
            <dd>group show, Smart Project Space, Amsterdam, 2003</dd>
            <dt><b>Puddles</b></dt>
            <dd>group show, Tokyo, Japan, 2003</dd>
            <dt><b>Sijpelen/Trickle</b></dt>
            <dd>Mirta de Mare Gallery, Rotterdam, 2002</dd>
            <dt><b>True Dream of Anyone</b></dt>
            <dd>group show, Trafó Gallery, Budapest, Hungary, 2000</dd>
            <dt><b>Timboektoe p/a</b></dt>
            <dd>Het Wilde Weten, Rotterdam, 1998</dd>
            <dt><b>Oasehaas Onthaast</b></dt>
            <dd>group show, Tuincentrum Born & Bink, Rotterdam, 1997</dd>
            <dt><b>Simon Benson/Gert Rietveld</b></dt>
            <dd>Lokaal 01, Antwerpen, Belgium, 1994</dd>
            <dt><b>Dr. Brewster & Co.</b></dd>
            <dd>group show, H.A.L. Terminal, Rotterdam, 1991</dd>
            <dt><b>Herman de Bakker/Gert Rietveld</b></dt>
            <dd>CBK, Rotterdam, 1989</dd>
        </dl>
        </p>

        <p>Over the years, I have produced and shown drawings, photographs, semi-architectural interventions, video,
            site-specific and non-site-specific installations, interactive multimedia work, language based work and
            installations that include an element of performance. I don’t have a program other than following my own
            fascinations, but looking back I do see some constants. Much of the work could be categorized as exploration
            of space, in all possible senses: three dimensional space, imaginary space, represented and metaphorical
            space, linguistic space etc. What interests me is how we use our experiences in physical space in organizing
            and navigating these other domains, and -who knows- vice versa.</p>
C0NTENT;

$page->render(
    'raw',
    array(
        'section' =>'about',
        'content' => $content,
        'contentclass' => 'item'
    )
);