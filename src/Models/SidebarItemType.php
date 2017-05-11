<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SidebarItemType
 * @package Portefeuille\Models
 */
class SidebarItemType extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function sidebarItems()
    {
        return $this->hasMany('Portefeuille\Models\SidebarItem');
    }
}