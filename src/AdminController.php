<?php
namespace Rietveld;

use Rietveld\Models\Post;
use Rietveld\Models\Category;
use Rietveld\Models\User;
use Rietveld\Template;
use Rietveld\BaseController;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends BaseController {

	private $session;
	private $request;

	const POST_TYPE_ID_PAGE = 1;
	const POST_TYPE_ID_ITEM = 2;
	const POST_TYPE_ID_CATEGORY_INDEX = 3;

	public function __construct() {
		$this->session = new Session();
		$this->session->start();
		$this->request = Request::createFromGlobals();
	}
	
	public function renderPage($action) {
		switch($action){
			case 'admin':
				$this->renderAdminPage();
				break;
			case 'login':
				$this->renderLoginPage();
				break;
			default;
				$this->pageNotFound();
		}
	}

	public function login() {
		$username = $this->request->request->get('username');
		$password = $this->request->request->get('password');

		$user = User::where('username',$username)->first();
	
		if ($user && password_verify($password ,$user->password)) {
			$this->session->set('permissions','admin');
			$this->redirect('/admin');
		} else {
			// set flash messages
			$this->session->getFlashBag()->add('error', 'username and/or password incorrect');
			$this->session->set('permissions','');
			$this->redirect('/login');
		}
	}

	public function apiList($type) {
		$list= [];
		switch($type) {
			case "pages":
				$list = $this->getPostList(self::POST_TYPE_ID_PAGE);
				break;
			case "items":
				$list = $this->getPostList(self::POST_TYPE_ID_ITEM);
				break;
			case "categories":
				$list = Category::select('name','online')->get()->toArray();
				break;
		}
		$this->jsonResponse($list);
	}

	private function getPostList($typeid) {
		return Post::where('post_type_id',$typeid)->select('title AS name','online')->get()->toArray();
	}

	public function apiChecks() {
		if (! $this->request->isXmlHttpRequest()) {
			$this->pageNotFound();
			return false;
		}
		if ($this->session->get('permissions')!='admin'){
			$this->jsonResponse(['authentication_required'],Response::HTTP_FORBIDDEN);
			return false;
		}
		return true;
	}

	private function renderAdminPage() {
		if ($this->isLoggedIn()) {
			$template = new Template('admin');
			$content = $template->render([]);
			$this->response($content);
		}
	}

	private function renderLoginPage() {
		$template = new Template('login');
		$errors = $this->session->getFlashBag()->get('error', array());
		$content = $template->render(['errors'=>$errors]);
		$this->response($content);
	}

	private function isLoggedIn() {
		if ($this->session->get('permissions')!='admin'){
			$this->redirect('/login');
			return false;
		}
		return true;
	}
}