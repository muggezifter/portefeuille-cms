<?php

namespace Rietveld\Models;

use Illuminate\Database\Eloquent\Model;


class PostType extends Model
{
	public $timestamps = false;

	public function posts() {
		return $this->hasMany('Rietveld\Models\Post');
	}
}