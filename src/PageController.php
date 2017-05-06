<?php
namespace Rietveld;

use Rietveld\Models\Post;
use Rietveld\Models\Category;
use Rietveld\Template;
use Rietveld\BaseController;


class PageController extends BaseController {

	public function renderPage($slug) {
		$post=Post::with('postType','category')->where('slug',$slug)->first();
		switch($post->postType->template) {
			case 'category':
				$content=$this->getCategoryIndex($post->category_id,$post->slug);
				$this->response($content);
				break;
			case 'raw':
				$content= $this->getPage($post->raw,$post->slug);
				$this->response($content);
				break;
			default:
				$this->pageNotFound();
			}

	}

	public function renderItem($category, $slug) {
		
		$post = Post::with('categories','bottombannerType','topbannerType')
			 ->where('slug',$slug)->first() ;
		if(!$post) return $this->pageNotFound();

		$categories = $post->categories->map(function($i){ return $i->slug; })->toArray();
		if (!in_array($category,$categories)) return $this->pageNotFound();

		$template = new Template('item');

		$vars=$post->toArray();
		$vars['menu'] =$this->getMenu($category);

		$vars['previous']='p';
		$vars['next']='p';

		$vars['topbanner_type']=$post->topbannerType->type;
		echo $vars;
		$content = $template->render($vars);

		$this->response($content);
	}



	private function getMenu($active) {
		$posts=Post::where('in_menu',1)
			->where('online',1)
			->orderBy('menu_order_id')->get();
		$menu = [];
		foreach($posts as $post) {
			$menu[] = [
			'label'=>$post->title,
			'slug'=> $post->slug,
			'active' => $active===$post->slug
			];
		}
		return $menu;
	}

	private function getCategoryIndex($category_id,$slug) {
		$template = new Template('category');
		$items=[];
		$category = Category::with('posts')
			->find($category_id);
		$posts=$category->posts()->where('online',1)->orderBy('category_post.order_id')->get();

		foreach ($posts as $post) {
			$items[]= [
			    'link'=>'/'.$category->slug.'/'.$post->slug,
            	'image'=>$post->thumbnail,
            	'legend'=>$post->title
			];
		}
		return $template->render([
			'menu'=>$this->getMenu($slug),
			'items'=>$items
			]);
	}

	private function getPage($content,$slug) {
		$template = new Template('raw');
		return $template->render([
			'menu'=>$this->getMenu($slug),
			'content'=>$content
			]);

	}
}
