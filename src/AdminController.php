<?php
namespace Portefeuille;

use Portefeuille\Models\BannerType;
use Portefeuille\Models\Category;
use Portefeuille\Models\Post;
use Portefeuille\Models\SidebarItemType;
use Portefeuille\Models\User;
use Portefeuille\Models\Image;
use Portefeuille\Models\ImageFolder;
use Portefeuille\Validators\CategoryValidator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

/**
 * Class AdminController
 * @package Portefeuille
 */
class AdminController extends BaseController
{

    const POST_TYPE_ID_PAGE = 1;
    const POST_TYPE_ID_ITEM = 2;
    const POST_TYPE_ID_CATEGORY_INDEX = 3;
    private $session;
    private $request;

    public function __construct(Template $template, Session $session)
    {
        $this->session = $session;
        $this->session->start();
        $this->request = Request::createFromGlobals();
        parent::__construct($template);
    }

    /**
     * @param $action
     */
    public function renderPage(string $action)
    {
        switch ($action) {
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

    private function renderAdminPage()
    {
        if ($this->isLoggedIn()) {
            $this->template->set('admin');
            $content = $this->template->render([]);
            $this->response($content);
        }
    }

    /**
     * @return bool
     */
    private function isLoggedIn(): bool
    {
        if ($this->session->get('permissions') != 'admin') {
            $this->redirect('/login');
            return false;
        }
        return true;
    }

    private function renderLoginPage()
    {
        $this->template->set('login');
        $errors = $this->session->getFlashBag()->get('error', array());
        $content = $this->template->render(['errors' => $errors]);
        $this->response($content);
    }

    public function login()
    {
        $username = $this->request->request->get('username');
        $password = $this->request->request->get('password');

        $user = User::where('username', $username)->first();

        if ($user && password_verify($password, $user->password)) {
            $this->session->set('permissions', 'admin');
            $this->redirect('/admin');
        } else {
            // set flash messages
            $this->session->getFlashBag()->add('error', 'username and/or password incorrect');
            $this->session->set('permissions', '');
            $this->redirect('/login');
        }
    }

    public function apiLogout()
    {
        $this->session->invalidate();
        $this->jsonResponse(['authentication_required'], Response::HTTP_FORBIDDEN);
    }

    public function apiInit()
    {
        $initdata = [];
        $initdata['categories'] = Category::all()->toArray();
        $initdata['bannertypes'] = BannerType::all()->toArray();
        $initdata['sidebaritemtypes'] = SidebarItemType::all()->toArray();
        $this->jsonResponse($initdata);
    }

    /**
     * @param $type
     */
    public function apiList(string $type)
    {
        $list = [];
        switch ($type) {
            case "pages":
                $list = $this->getPostList(self::POST_TYPE_ID_PAGE);
                break;
            case "items":
                $list = $this->getPostList(self::POST_TYPE_ID_ITEM);
                break;
            case "categories":
                $list = Category::select('id', 'name', 'slug', 'online')->get()->toArray();
                break;
        }
        $this->jsonResponse($list);
    }

    public function apiImages()
    {
        $images = ImageFolder::with('images')->orderBy('name')->get()->toArray();
        $this->jsonResponse($images);
    }

    public function apiCreateFolder()
    {
        $name = $this->request->request->get('name');
        if (ImageFolder::where('name', $name)->count()) {
            $response = ['status' => 'error', 'message' => 'folder "' . $name . '" already exists'];
        } else {
            $folder = new ImageFolder();
            $folder->name = $name;
            $folder->save();
            $response = [
                "status" => "ok",
                "images" => ImageFolder::with('images')->orderBy('name')->get()->toArray(),
                "folder_id" => $folder->id
            ];
        }


        $this->jsonResponse($response);
    }

    public function apiDeleteFolder()
    {
        $id = (int) $this->request->request->get('id');
        $folder = ImageFolder::find($id);
        if (!$folder) {
            $response = ['status' => 'error', 'message' => 'folder not found'];
        } else {

            $folder->delete();
            $images = ImageFolder::with('images')->orderBy('name')->get()->toArray();

            $response = ['status' => 'ok', 'images' => $images];
        }
        $this->jsonResponse($response);
    }

    public function apiSaveImage()
    {

        $folder_id = $this->request->request->get('folder_id');
        $file = $this->request->files->get('image_upload');
        list($width, $height) = getimagesize($file);
        $filename = md5(uniqid()) . '.' . $file->guessExtension();
        $mimetype = $file->getMimeType();

        $original_filename = $file->getClientOriginalName();

        try {
            $file->move('images/uploads', $filename);

            $image = new Image();
            $image->url = '/images/uploads/' . $filename;
            $image->filename = $original_filename;
            $image->mimetype = $mimetype;
            $image->width = $width;
            $image->height = $height;
            $image->image_folder_id = $folder_id;
            $image->save();

            $response = [
                "status" => "ok",
                "images" => ImageFolder::with('images')->orderBy('name')->get()->toArray(),
                "folder_id" => $folder_id
            ];
        } catch (FileException $e) {
            $response = [
                'status' => 'error',
                'message' => 'file could not be saved'
            ];

        }
        $this->jsonResponse($response);
    }

    public function apiMoveImage()
    {
        $imgid = (int) $this->request->request->get('imgid');
        $folderid = (int) $this->request->request->get('folderid');
        $image = Image::find($imgid);
        $folder = ImageFolder::find($folderid);
        if (!$image) {
            $response = ['status' => 'error', 'message' => 'image not found'];
        } else if (!$folder) {
            $response = ['status' => 'error', 'message' => 'folder not found'];
        } else {
            $image->image_folder_id = $folderid;
            $image->save();
            $images = ImageFolder::with('images')->orderBy('name')->get()->toArray();
            $open_folder = ImageFolder::with('images')->find($folderid)->toArray();

            $response = ['status' => 'ok', 'images' => $images, 'open_folder' => $open_folder];

        }
        $this->jsonResponse($response);
   }

    public function apiDeleteImage()
    {
        $id = (int) $this->request->request->get('id');

        $image = Image::find($id);
        if (!$image) {
            $response = ['status' => 'error', 'message' => 'image not found'];
        } else {
            $path = getcwd() . $image->url;
            $folderid = $image->image_folder_id;
            $image->delete();
            if (file_exists($path)) {
                unlink($path);
            }
            $images = ImageFolder::with('images')->orderBy('name')->get()->toArray();
            $open_folder = ImageFolder::with('images')->find($folderid)->toArray();

            $response = ['status' => 'ok', 'images' => $images, 'open_folder' => $open_folder];
        }
        $this->jsonResponse($response);
    }

    /**
     * @param $typeid
     * @return mixed
     */
    private function getPostList(int $typeid): array
    {
        return Post::where('post_type_id', $typeid)
            ->select('id', 'title AS name', 'slug', 'online')
            ->get()
            ->toArray();
    }

    /**
     * @param $type
     * @param $id
     */
    public function apiGetItem(string $type, int $id)
    { 
        $item = $this->retrieveItem($type, $id);
        $this->jsonResponse($item);
    }

    /**
     * @param $type
     * @param $id
     * @return mixed
     */
    private function retrieveItem(string $type, int $id) {
        $item = [];
        switch ($type) {
            case "pages":
                $item = ($id === '0')
                    ? [[]]
                    : Post::where('id',$id)->get()->toArray();
                break;
            case "items":
                $item = ($id === '0')
                    ? [['categories'=>[]]]
                    : Post::where('id',$id)->with('categories')->get()->toArray();
                if (count($item)) {
                    $item[0]['categories'] = array_map(function ($i) {
                            return $i["id"];
                         }, $item[0]['categories']);
                    $item[0]['all_categories'] = $this->getCategories();
                }
                break;
            case "categories":
                $item = ($id === '0')
                    ? [[]]
                    : Category::where('id',$id)->with('posts')->get()->toArray();
                break;
        }
        return $item;
    }

    public function apiSaveItem(string $type, int $id) {
        switch ($type) {
            case "pages":
                $this->jsonResponse($this->savePage($id));
                break;
            case "items":
                $this->jsonResponse($this->saveItem($id));
                break;
            case "categories":
                $this->jsonResponse($this->saveCategory($id));
                break;
            default: 
                $this->jsonResponse(['status' => 'error', 'message' => 'item not found']);
        }
    }

    private function saveCategory(int $id) {
        $data = $this->request->request->all();
        $validator = new CategoryValidator($data);
        $val = $validator->validate($data);
        if ($val['status'] != 'ok') { return $val; }
        $cat = Category::find($id);
        $cat->name = $data['name'];
        $cat->slug = $data['slug'];
        $cat->online = (int) $data['online'];
        $cat->save();
        return [
            'status' => 'ok', 
            'message' => sprintf('category "%s" saved successfully', $data['name']),
            'type' => 'categories', 
            'id' => 'id'
        ];
    }

    private function validateCategory($cat) {
        return ['status' => 'ok'];
    }
    private function saveItem($id) {
        return ["item"];
    }

    private function savePage($id) {
        return ["page"];

    }

    public function apiCreateItem($type) {
        $this->jsonResponse(['create item']);
    }

    /**
     * @param array $item_categories
     * @return array
     */
    private function getCategories()
    {
        return array_map(function ($i) {
            return ['id' => $i["id"],
                'name' => $i["name"]];
        }, Category::all()->toArray());
    }


    /**
     * @return bool
     */
    public function apiChecks(): bool
    {
        //if (! $this->request->isXmlHttpRequest()) {
        //	$this->pageNotFound();
        //	return false;
        //}
        if ($this->session->get('permissions') != 'admin') {
            $this->jsonResponse(['authentication_required'], Response::HTTP_FORBIDDEN);
            return false;
        }
        return true;
    }
}
