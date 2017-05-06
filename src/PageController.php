<?php
namespace Rietveld;

use Rietveld\Models\Post;
use Rietveld\Models\Category;
use Rietveld\Template;

class PageController {


	public function renderPage($slug) {
		$post=Post::with('postType','category')->where('slug',$slug)->first();
		switch($post->postType->template) {
			case 'category':
				echo $this->getCategoryIndex($post->category_id,$post->slug);
				break;
			case 'raw':
				echo $this->getPage($post->raw,$post->slug);
				break;
			default:
				echo "template not found";
			}
	}

	public function renderItem($category, $slug) {

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
		echo $template->render([
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
