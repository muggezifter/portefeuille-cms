<?php
namespace Rietveld;

use Symfony\Component\HttpFoundation\Response;

class BaseController {

	protected function response($content, $statusCode=Response::HTTP_OK){
		$response = new Response();
		$response->setContent($content);
		$response->setStatusCode($statusCode);
		$response->headers->set('Content-Type', 'text/html');
		$response->send();
	}

	protected function pageNotFound() { 
		$this->response("sorry, that page is not here",Response::HTTP_NOT_FOUND);
	}

}