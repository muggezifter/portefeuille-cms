<?php

namespace Rietveld\Models;

use Illuminate\Database\Eloquent\Model;


class SidebarItem extends Model
{
	public $timestamps = false;

	public function sidebarType() {
		return $this->belongsTo('Rietveld\Models\SidebarItemType');
	}

	public function post() {
		return $this->belongsTo('Rietveld\Models\Post');
	}
}