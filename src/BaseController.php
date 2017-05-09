<?php
namespace Portefeuille;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

class BaseController {

	protected function response($content, $statusCode=Response::HTTP_OK){
		$response = new Response();
		$response->headers->set('Content-Type', 'text/html');
		$response->setContent($content)->setStatusCode($statusCode)->send();
	}

	public function pageNotFound() { 
		$this->response("<b>error 404:</b> sorry, that page does not exist",Response::HTTP_NOT_FOUND);
	}

	public function redirect($url) {
		$response = new RedirectResponse($url);
		$response->send();
	}

	protected function jsonResponse(array $content, $statusCode=Response::HTTP_OK){
		$response = new JsonResponse($content,$statusCode);
		$response->send();
	}
}