<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;


class PostType extends Model
{
	public $timestamps = false;

	public function posts() {
		return $this->hasMany('Portefeuille\Models\Post');
	}
}