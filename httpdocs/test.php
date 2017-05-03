<?php
require "../bootstrap.php";

use Rietveld\Models\Post;


foreach( Post::all() as $post) {
	echo $post->title,"<br />";
}

