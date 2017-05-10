<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;


class SidebarItem extends Model
{
    public $timestamps = false;

    public function sidebarType()
    {
        return $this->belongsTo('Portefeuille\Models\SidebarItemType');
    }

    public function post()
    {
        return $this->belongsTo('Portefeuille\Models\Post');
    }
}