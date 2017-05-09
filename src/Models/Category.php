<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
	public $timestamps = false;

	public function posts() {
		return $this->belongsToMany('Portefeuille\Models\Post');
	}

	public function indexes() {
		return $this->hasMany('Portefeuille\Models\Post');
	}
}