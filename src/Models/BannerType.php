<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;


class BannerType extends Model
{
	public function posts() {
		return $this->hasMany('Portefeuille\Models\Post');
	}
}