<?php
namespace Rietveld;

use Twig_Environment;
use Twig_Loader_Filesystem;

class Template {
	private $twig;
	private $template;

	public function __construct($template) {
		$this->template = $template.'.html.twig';

		$loader = new Twig_Loader_Filesystem('../templates');

		$this->twig = new Twig_Environment($loader, array(
		    'cache' => '../cache',
		    'auto_reload' => true,
		    'strict_variables' => true
		));
	}

	public function render($pagecontent) {
		return $this->twig->load($this->template)->render($pagecontent);
	}
}
