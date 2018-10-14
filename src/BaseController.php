<?php
namespace Portefeuille;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BaseController
 * @package Portefeuille
 */
class BaseController
{

    protected $template;

    public function __construct(Template $template)
    {
        $this->template= $template;
    }
    /**
     *
     */
    public function pageNotFound()
    {
        $this->response("<b>error 404:</b> sorry, that page does not exist", Response::HTTP_NOT_FOUND);
    }

    /**
     * @param $content
     * @param $statusCode
     */
    protected function response(string $content, int $statusCode = Response::HTTP_OK)
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'text/html');
        $response->setContent($content)->setStatusCode($statusCode)->send();
    }

    /**
     * @param $url
     */
    public function redirect(string $url)
    {
        $response = new RedirectResponse($url);
        $response->send();
    }

    /**
     * @param array $content
     * @param $statusCode
     */
    protected function jsonResponse(array $content, int $statusCode = Response::HTTP_OK)
    {
        $response = new JsonResponse($content, $statusCode);
        $response->send();
    }
}