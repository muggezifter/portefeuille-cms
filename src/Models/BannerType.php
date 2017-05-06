<?php

namespace Rietveld\Models;

use Illuminate\Database\Eloquent\Model;


class BannerType extends Model
{
	public function posts() {
		return $this->hasMany('Rietveld\Models\Post');
	}
}