<?php
require "../bootstrap.php";

use Portefeuille\PageController;
use Portefeuille\AdminController;

$router = new AltoRouter();
$pc = new PageController();
$ac = new AdminController();


$router->addRoutes([
	['GET', '/', function()use($pc){ $pc->redirect('/work'); },'home_redirect'],
	// admin routes
	['GET', '/[admin|login:action]', function($action)use($ac){ $ac->renderPage($action);  },'admin'],
	['POST','/admin/login', function()use($ac){ $ac->login(); },'post_login'],
	['GET', '/admin/[pages|items|categories:type]', function($type)use($ac){ $ac->apiChecks() && $ac->apiList($type); },'admin_list'],
	// frontend routes
	['GET', '/[a:slug]/', function($slug)use($pc){ $pc->renderPage($slug);  },'page_legacy'],
	['GET', '/[a:slug]', function($slug)use($pc){ $pc->renderPage($slug); },'page'],
	['GET', '/[a:category]/[a:slug]/', function($category,$slug)use($pc){ $pc->renderItem($category,$slug); },'item_legacy'],
	['GET', '/[a:category]/[a:slug]', function($category,$slug)use($pc){ $pc->renderItem($category,$slug); },'item'],
	]);


$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
	call_user_func_array( $match['target'], $match['params'] ); 
} else {
	$pc->pageNotFound();
}