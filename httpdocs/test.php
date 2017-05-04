<?php
require "../bootstrap.php";

use Rietveld\Models\Post;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$p = new Post();
var_dump($p->all());
echo "x";
//foreach( Post::all() as $post) {
//	echo $post->title,"<br />";
//}

