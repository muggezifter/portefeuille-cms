<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $timestamps = false;

    public function postType()
    {
        return $this->belongsTo('Portefeuille\Models\PostType');
    }

    public function bottombannerType()
    {
        return $this->belongsTo('Portefeuille\Models\BottombannerType');
    }

    public function topbannerType()
    {
        return $this->belongsTo('Portefeuille\Models\TopbannerType');
    }

    public function sidebars()
    {
        return $this->hasMany('Portefeuille\Models\Sidebar');
    }

    public function categories()
    {
        return $this->belongsToMany('Portefeuille\Models\Category');
    }

    public function category()
    {
        return $this->belongsTo('Portefeuille\Models\Category');
    }
}