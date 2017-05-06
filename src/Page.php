<?php
namespace Rietveld;

use Twig_Environment;
use Twig_Loader_Filesystem;

class Page {
	private $twig;

	public function __construct($templatedir,$cachedir) {
		
		$loader = new Twig_Loader_Filesystem($templatedir);
		$this->twig = new Twig_Environment($loader, array(
		    'cache' => $cachedir,
		    'auto_reload' => true,
		    'strict_variables' => true
		));

	}

	public function render($template, $pagecontent) {
		return $this->twig->load($template.'.html.twig')->render($pagecontent);
	}
}
