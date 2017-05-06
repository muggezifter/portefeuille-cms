<?php

namespace Rietveld\Models;

use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
	public $timestamps = false;

	public function posts() {
		return $this->belongsToMany('Rietveld\Models\Post');
	}

	public function indexes() {
		return $this->hasMany('Rietveld\Models\Post');
	}
}