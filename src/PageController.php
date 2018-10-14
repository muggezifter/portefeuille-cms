<?php
namespace Portefeuille;

use Portefeuille\Models\Category;
use Portefeuille\Models\Post;

/**
 * Class PageController
 * @package Portefeuille
 */
class PageController extends BaseController
{

    public function __construct(Template $template)
    {
        parent::__construct($template);
    }

    /**
     * @param $slug
     */
    public function renderPage(string $slug)
    {
        $post = Post::with('postType', 'category')->where('slug', $slug)->first();
        if (!$post) return $this->pageNotFound();
        switch ($post->postType->template) {
            case 'category':
                $content = $this->getCategoryIndex($post->category_id, $post->slug);
                $this->response($content);
                break;
            case 'raw':
                $content = $this->getPage($post->raw, $post->slug);
                $this->response($content);
                break;
            default:
                $this->pageNotFound();
        }
    }

    /**
     * @param $category_id
     * @param $slug
     * @return mixed
     */
    private function getCategoryIndex(string $category_id, string $slug)
    {
        $this->template->set('category');
        $items = [];
        $category = Category::with('posts')
            ->find($category_id);
        $posts = $category->posts()->where('online', 1)->orderBy('category_post.order_id')->get();

        foreach ($posts as $post) {
            $items[] = [
                'link' => '/' . $category->slug . '/' . $post->slug,
                'image' => $post->thumbnail,
                'legend' => $post->title
            ];
        }
        return $this->template->render([
            'menu' => $this->getMenu($slug),
            'items' => $items
        ]);
    }

    /**
     * @param $active
     * @return array
     */
    private function getMenu(string $active) : array
    {
        $posts = Post::where('in_menu', 1)
            ->where('online', 1)
            ->orderBy('menu_order_id')->get();
        $menu = [];
        foreach ($posts as $post) {
            $menu[] = [
                'label' => $post->title,
                'slug' => $post->slug,
                'active' => $active === $post->slug
            ];
        }
        return $menu;
    }

    /**
     * @param $content
     * @param $slug
     * @return mixed
     */
    private function getPage(string $content, string $slug) : ?string
    {
        $this->template->set('raw');
        return $this->template->render([
            'menu' => $this->getMenu($slug),
            'content' => $content
        ]);

    }

    /**
     * @param $category
     * @param $slug
     */
    public function renderItem($category, $slug)
    {
        // check if slug is valid
        $post = Post::with('categories', 'bottombannerType', 'topbannerType')
            ->where('slug', $slug)->first();
        if (!$post) return $this->pageNotFound();

        // check if category is valid
        $categories = $post
            ->categories
            ->map(function ($i) {
                return $i->slug;
            })
            ->toArray();
        if (!in_array($category, $categories)) return $this->pageNotFound();

        // find previous and next within category
        $slugs = Category::with('posts')
            ->where('slug', $category)
            ->first()
            ->posts()
            ->where('online', 1)
            ->orderBy('category_post.order_id')
            ->get()
            ->map(function ($i) {
                return $i->slug;
            })
            ->toArray();
        $i = array_search($slug, $slugs);
        $l = count($slugs);

        // get template vars
        $vars = $post->toArray();
        $vars['menu'] = $this->getMenu($category);
        $vars['previous'] = '/' . $category . '/' . $slugs[$i == 0 ? $l - 1 : $i - 1];
        $vars['next'] = '/' . $category . '/' . $slugs[($i + 1) % $l];
        $vars['topbanner_type'] = $post->topbannerType->type;


        $this->template->set('item');
        $content = $this->template->render($vars);

        $this->response($content);
    }
}
