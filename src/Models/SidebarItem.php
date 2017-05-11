<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SidebarItem
 * @package Portefeuille\Models
 */
class SidebarItem extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function sidebarType()
    {
        return $this->belongsTo('Portefeuille\Models\SidebarItemType');
    }

    /**
     * @return mixed
     */
    public function post()
    {
        return $this->belongsTo('Portefeuille\Models\Post');
    }
}