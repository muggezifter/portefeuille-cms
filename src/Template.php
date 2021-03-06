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

    /**
     * @param $template
     */
    public function __construct($template)
    {
        $this->template = $template . '.html.twig';

        $loader = new Twig_Loader_Filesystem('../templates');

        $this->twig = new Twig_Environment($loader, array(
            'cache' => TWIG_CACHEDIR,
            'auto_reload' => true,
            'strict_variables' => true
        ));
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
