<?php
require "../bootstrap.php";

use Portefeuille\PageController;
use Portefeuille\AdminController;

$router = new AltoRouter();
$pc = new PageController();
$ac = new AdminController();


$router->addRoutes([
	// home route
	['GET', '/', function()use($pc){ $pc->redirect('/work'); },'home_redirect'],

	// admin routes
	['GET', '/[admin|login:action]', function($action)use($ac){ $ac->renderPage($action);  },'admin'],
	['POST','/admin/login', function()use($ac){ $ac->login(); },'post_login'],
	['GET','/admin/logout', function()use($ac){ $ac->apiChecks() && $ac->apiLogout(); },'logout'],
	['GET','/admin/init', function()use($ac){ $ac->apiChecks() && $ac->apiInit(); },'init'],
	['GET','/admin/images', function()use($ac){ $ac->apiChecks() && $ac->apiImages(); },'images'],
	['POST','/admin/folders/new', function()use($ac){ $ac->apiChecks() && $ac->apiCreateFolder(); },'folders_new'],
	['POST','/admin/folders/delete', function()use($ac){ $ac->apiChecks() && $ac->apiDeleteFolder(); },'folders_delete'],
	['POST','/admin/images/new', function()use($ac){ $ac->apiChecks() && $ac->apiSaveImage(); },'images_new'],
	['POST','/admin/images/move', function()use($ac){ $ac->apiChecks() && $ac->apiMoveImage(); },'images_move'],
	['POST','/admin/images/delete', function()use($ac){ $ac->apiChecks() && $ac->apiDeleteImage(); },'images_delete'],
	['GET', '/admin/[pages|items|categories:type]', function($type)use($ac){ $ac->apiChecks() && $ac->apiList($type); },'admin_list'],
	['GET','/admin/[pages|items|categories:type]/[i:id]', function($type,$id)use($ac){ $ac->apiChecks() && $ac->apiGetItem($type,$id); },'admin_item'],
	['POST','/admin/[pages|items|categories:type]/new', function($type)use($ac){ $ac->apiChecks() && $ac->apiCreateItem($type); },'admin_item_new'],
	['POST','/admin/[pages|items|categories:type]/[i:id]', function($type,$id)use($ac){ $ac->apiChecks() && $ac->apiSaveItem($type,$id); },'admin_item_save'],
	
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
