<?php
namespace Portefeuille;

use Twig_Environment;
use Twig_Loader_Filesystem;

/**
 * Class Template
 * @package Portefeuille
 */
class Template
{

    private $twig;
    private $template;
    private $loader;
    /**
     * @param $template
     */
    public function __construct() {
        $this->loader = new Twig_Loader_Filesystem(TWIG_TEMPLATEDIR);
        $this->twig = new Twig_Environment($this->loader, array(
            'cache' => TWIG_CACHEDIR,
            'auto_reload' => true,
            'strict_variables' => true
        ));
    }

    public function set(string $template) {
        $this->template = $template . '.html.twig';
    }

    /**
     * @param array $pagecontent
     * @return mixed
     */
    public function render(array $pagecontent)
    {
        return $this->twig->load($this->template)->render($pagecontent);
    }
}
