<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;


class SidebarItemType extends Model
{
    public $timestamps = false;

    public function sidebarItems()
    {
        return $this->hasMany('Portefeuille\Models\SidebarItem');
    }
}