<?php

namespace Rietveld\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	public $timestamps = false;

	public function postType() {
		return $this->belongsTo('Rietveld\Models\PostType');
	}

	public function bottombannerType() {
		return $this->belongsTo('Rietveld\Models\BottombannerType');
	}

	public function topbannerType() {
		return $this->belongsTo('Rietveld\Models\TopbannerType');
	}

	public function sidebars() {
		return $this->hasMany('Rietveld\Models\Sidebar');
	}

	public function categories() {
		return $this->belongsToMany('Rietveld\Models\Category');
	}

	public function category() {
		return $this->belongsTo('Rietveld\Models\Category');
	}
}